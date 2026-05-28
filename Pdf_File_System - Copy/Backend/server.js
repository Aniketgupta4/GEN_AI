// backend/server.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Tere backend ke asli functions
import { buildVectorStore } from './6_vectorStore.js';
import { extractAllEntities } from './4_entityExtractor.js';
import { buildGraph } from './5_graphBuilder.js';
import { processQuery } from './13_runQuery.js'; // NEW: Query processor import kiya

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'data/',
  filename: (req, file, cb) => cb(null, 'uploaded_document.pdf')
});
const upload = multer({ storage });

// Endpoint 1: Upload and Index PDF
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    console.log("Starting Indexing Pipeline...");
    
    const entities = await extractAllEntities(pdfPath);
    await buildGraph(entities);
    await buildVectorStore(pdfPath);
    
    res.json({ success: true, message: "PDF successfully indexed into Graph and Vector stores!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint 2: Ask a question
app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body;
    console.log(`Received question: ${query}`);
    
    // Yahan tera asli RAG pipeline call hoga
    const answer = await processQuery(query); 
    
    res.json({ answer });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Backend API running on http://localhost:3001'));