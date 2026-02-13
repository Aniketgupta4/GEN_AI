// indexing kare then query[ask questions] karenagi apan

// ----> langchain all things do -> basically is a wrapper ji ap ye use karo easy and fast work hoga -> warna time lagega if you do normal

import readlineSync from 'readline-sync';
import { GoogleGenerativeAIEmbeddings,ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
dotenv.config();
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';


// -> configuration
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
});



const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-2.5-flash',  
    temperature: 0.3, 
});


// -> configure Pinecone
const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);




async function chatting(question) {

    // -> question ki embedding create karna hai
    const queryVector = await embeddings.embedQuery(question);  

    // -> embeddig aagyi, uske baad usko vectorDB ke andar search karna, top10
    const searchResults = await pineconeIndex.query({
    topK: 10,  // itne milte julte vector milengai
    vector: queryVector,
    includeMetadata: true, // metadata actual data bhi chaiye
    });


    // -> [] pe bohot sare data pinecode mai se sirf text bs bhejna/nikalna hai baki ka index_number,score and all faltu chize ni bhejni hai [so extract only actual text]
    const context = searchResults.matches
                   .map(match => match.metadata.text)
                   .join("\n\n---\n\n");


    // console.log(searchResults);


    // -> top10+question isko mein llm ko de dunga
    // -> **** apan instructions deray hai --> jo hmney top 10 result teko diye hai agar isme answer hai query ka toh dedo answer --> llm ko apne end se answer dene ki jarurat ni hai --> according to top10 context answer dena hai --> llm ko apne se answer ni dena hai **** 
    const promptTemplate = PromptTemplate.fromTemplate(`
      
        You are a helpful assistant answering questions based on the provided documentation.

        Context from the documentation: 
        {context}

        Question: {question}

        Instructions:
        - Answer the question using ONLY the information from the context above
        - If the answer is not in the context, say "I don't have enough information to answer that question."
        - Be concise and clear
        - Use code examples from the context if relevant
 
        Answer:
    `);

    // -> talk with llm model so provide prompt,model,and answer kaise chaiye
        const chain = RunnableSequence.from([
            promptTemplate,
            model,
            new StringOutputParser(),
        ]);


        // Step 6: Invoke the chain and get the answer
        const answer = await chain.invoke({
            context: context,   // give context
            question: question, // give question
        }); 
       

        console.log(answer);  // print answer


    // Output create kar dunga
}


async function main(){
   const userProblem = readlineSync.question("Ask me anything--> ");
   await chatting(userProblem);
   main();
}


main();





// -------------------------------------------------------------------

// --> 1) ask questions :

// q1 --> what is nodejs --> gives correct answer
// q2 --> what is v8 --> give correct answer
// q3 --> explain it in detail --> give ajib type ka answer

// ----> solution : "explain it in detail" ka vector send to vectordb and vecotredb pe se top 10 result mila hoga wo lake dedega + "explain it in detail" llm ko --> so isi liye ajib type ka answer milra hai 
//                -> **** issue ye hai ki apan galat question puch ray hai --> so wo[vectordb pe ne bhi top 10 wrong result diye and iske hisab se llm ne bhi wrong answer diya acche se] bhi galat answer dera hai 

// **** --> impovements --> **** store chat history
//                      --> **** and want intent analyser
   

// ----------> image2 -> intent analyser <---------
// --> **** vector db se baat karne se pehle history ko kisi llm ko bhej deta hu + question(user query) --> and isko bolo ki dono read karke meaningful intent/question generate karo [ki koi bhi samjh paye user kya question puch ra hai exact]
// --> then pehli wali processs hi repeat hogi jaise work hora tha --> ki question ko vector pe convert karo search top 10 related ones form vectordb and send it to llm and it give answer according to top10 answers
// --> **** little token consumption increase hoga --> but answer correct milega


// **** so after improvement "explain it in detail" --> ka answer correct ayega --> wo history pe pehle ke topics dekhe ga and unko detail pe explain karega ----> na ki "explain it in detail" as a new one treat karke vectordb se top10 result find karke incorrect answer dega

// --> **** bohot sare methods hai ayse hi so kisi mai kuch improvement and kisi mai kuch loss


// --------------------------------------------------------------------------------


// ----> 2) ** suppose if user ask bohot ajib question --> "what is egg" -->
//          solution1 --> so context pe aysa likho ki agar question ajib out of context hai toh answer ayse hi dedo -> "something went wrong and all"
//          solution2 --> not use vectordb first make ****tools --> query+context ko direct send to llm --> and llm ne bola answer ni pta ****tool ko call kardo then ab vectordb se top 10 utha ke laya then again send it to llm and it give answer


// --> **** tools : latest info ko fetch karte hai --> so chatgpt,llm gives correct results nowadays



// ---------------------------------------------------------------------------------


// 3) normal rag fail here ---->

// -> example -> elon msuh ki pdf hai 2000 page ki  
// --> chunk kare and vectordb pe dal diye 
// --> and ask question ---> "who is the friend friend of friend of tesla owner ?"
// --> so ye kya karega ki --> question ke similar find karega in vectordb --> and pdf pe aysa kuch tha hi ni direct --> but alag alag baat hui thi friend and uske friend ki thik ---> but ye correct answer ****ni de payega

// -> **** chunk pe divide kare hai na so direct baat ni hui hai na friend of friend of friend ki ----> but alag alag chunk pe hai 
// -> **** so correct answer ni de pata hai rag --> fails here -->  


// -----> ***** normal rag not handle connected things  

