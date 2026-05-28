// =====================================================================
// 5_graphBuilder.js — STEP 3: Structured JSON → Neo4j Graph
// =====================================================================
//
// Each entity → NODE.  Each connection → RELATIONSHIP.
//
// MERGE vs CREATE:
//   CREATE always makes new node (causes duplicates!)
//   MERGE first checks "does it exist?" then creates only if needed
//
// Example without MERGE:
//   CREATE (:Actor {name: "Zendaya"})  → for Movie 1
//   CREATE (:Actor {name: "Zendaya"})  → for Movie 2
//   Result: TWO Zendaya nodes ❌
//
// With MERGE:
//   MERGE (:Actor {name: "Zendaya"})   → creates it
//   MERGE (:Actor {name: "Zendaya"})   → finds existing, skips
//   Result: ONE Zendaya node ✅
//
// INDEXES:
//   Without index → MERGE scans ALL nodes to find match (slow)
//   With index    → MERGE uses lookup table (fast)
// =====================================================================


// =====================================================================
// 5_graphBuilder.js — STEP 3: Generic JSON → Neo4j Graph
// =====================================================================

import { driver } from "./2_config.js";

// Helper 1: Neo4j labels mein spaces ya special characters nahi ho sakte.
// Ye function "Machine Learning" ko "MachineLearning" bana dega.
function cleanLabel(str) {
  if (!str) return "Entity";
  return str.replace(/[^a-zA-Z0-9]/g, "").replace(/^./, c => c.toUpperCase()) || "Entity";
}

// Helper 2: Relationships hamesha UPPERCASE aur underscores ke sath hote hain.
// "depends on" ko "DEPENDS_ON" bana dega.
function cleanRel(str) {
  if (!str) return "RELATED_TO";
  return str.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase() || "RELATED_TO";
}

// Insert ONE generic relationship (Source -> Relation -> Target)
async function insertGenericGraph(relObj) {
  // Agar LLM ne empty ya incomplete data bheja, toh skip karo
  if (!relObj.source_entity || !relObj.target_entity) return;

  const session = driver.session();
  try {
    const sourceLabel = cleanLabel(relObj.source_entity.type);
    const targetLabel = cleanLabel(relObj.target_entity.type);
    const relType = cleanRel(relObj.relationship);

    // Neo4j driver mein hum Label (Node Type) ko directly $variable se pass nahi kar sakte.
    // Isliye humein Label ko string interpolation (${}) se daalna padta hai, 
    // par Properties (jaise name) ko hum hamesha $params se bhejte hain (security ke liye).
    const cypher = `
      MERGE (s:${sourceLabel} {name: $sourceName})
      MERGE (t:${targetLabel} {name: $targetName})
      MERGE (s)-[:${relType}]->(t)
    `;

    await session.executeWrite(async (tx) => {
      await tx.run(cypher, {
        sourceName: relObj.source_entity.name,
        targetName: relObj.target_entity.name
      });
    });
  } catch (err) {
    console.error("   ❌ Graph Insert Error:", err.message);
  } finally {
    await session.close();
  }
}

// Build complete graph for ALL extracted generic entities
async function buildGraph(relationships) {
  console.log(`\n🔨 Building generic graph with ${relationships.length} connections...\n`);

  // Step 1: LLM ne jo bhi naye Labels banaye hain, unhe identify karo 
  // taaki unpar hum fast searching ke liye Index bana sakein
  const uniqueLabels = new Set();
  relationships.forEach(rel => {
    if (rel.source_entity?.type) uniqueLabels.add(cleanLabel(rel.source_entity.type));
    if (rel.target_entity?.type) uniqueLabels.add(cleanLabel(rel.target_entity.type));
  });

  const session = driver.session();
  try {
    console.log("📇 Creating dynamic indexes for new node types...");
    for (const label of uniqueLabels) {
      await session.run(`CREATE INDEX IF NOT EXISTS FOR (n:${label}) ON (n.name)`);
    }
    console.log("   ✅ Indexes created.");
  } catch(e) {
    console.warn("   ⚠️ Index creation warning:", e.message);
  } finally {
    await session.close();
  }

  // Step 2: Insert data one by one
  for (let i = 0; i < relationships.length; i++) {
    await insertGenericGraph(relationships[i]);
    if ((i + 1) % 20 === 0 || i === relationships.length - 1) {
      console.log(`   📊 Inserted ${i + 1}/${relationships.length} relationships`);
    }
  }

  // Step 3: Print Graph Stats
  const statsSession = driver.session();
  try {
    const nodeCount = await statsSession.run("MATCH (n) RETURN count(n) AS count");
    const relCount = await statsSession.run("MATCH ()-[r]->() RETURN count(r) AS count");
    console.log(`\n✅ Graph built successfully!`);
    console.log(`   Total Nodes in DB: ${nodeCount.records[0].get("count")}`);
    console.log(`   Total Relationships in DB: ${relCount.records[0].get("count")}`);
  } finally {
    await statsSession.close();
  }
}

export { buildGraph };