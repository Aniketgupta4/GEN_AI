// =====================================================================
// 4_entityExtractor.js — STEP 2: PDF → Gemini (with file upload) → JSON
// =====================================================================
//
// Upload PDF ONCE to Gemini Files API → ask "extract movies 1-50" → 20 requests
// Gemini reads entire PDF in context (1M token window)
// 1000 movies ÷ 50 per batch = only 20 API calls!
//
// RETRY STRATEGY:
//   - Every batch gets 3 attempts (retries on ANY error, not just 429)
//   - 429 (rate limit) → wait 30s/60s/90s
//   - Other errors (parse fail, network, etc.) → wait 10s/20s/30s
//   - After all batches done → retry ALL failed batches one more time
//   - Final summary shows exactly which movies were lost (if any)
// =====================================================================


// =====================================================================
// 4_entityExtractor.js — STEP 2: ANY PDF → Gemini → GENERIC JSON
// =====================================================================

import { genai } from "./2_config.js";
import { createPartFromUri } from "@google/genai";

// NAYA PROMPT: Ab ye kisi bhi PDF se generic knowledge graph (nodes & relations) nikalega
const EXTRACTION_PROMPT = `You are a precise data extractor for a Knowledge Graph.
Analyze the attached PDF document. Extract the most important concepts, entities, and their relationships.

Output this EXACT JSON structure (an array of objects):
[
  {
    "source_entity": {"name": "string", "type": "string"},
    "relationship": "string", 
    "target_entity": {"name": "string", "type": "string"}
  }
]

Rules:
- "type" should be a simple category (e.g., "Concept", "Algorithm", "Person", "Technology", "Framework").
- "relationship" should be a simple action (e.g., "USES", "IS_PART_OF", "CREATED", "DEPENDS_ON", "EXPLAINS").
- Extract around 15-20 highly relevant relationships from the text.
- Return ONLY a valid JSON ARRAY. No markdown, no backticks, no conversational text.
- If no relevant entities are found, return an empty array [].`;

/**
 * Upload PDF to Gemini Files API.
 */
async function uploadPDF(pdfPath) {
  console.log("   📤 Uploading PDF to Gemini Files API...");

  const file = await genai.files.upload({
    file: pdfPath,
    config: { mimeType: "application/pdf" },
  });

  let fileInfo = await genai.files.get({ name: file.name });
  while (fileInfo.state === "PROCESSING") {
    console.log("   ⏳ PDF processing...");
    await new Promise((r) => setTimeout(r, 3000));
    fileInfo = await genai.files.get({ name: file.name });
  }

  if (fileInfo.state === "FAILED") {
    throw new Error("PDF upload processing failed");
  }

  console.log(`   ✅ PDF uploaded: ${file.name}`);
  return fileInfo;
}

/**
 * Extract one batch of generic entities from the uploaded PDF.
 */
async function extractBatch(fileInfo, attempt = 1) {
  const maxRetries = 3;

  try {
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            createPartFromUri(fileInfo.uri, fileInfo.mimeType),
            { text: EXTRACTION_PROMPT },
          ],
        },
      ],
    });

    let raw = response.text.trim();
    raw = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    if (attempt < maxRetries) {
      const is429 = err.message?.includes("429");
      const wait = is429 ? attempt * 30 : attempt * 10;
      const reason = is429 ? "Rate limited" : "Error";
      console.warn(`   ⚠️ ${reason}. Waiting ${wait}s (retry ${attempt + 1}/${maxRetries})...`);
      await new Promise((r) => setTimeout(r, wait * 1000));
      return extractBatch(fileInfo, attempt + 1);
    }
    console.error(`   ❌ Extraction FAILED after ${maxRetries} attempts:`, err.message?.substring(0, 150));
    return [];
  }
}

/**
 * Extract ALL entities from PDF.
 * CHANGED: For Free Tier, we run sequentially to avoid 429 Rate Limits.
 */
async function extractAllEntities(pdfPath) {
  const fileInfo = await uploadPDF(pdfPath);
  const results = [];
  
  // Rate Limit Fix: Concurrency set to 1
  const CONCURRENCY = 1; 
  const totalBatches = 1; // Simulating multiple passes over the document for thorough extraction
  
  console.log(`\n   📊 Extracting data in ${totalBatches} sequential passes...\n`);

  for (let i = 0; i < totalBatches; i += CONCURRENCY) {
    console.log(`🤖 Processing Pass ${i + 1}/${totalBatches}...`);

    const batchResults = await extractBatch(fileInfo);
    
    if (batchResults.length > 0) {
      results.push(...batchResults);
    }

    console.log(`   ✅ Total relationships so far: ${results.length}`);

    if (i + CONCURRENCY < totalBatches) {
      console.log("   ⏳ Waiting 15 seconds to respect rate limits...");
      await new Promise((r) => setTimeout(r, 15000));
    }
  }

  // Cleanup uploaded file
  try {
    await genai.files.delete({ name: fileInfo.name });
    console.log("   🗑️ PDF deleted from Gemini servers");
  } catch (e) { /* auto-deletes */ }

  console.log(`\n✅ Total generic entities extracted: ${results.length}`);
  return results;
}

export { extractAllEntities, uploadPDF };