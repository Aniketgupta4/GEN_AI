// 1) BASICS ->

// by google gemini api we are doing this free -> by google ai studio
// install google genai  -> npm i @google/genai (library)
// make changes in package.json -> type:"module" -> because we are using import 
// **** create api key form google ai studio then our model works

// -> **** gemini ko mera name ni pta but maine bata diya ki my name is this so next time i ask so tell my name -> but when we use api mai isko name bata bhi diya phir bhi ni bata para ye mera naam 
// -> gemini pe kya hota hai ki -> old chats bhi send hoti hai (same chat window ki) so wo unki help se hmko answer deta hai so name bata para tha -> but ab api use karray hai so yaha ols chat ni jati hai (same chat window ki)

// ***************** -> means llm not store our data -> **** but server hamari some info store karta hai -> toh kabhi kabhi gpt apan ko hamara name apne se bolta hai -> hello aniket 
// -> server pe data store karti hai ki in data se hi baad mai phir se train karayegai model ko jab data bohot sara ho jayega 
// -> is liye data store karte hai kyuki human bohot sari mistakes karte hai baat karne mai gpt se and aim yahi hai ki gpt human jaise work kare -> so aysa human ka data store karte hai so model train kar shake ki human jaisa gpt baat kare mistakes kare sahi answer de and all


// --------------------------------------------------------------------------


// 2) use google gemini api ->

import dotenv from "dotenv";
dotenv.config();
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:process.env.API_KEY}); // api key setup

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",                         // free model 
//     contents: "what is my name",   // questions we can ask
//   });
//   console.log(response.text);
// }

// await main();

// --------------------------------------------------------------------------


// 3) use array -> ki store karke rakhe hamari chats -> but abhi ****manually store karna hoga chats
// two roles -> user and model


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.API_KEY}); // api key setup

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",                        
    contents: [
        {
            role:'user',
            parts:[{text:"What is my name"}]
        },
        {
            role:'model',
            parts:[{text:"I don't know your name. As an AI, I don't have access to personal information about you unless you choose to tell me."}]
        },
        {
            role:'user',
            parts:[{text:"my name is aniket gupta"}]
        },
        {
            role:'model',
            parts:[{text:"Okay, Aniket Gupta. It's nice to meet you! How can I help you today, Aniket?"}]
        },
        {
            role:'user',
            parts:[{text:"What is my name"}]
        }
    ]
  });
  console.log(response.text);
}

await main();


// ----------------------------------------------------------------

// -> **** isme model -> if we ask current data then it give 15 may 2024 and 2-3 dates too in next time -> ye dates tabki hai jab model train hua hoga -> but 2-3 dates kyu dera hai alag alag bar ? 
// -> but in gpt we ask current date and time then it tell correct date and time but our model in vscode not tell correct date and time why ?

