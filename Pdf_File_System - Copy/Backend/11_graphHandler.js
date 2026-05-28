// =====================================================================
// 11_graphHandler.js — UNIFIED GRAPH QUERY HANDLER
// =====================================================================
//
// Handles ALL graph queries: factual, descriptive, relationship.
// They're all just "traverse the graph around resolved entities."
//
// HOW IT WORKS:
//   1. Takes the user query + resolved entities (from 9_entityResolver.js)
//   2. LLM creates a query plan (JSON steps)
//      - But NOW the LLM already knows what each entity IS
//      - "Nolan" is already resolved to Director "Christopher Nolan"
//      - No guessing, no assumptions
//   3. Template system validates + builds safe Cypher
//   4. Execute on Neo4j (READ-ONLY)
//   5. LLM formats the answer
//
// WHAT QUERIES DOES THIS HANDLE?
//
//   Factual:
//     "Movies directed by Nolan" → traversal + filter
//     "How many sci-fi movies?" → traversal + aggregation
//     "Action movies with Tom Hardy" → multi-traversal + filter
//
//   Descriptive:
//     "Tell me about Inception" → get ALL relationships around entity
//     "Who is Christopher Nolan?" → get all relationships around entity
//
//   Relationship:
//     "How is DiCaprio related to Nolan?" → path between two entities
//
// =====================================================================

// =====================================================================
// 11_graphHandler.js — UNIFIED GENERIC GRAPH QUERY HANDLER
// =====================================================================

import { driver, llm } from "./2_config.js";
import { buildCypher } from "./8_cypherTemplates.js";

// =====================================================================
// Step 1: LLM creates query plan WITH resolved generic entity context
// =====================================================================
async function createQueryPlan(query, resolvedEntities) {
  const entityContext = resolvedEntities.entities
    .map((e) => `"${e.searchTerm}" = ${e.label} (exact name in DB: "${e.nodeName}")`)
    .join("\n");

  const unresolvedContext = resolvedEntities.unresolved.length > 0
    ? `\nNOT FOUND in database: ${resolvedEntities.unresolved.join(", ")}`
    : "";

  const prompt = `You are a query planner for a general Knowledge Graph.

RESOLVED ENTITIES (already verified in the database):
${entityContext}${unresolvedContext}

IMPORTANT: Use the exact "nodeName" values from above in filter values.
All nodes in this database have a property called "name". 

OUTPUT a JSON plan using ONLY these step types:

1. "traversal": {"type":"traversal","from":"Label","rel":"RELATIONSHIP","to":"Label"}
2. "filter": {"type":"filter","field":"Label.property","op":"=","value":"some value"}
   Operators: =, <>, >, <, >=, <=, CONTAINS, STARTS WITH
3. "projection": {"type":"projection","fields":["Label.property"],"distinct":true/false}
4. "aggregation": {"type":"aggregation","function":"count","field":"Label.property","alias":"name","groupBy":"Label.property"}
5. "sort": {"type":"sort","field":"Label.property","direction":"ASC/DESC"}
6. "limit": {"type":"limit","value":number}
7. "describe": {"type":"describe","label":"Label","name":"exact node name"}
   → Use this when asked to "tell me about", "explain", or "summarize" a specific entity. It fetches all direct connections.
8. "path": {"type":"path","fromLabel":"Label","fromName":"name","toLabel":"Label","toName":"name"}
   → Use this when asking how two specific entities are related or connected.

RULES:
- Always include a projection or aggregation step (unless using describe or path).
- Use EXACT node names from the resolved entities above.
- The property to search on is ALWAYS "name" (e.g., "Concept.name", "Technology.name").
- Output ONLY valid JSON. No markdown, no backticks.

EXAMPLES:

"Tell me about Machine Learning" (Machine Learning resolved as Concept "Machine Learning"):
{"steps":[
  {"type":"describe","label":"Concept","name":"Machine Learning"}
]}

"How does React connect to Node.js?" (React = Technology, Node.js = Technology):
{"steps":[
  {"type":"path","fromLabel":"Technology","fromName":"React","toLabel":"Technology","toName":"Node.js"}
]}`;

  const response = await llm.invoke([
    { role: "system", content: prompt },
    { role: "human", content: query },
  ]);

  let raw = response.content;
  if (Array.isArray(raw)) {
    raw = raw
      .filter((block) => typeof block === "string" || block.type === "text")
      .map((block) => (typeof block === "string" ? block : block.text))
      .join("\n");
  }
  raw = raw.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to parse plan:", raw.substring(0, 300));
    throw new Error("Query planning failed. Please rephrase your question.");
  }
}

// =====================================================================
// DESCRIBE: Get ALL relationships around a generic entity
// =====================================================================
async function executeDescribe(label, name) {
  const session = driver.session({ defaultAccessMode: "READ" });

  try {
    // Generic query to find all incoming and outgoing relationships
    const cypher = `
      MATCH (n:${label} {name: $name})
      OPTIONAL MATCH (n)-[r_out]->(out_node)
      OPTIONAL MATCH (in_node)-[r_in]->(n)
      RETURN n.name AS target, 
             collect(DISTINCT {relation: type(r_out), connected_to: out_node.name, type: labels(out_node)[0]}) AS outgoing,
             collect(DISTINCT {relation: type(r_in), connected_from: in_node.name, type: labels(in_node)[0]}) AS incoming
    `;

    console.log(`   🔒 Describe Cypher: ${cypher.replace(/\s+/g, " ").trim()}`);

    const result = await session.run(cypher, { name });
    return result.records.map((record) => {
      const obj = {};
      record.keys.forEach((key) => {
        const value = record.get(key);
        obj[key] = typeof value === "object" && value?.toNumber
          ? value.toNumber()
          : value;
      });
      return obj;
    });
  } finally {
    await session.close();
  }
}

// =====================================================================
// PATH: Find shortest path between two generic entities
// =====================================================================
async function executePath(fromLabel, fromName, toLabel, toName) {
  const session = driver.session({ defaultAccessMode: "READ" });

  try {
    const cypher = `
      MATCH (a:${fromLabel} {name: $fromName}),
            (b:${toLabel} {name: $toName}),
            path = shortestPath((a)-[*..6]-(b))
      RETURN [node IN nodes(path) | {
        labels: labels(node),
        name: node.name
      }] AS pathNodes,
      [rel IN relationships(path) | type(rel)] AS pathRels`;

    console.log(`   🔒 Path Cypher: ${cypher.replace(/\s+/g, " ").trim()}`);

    const result = await session.run(cypher, { fromName, toName });

    if (result.records.length === 0) {
      return [{ error: `No connection found between ${fromName} and ${toName}` }];
    }

    return result.records.map((record) => ({
      pathNodes: record.get("pathNodes"),
      pathRels: record.get("pathRels"),
    }));
  } finally {
    await session.close();
  }
}

// =====================================================================
// Execute template-based Cypher
// =====================================================================
async function executeTemplateCypher(plan) {
  const { cypher, params } = buildCypher(plan);
  console.log(`   🔒 Cypher: ${cypher}`);
  console.log(`   🔒 Params:`, params);

  const session = driver.session({ defaultAccessMode: "READ" });

  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => {
      const obj = {};
      record.keys.forEach((key) => {
        const value = record.get(key);
        obj[key] = typeof value === "object" && value?.toNumber
          ? value.toNumber()
          : value;
      });
      return obj;
    });
  } finally {
    await session.close();
  }
}

// =====================================================================
// MAIN: Handle any generic graph query
// =====================================================================
async function handleGraphQuery(query, resolvedEntities) {
  console.log("   📋 Creating query plan...");
  const plan = await createQueryPlan(query, resolvedEntities);
  console.log("   📋 Plan:", JSON.stringify(plan, null, 2));

  let records;
  const firstStep = plan.steps[0];

  if (firstStep.type === "describe") {
    console.log(`   🗄️  Describing ${firstStep.label}: "${firstStep.name}"...`);
    records = await executeDescribe(firstStep.label, firstStep.name);
  } else if (firstStep.type === "path") {
    console.log(`   🗄️  Finding path: ${firstStep.fromName} → ${firstStep.toName}...`);
    records = await executePath(
      firstStep.fromLabel, firstStep.fromName,
      firstStep.toLabel, firstStep.toName
    );
  } else {
    console.log("   🗄️  Querying Neo4j...");
    records = await executeTemplateCypher(plan);
  }

  console.log(`   🗄️  Got ${records.length} results`);

  if (records.length === 0 || records[0]?.error) {
    const errorMsg = records[0]?.error || "No results found";
    return `I couldn't find an answer: ${errorMsg}`;
  }

  const responsePrompt = `Given the question and database results, provide a clear, natural language answer.
Do NOT mention databases, Cypher, JSON, or technical details.
Do NOT return any JSON. Only return plain English text.
Be informative and thorough — include all relevant details from the results.

Question: ${query}

Database Results:
${JSON.stringify(records.slice(0, 50), null, 2)}
${records.length > 50 ? `\n... and ${records.length - 50} more results` : ""}`;

  const response = await llm.invoke([
    { role: "system", content: "You are a helpful knowledge assistant. Respond ONLY in plain English text. Never respond with JSON or code." },
    { role: "human", content: responsePrompt },
  ]);

  let answer = response.content;
  if (Array.isArray(answer)) {
    answer = answer
      .filter((block) => typeof block === "string" || block.type === "text")
      .map((block) => (typeof block === "string" ? block : block.text))
      .join("\n");
  }
  return answer.trim();
}

export { handleGraphQuery };