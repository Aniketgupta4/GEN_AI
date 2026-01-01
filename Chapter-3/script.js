// 1) **** LLM -> ka ek kaam hai answer dena bhale wrong answer ho -> i.e. hallocination (confidence se wrong answer dena)

// -> **** LLM : token ko dekh ke output predict karta hai -> apan string number kisi pe input diye so wo inko token pe convert karta hai (particular llm ka token decide hota hai -> ani=2345, hello=9876 , etc) output predict karta hai and again string number ke form pe hmko output deta hai 
// -> kya hai ki pehle se hi llm hamare jaise questions dekhe hote hai so wo hamara question dekh ke old pattern based pe new input pe output predict karta hai

// -> **** is model me -> if we ask current date then it give 15 may 2024 and 2-3 dates too in next time ask not give correct date time -> ye dates tabki hai jab model train hua hoga -> but 2-3 dates kyu dera hai alag alag bar ? 
// -> but in gpt we ask current date and time then it tell correct date and time but our model in vscode not tell correct date and time why ?

// Today's class -> **** pure llm ni bata shakta hai date and time -> b/c pure llm is dumb 
// -> but jo hamara llm hota hai gpt wala wo date time bata deta hai -> beacuse -> (GPT = Pure LLM + EXTRA POWERS) -> 1) toh backend ke through jab apan req kare so current date time pass hua toh gpt ne show kar diya and 2) by some ai tools (GPT → Tool → System Clock → Answer) 

// ----> **** free api use karray hai so errors aa shakte hai -> 429 error or gemini busy too many requests -> so use another gemini model 
// -> recommeneded -> ki small model use karo -> isme less tokens use hongai -> kyuki isme thinking less hogi whereas in big model token jyada lagega kyuki kyuki model big hai
// -> or abhi bhi issue ni solve hua -> **** so paid pe convert karlo by give account details in ai studio -> so isme hmko free 300 dollar ke free token milengai so ayse bhi use kar shakte hai  


// ----------------------------------------------------------------


// 2) ----> // **** -> system config(context) attach karna (abhi toh fix info bhej ray hai apan) -> ki llm ko pata ho info user ki thoda bohot ki is user ka naam ye hai and all info related to user (so llm give better output because about user) ----> ye is liye kare kyuki llm hmko correct answer de usko hamara bare mai thoda bohot pata ho isi liye add kare extra info -> (**** token thoda sa jyada lagega per output correct milega) -> **** and ye config har chat-req ke sath jayegi ki hmko llm correct output de -> because req llm ke liye new hoti hai purani chats wo ni dekh pata hai na so pass config 


// import dotenv from "dotenv";
// dotenv.config();

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:process.env.API_KEY}); // api key setup

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash", // model 
   
//     config:{   // **** -> system config(context) attach karna (abhi toh fix info bhej ray hai apan) -> ki llm ko pata ho info user ki thoda bohot ki is user ka naam ye hai and all info related to user (so llm give better output because about user) ----> ye is liye kare kyuki llm hmko correct answer de usko hamara bare mai thoda bohot pata ho isi liye add kare extra info -> (**** token thoda sa jyada lagega per output correct milega) -> **** and ye config har chat-req ke sath jayegi ki hmko llm correct output de -> because req llm ke liye new hoti hai purani chats wo ni dekh pata hai na so pass config 
//        systemInstruction:`Current user name is Aniket , Age is 19 and Today date is ${new Date()}` // -> so ab llm in questions ke answer first time pe hi de dega because of context pass kare hm
//     },                    
   
//     contents: "what is my name ?", // question
//   });
//   console.log(response.text);
// }

// await main();


// ---------------------------------------------------------------


// 3) ----> INDIVIDUAL TOPIC BASED ANSWERS DEGA GPT

// normal chatbot koi bhi query ka answer deti hai thik 
// ******** per jaise zomato ka chatbot hai and let wo internal google llm use karra hai -> but wo zomato related answer hi dega -> ye ni batayega ki aaray kya hai and all -> sirf zomato related answer hi deta hai how ?
// so -> **** systemInstruction **** -> ka role aya -> batao ki ye zomato ka hai food related answers do bs or extra answers ni do strict rule to follow not answer extra thing only food related answer do -> is type se define karo systemInstruction pe 
// -> **** define rules ki ye particular topic based answers de

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:process.env.API_KEY}); // api key setup

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // model 
   
    config:{   // sabse pehle ye read hoga (systemInstruction) then user ka question dekhega and answer dega
       systemInstruction:`You are coding tutor, // -> define rules ki ye particular topic based answers de
                         Strict rules to follow
                         - you will only answer the question which is related to coding
                         - dont answer anything which is not related to coding
                         - reply rudely to user if they ask question which is not related to coding
                         ex -> you dumb , only ask questions related to coding`
    },                    
   
    contents: "what is linkedlist ?", // question
  });
  console.log(response.text);
}

await main();



