// ----> **** issues -> first see in leetcode (leet ai) -> iska user experience bekar hai -> if u ask question explain toh leet ai bolta hai code copy paste karo ----> so yahi sab hmko improve karna hai apne ai me -> so isse accha toh chapgpt se puch le agar code copy paste hi karna hoga inside particular leetcode question ke sath leet ai pe
// ----> kya kare hai rohit bhaiya in leetcode ki -> text bar pe kuch kuch options dedo explain apprach , test case , etc -> so isme se ye token bacha ray hai -> ki llm ko ni bhej ray hai ye pre defined questions inko ye db pe store kar leta hai and waha se answer de dete hai and baki new questions ke liye toh llm ko call karna hi hoga -> so tokens bache and user experience bhi acha ho jata hai -> BUSINESS LOGIC HAI BHAI YE TOH

// ******** -> IMPROVE THESE THINGS (DO OPTIMIZATIONS)


// 1) CREATE YOUR OWN CURSOR ----> MINI VERSION
// -> CURSOR -> mai kuch bhi input du toh uske basic pe code wagera generate kar dega file form mai ----> but all thing AUTOMATED ho

// USER INPUT -> "CREATE A CALCULATOR APP" -----> CURSOR -----> BASIC CALCULATOR APP CODE (FILE BANAYEGA -> HTML, CSS , JS) -----> USER KO DE DEGA
// ********** USER INPUT DIYA SERVER KO -----> SERVER SE LLM KO REQ GAYI KI YE BANANA HAI -----> LLM NE COMMANDS DI TO SERVER -----> SERVER NE FUNCTION CALL / (TOOL SE) KARDI AND FILES BAN GAYI  -----> AND PHIR NEXT PE LLM FULL COMMAND DEGA KI KONSI FILE MAI CODE AYEGA SO AUTOMATICALLY LIKH JAYEGA IN FILES  ------> SERVER SE USER KO FILES DE DI


// -----------------------------------------------------



import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from "readline-sync";
import dotenv from "dotenv";
dotenv.config();

import {exec} from "child_process";
import util from "util"; // util ka use karray hai kyuki we use async await in function so without util callback hell problem ati hai so use -> util -> promisify -> jo function promise return karega usko async await ke sath use kar payenge
const execute = util.promisify(exec);
import os from "os"; // apan ko platform ke hisab se command dena hai na so os ka use karray hai 
import { text } from "stream/consumers";


const platform = os.platform(); // **** platform ka use karray hai ki konsa os use kar rahe hai user -> windows / linux / macos


// Configure the client
const ai = new GoogleGenAI({apiKey:process.env.API_KEY});


// tool
async function executeCommand({command}){ // **** child process (node.js) help karega ki jo wo command leke aya hai usko execute karane pe -> npm i child-process -> it also need util so install it -> npm i util

  try{
    const {stdout,stderr} = await execute(command); // **** execute jo function hai wo promise return karta hai isliye async await use kar rahe hai
    
    if(stderr){
      return `Error: ${stderr}`;
    }

    return `Stdout: ${stdout}`;


  }catch(err){
    return `Error executing command: ${err.message}`;
  }
}



// configure tool
const commandExecuter = {
    name:"executeCommand",
    description: "It takes any shell/terminal command and execute it. It will help us to create, read, write, update, delete any folder and file",
    parameters:{
        type: Type.OBJECT,
        properties:{
            command:{
                type:Type.STRING,
                description: "It is the terminal/shell command. Ex: mkdir calculator , touch calculator/index.js etc"
            }
        },
        required:['command']
    }
}



const History = [];



async function buildWebsite(){

    
  while(true){

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: History,
      config:{
        systemInstruction: `You are a website Builder, which will create the frontend part of the website using terminal/shell Command.
         You will give shell/terminal command one by one and our tool will execute it.

         Give the command according to the Operarting system we are using.
         My Current user Operating system is: ${platform}.

         Kindly use best practice for commands, it should handle multiline write also efficiently.

         Your Job
         1: Analyse the user query
         2: Take the neccessary action after analysing the query by giving proper shell.command according to the user operating system.

         Step By Step By Guide

         1: First you have to create the folder for the website which we have to create, ex: mkdir calculator
         2: Give shell/terminal command to create html file , ex: touch calculator/index.html
         3: Give shell/terminal command to create CSS file 
         4: Give shell/terminal command to create Javascript file 
         5: Give shell/terminal command to write on html file 
         6: Give shell/terminal command to write on css file 
         7: Give shell/terminal command to write on javascript file
         8: fix the error if they are persent at any step by writing, update or deleting`,
        tools:[{
          functionDeclarations: [commandExecuter],
        }]
      },

    });

     if(result.functionCalls && result.functionCalls.length>0){

      const functionCall = result.functionCalls[0]; // **** jo function call hua hai usko le rahe hai

      const {name,args} = functionCall;

      const toolResponse = await executeCommand(args); // **** jo command execute karani hai usko yaha pe call kar rahe hai

      const functionResponsePart = {
            name: functionCall.name,
            response: {
                result: toolResponse,
            },
      };


    // Send the function response back to the model.
    History.push({
      role: "model",
      parts: [
        {
          functionCall: functionCall,
        },
      ],
    });

    History.push({
      role: "user",
      parts: [
        {
          functionResponse: functionResponsePart,
        },
      ],

    });

     }else{

      console.log(result.text);
      History.push({
        role:"model",
        parts:[{text:result.text}]

      })
     }
  }
}




while(true){
  
  const question = readlineSync.question("Ask me anything --> ");

  if(question==='exit'){
    break;
  }

  History.push({
    role:'user',
    parts:[{text:question}]
  });

  await buildWebsite();

}

// isme issue aara hai so see windows.js for correct code