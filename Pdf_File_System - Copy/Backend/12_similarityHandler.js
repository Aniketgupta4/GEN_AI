// =====================================================================
// 12_similarityHandler.js — SIMILARITY: Pinecone + Neo4j + LLM
// =====================================================================
//
// FLOW:
//   Step 1: From resolved entities, find the Movie (already resolved!)
//   Step 2: Embed movie name → Pinecone → top 50 candidates
//   Step 3: Neo4j → get source movie's genres
//   Step 4: Extract movie names from top 50 chunks
//   Step 5: Neo4j → which of those 50 share the same genres?
//   Step 6: LLM → pick top 10 from genre-matched list
//
// WHY resolved entities help:
//   "Movies like Inception" → entity resolver already confirmed
//   Inception = Movie "Inception" in the graph. No extra LLM call needed.
// =====================================================================


// =====================================================================
// 12_similarityHandler.js — SIMILARITY: Pinecone + Neo4j + LLM (Generic)
// =====================================================================

import { llm, embedText, pineconeIndex, driver } from "./2_config.js";

/**
 * Extract an entity name from a raw chunk text if possible.
 * Since chunks are arbitrary text in a generic PDF, we rely heavily
 * on vector metadata or raw text matching.
 */
function extractConceptFromChunk(chunkText) {
  // In a generic system, chunk text might just be a paragraph.
  // Returning the first 50 chars as a summary/title for tracking if needed.
  return chunkText.substring(0, 50).replace(/\n/g, " ") + "...";
}

/**
 * Neo4j: Get all outgoing relationship types and target nodes for a specific entity.
 * This acts as our generic version of finding "genres" or "themes".
 */
async function getEntityContext(entityName) {
  const session = driver.session({ defaultAccessMode: "READ" });
  try {
    const result = await session.run(
      `MATCH (n {name: $name})-[r]->(target)
       RETURN type(r) AS relation, target.name AS connected_node`,
      { name: entityName }
    );
    return result.records.map((r) => ({
      relation: r.get("relation"),
      connected_node: r.get("connected_node"),
    }));
  } finally {
    await session.close();
  }
}

/**
 * Main similarity handler.
 * Receives resolved generic entities from the universal flow.
 */
async function handleSimilarityQuery(query, resolvedEntities) {
  // ── Step 1: Find the primary entity from resolved entities ──
  // We just take the first successfully resolved entity
  const primaryEntity = resolvedEntities.entities[0];

  if (!primaryEntity) {
    console.log("   ⚠️ No specific entity resolved. Falling back to pure vector search...");
    return await fallbackVectorSearch(query);
  }

  const entityName = primaryEntity.nodeName;
  console.log(`   🎬 Finding concepts similar to: "${entityName}"`);

  // ── Step 2: Pinecone → top candidates ──
  console.log("   📐 Searching Pinecone (top 20)...");
  const queryVector = await embedText(entityName);

  const searchResults = await pineconeIndex.query({
    vector: queryVector,
    topK: 20,
    includeMetadata: true,
  });

  if (!searchResults.matches || searchResults.matches.length === 0) {
    return "I couldn't find any similar concepts in the document.";
  }

  console.log(`   ✅ Got ${searchResults.matches.length} candidates from Pinecone`);

  // ── Step 3: Neo4j → get source entity context ──
  console.log("   🗄️  Getting source entity context from Neo4j...");
  const sourceContext = await getEntityContext(entityName);
  const contextStr = sourceContext.map(c => `${c.relation} -> ${c.connected_node}`).join(", ");
  console.log(`   ✅ Context: [${contextStr || "None"}]`);

  // ── Step 4: LLM → rank and explain matches ──
  console.log("   🤖 LLM analyzing semantic similarities...");

  const candidates = searchResults.matches.map((m) => m.metadata.text);

  const prompt = `The user is looking for concepts, topics, or entities similar to: "${entityName}".

Known graph connections for "${entityName}":
${contextStr || "No direct graph connections found."}

Here are the most semantically relevant text chunks from our document:
${candidates.map((text, i) => `--- Chunk ${i + 1} ---\n${text}`).join("\n\n")}

Task: Based on the provided chunks and graph context, identify and explain the top similar concepts or related topics.
Rank them by relevance.
For each point, explain WHY it relates to the user's query in 1-2 sentences based on the text.
Do NOT mention databases, vectors, chunks, or technical terms.
Format as a numbered list.`;

  const response = await llm.invoke([
    { role: "system", content: "You are an expert knowledge assistant. Respond ONLY with a numbered list of related concepts with short explanations. Never respond with JSON." },
    { role: "human", content: prompt },
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

/**
 * Fallback: When no specific entity is resolved.
 * Pure vector search + LLM ranking.
 */
async function fallbackVectorSearch(query) {
  console.log("   📐 Fallback: Pure vector search...");
  const queryVector = await embedText(query);

  const searchResults = await pineconeIndex.query({
    vector: queryVector,
    topK: 15,
    includeMetadata: true,
  });

  if (!searchResults.matches || searchResults.matches.length === 0) {
    return "I couldn't find any matching information in the document.";
  }

  const candidates = searchResults.matches.map((m) => m.metadata.text);

  const prompt = `The user asked: "${query}"

Here are relevant excerpts from our knowledge base:
${candidates.map((text, i) => `--- Excerpt ${i + 1} ---\n${text}`).join("\n\n")}

Provide a comprehensive answer to the user's query based ONLY on these excerpts.
Synthesize the information logically.
Do NOT mention databases, vectors, excerpts, or technical backend terms.`;

  const response = await llm.invoke([
    { role: "system", content: "You are a helpful knowledge assistant. Provide clear, natural language answers based on the provided text." },
    { role: "human", content: prompt },
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

export { handleSimilarityQuery };