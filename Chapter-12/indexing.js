// --> as we run -> node indexing.js --> so Node.pdf read hogi and chunk pe break hoke vector db in pinecode pe save ho

import * as dotenv from 'dotenv';
dotenv.config();
// load pdf use -> utility function
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// chunk splitter -> utility function
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
// langchain give access of gemini model -> utility function
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
// pinecode -> utility function
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';


async function indexing() {
    
    // s1) pdf file ko load kariye
    
    const PDF_PATH = './Node.pdf'; // pdf path
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();


    
    // s2) chunking create karna
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, // 1000 word chunk size
        chunkOverlap: 200,
    });
    const chunkedDocs = await textSplitter.splitDocuments(rawDocs);

    // console.log(chunkedDocs.length); 266 chunk --> vector


    // s3) embedding create karni hai --> 266 chunk hai iske liye vector chaiye
    // configure kar diya hai embedding model ko -> gemini ka model
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: 'text-embedding-004', // 768 dimension
    });

   

    // s4) configure pinecone 

    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);



    // s5) single step--> ChunkedDocs--> convert into Embedding --> and store it in Vector DB

    await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
}

indexing();


