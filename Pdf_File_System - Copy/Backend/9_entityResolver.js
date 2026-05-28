// =====================================================================
// 9_entityResolver.js — EXTRACT + RESOLVE ENTITIES
// =====================================================================
//
// THIS RUNS FIRST FOR EVERY QUERY. No exceptions.
//
// WHY?
//   User says "DiCaprio" — is that an Actor? Director? Movie?
//   User says "Nolan" — same question.
//   User says "Inception" — could be Movie, could be Theme.
//   User says "Oscar" — Award? Movie? Actor named Oscar?
//
//   WE DON'T KNOW. Only the graph knows.
//   So we search ALL node types for every entity.
//
// FLOW:
//   Step 1: LLM extracts entity names from the query
//           "Action movies with Tom Hardy" → ["Action", "Tom Hardy"]
//
//   Step 2: For EACH entity, search ALL 6 node types in Neo4j
//           "Tom Hardy" → Actor ✅, Director ❌, Movie ❌, Genre ❌...
//           "Action" → Genre ✅, Actor ❌, Director ❌, Movie ❌...
//
//   Step 3: Return resolved entities with their labels
//           [
//             { name: "Tom Hardy", searchTerm: "Tom Hardy", label: "Actor", nodeName: "Tom Hardy" },
//             { name: "Action", searchTerm: "Action", label: "Genre", nodeName: "Action" }
//           ]
//
// FUZZY MATCHING:
//   User might say "Nolan" but graph has "Christopher Nolan".
//   We use CONTAINS for partial matching.
//   If exact match exists, prefer it over partial match.
// =====================================================================


// =====================================================================
// 9_entityResolver.js — EXTRACT + RESOLVE GENERIC ENTITIES
// =====================================================================

import { llm, driver } from "./2_config.js";

// =====================================================================
// Step 1: LLM extracts entity names from generic queries
// =====================================================================
async function extractEntities(query) {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You extract key entity names, concepts, tools, or subjects from user queries.

Extract ALL important names, specific terms, and concepts from the query.
Do NOT extract generic verbs or filler words like "what is", "explain", "how does", "tell me about".
DO extract: technology names, concepts, frameworks, people, organizations, etc.

Respond ONLY with a JSON array of strings. No markdown, no backticks.

Examples:
"How does React relate to JavaScript?" → ["React", "JavaScript"]
"Explain the concept of Machine Learning" → ["Machine Learning"]
"What are the dependencies of Neural Networks?" → ["Neural Networks"]
"Tell me about Artificial Intelligence" → ["Artificial Intelligence"]`,
    },
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
    console.warn("⚠️ Entity extraction failed, returning empty array");
    return [];
  }
}

// =====================================================================
// Step 2: Resolve ONE entity across ALL node types dynamically
// =====================================================================
async function resolveEntity(entityName) {
  const session = driver.session({ defaultAccessMode: "READ" });
  const matches = [];

  try {
    // 1. First try EXACT match (case-insensitive) across ALL nodes
    // Humne naye graph builder me sabhi nodes ki property 'name' rakhi hai
    const exactResult = await session.run(
      `MATCH (n)
       WHERE n.name IS NOT NULL AND toLower(n.name) = toLower($name)
       RETURN n.name AS nodeName, labels(n)[0] AS label
       LIMIT 5`,
      { name: entityName }
    );

    if (exactResult.records.length > 0) {
      for (const record of exactResult.records) {
        matches.push({
          searchTerm: entityName,
          label: record.get("label"),
          nodeName: record.get("nodeName"),
          matchType: "exact",
        });
      }
      return matches; // Exact mil gaya toh wahi return kardo
    }

    // 2. No exact match → try CONTAINS (partial/fuzzy) across ALL nodes
    const partialResult = await session.run(
      `MATCH (n)
       WHERE n.name IS NOT NULL AND toLower(n.name) CONTAINS toLower($name)
       RETURN n.name AS nodeName, labels(n)[0] AS label
       LIMIT 5`,
      { name: entityName }
    );

    for (const record of partialResult.records) {
      matches.push({
        searchTerm: entityName,
        label: record.get("label"),
        nodeName: record.get("nodeName"),
        matchType: "partial",
      });
    }
  } finally {
    await session.close();
  }

  return matches;
}

// =====================================================================
// Main: Extract entities from query → Resolve each in Neo4j
// =====================================================================
async function resolveQueryEntities(query) {
  console.log("   🔍 Step 1: Extracting entities from query...");
  const entityNames = await extractEntities(query);
  console.log(`   ✅ Found: [${entityNames.join(", ")}]`);

  if (entityNames.length === 0) {
    return { query, entities: [], unresolved: [] };
  }

  console.log("   🗄️  Step 2: Resolving entities in Neo4j...");
  const resolved = [];
  const unresolved = [];

  for (const name of entityNames) {
    const matches = await resolveEntity(name);

    if (matches.length > 0) {
      for (const match of matches) {
        resolved.push(match);
        console.log(
          `   ✅ "${name}" → ${match.label} (${match.nodeName}) [${match.matchType}]`
        );
      }
    } else {
      unresolved.push(name);
      console.log(`   ❌ "${name}" → not found in graph`);
    }
  }

  return { query, entities: resolved, unresolved };
}

export { resolveQueryEntities, resolveEntity };