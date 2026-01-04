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

    


}