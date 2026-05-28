// =====================================================================
// 10_queryClassifier.js — CLASSIFY WITH RESOLVED ENTITY CONTEXT
// =====================================================================
//
// RUNS AFTER entity resolution. The classifier now KNOWS what each
// entity is (Actor, Movie, Genre, etc.) — no guessing.
//
// TWO TYPES:
//
//   "graph" — anything answerable from structured data
//     - Factual: "Movies directed by Nolan" (Director→Movie)
//     - Descriptive: "Tell me about Inception" (get all relationships)
//     - Relationship: "How is DiCaprio related to Nolan?" (path finding)
//     - Filtered: "Action movies with Tom Hardy" (Actor→Movie + Genre filter)
//     - Counts: "How many sci-fi movies?" (aggregation)
//
//   "similarity" — finding similar/recommended items
//     - "Movies like Inception"
//     - "Recommend something similar to The Matrix"
//     - "What should I watch if I liked Interstellar?"
//
// WHY ONLY TWO?
//   Factual, descriptive, relationship — all just "traverse the graph".
//   The graph handler builds the right Cypher based on resolved entities.
//   Only similarity needs Pinecone (vector search).
// =====================================================================


// =====================================================================
// 10_queryClassifier.js — CLASSIFY WITH GENERIC ENTITY CONTEXT
// =====================================================================

import { llm } from "./2_config.js";

async function classifyQuery(query, resolvedEntities) {
  // Build entity context string for the LLM
  const entityContext = resolvedEntities.entities.length > 0
    ? resolvedEntities.entities
        .map((e) => `"${e.searchTerm}" is a ${e.label} (exact name in DB: "${e.nodeName}")`)
        .join("\n")
    : "No entities were found in the database.";

  const unresolvedContext = resolvedEntities.unresolved.length > 0
    ? `\nThese terms were NOT found in the database: ${resolvedEntities.unresolved.join(", ")}`
    : "";

  // NAYA PROMPT: Movie hata kar Generic Knowledge Graph kar diya
  const prompt = `You are a query classifier for a general Knowledge Graph.

RESOLVED ENTITIES (we already looked these up in the database):
${entityContext}${unresolvedContext}

CLASSIFY the query as ONE of:

1. "graph" — anything that can be answered from structured data:
   - Finding entities, concepts, or tools based on specific criteria
   - Getting information about a specific entity
   - Finding how two entities are related
   - Counting, listing, filtering
   - Examples: "What is connected to [Entity]?", "Tell me about [Concept]",
     "How is [Entity A] related to [Entity B]?", "List all [Category]"

2. "similarity" — finding similar items, recommendations, or semantic matches:
   - The query explicitly asks for "similar", "like", "recommend", or "related topics"
   - The user wants to discover new things based on semantic similarity.
   - Examples: "Concepts similar to [Entity]", "Recommend topics like [Entity]",
     "If I want to learn about [Concept], what else should I read?"

Respond ONLY with JSON: {"type": "graph" or "similarity", "reasoning": "one sentence"}
No markdown, no backticks.`;

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
    console.warn("⚠️ Classification failed, defaulting to graph");
    return { type: "graph", reasoning: "Default fallback" };
  }
}

export { classifyQuery };