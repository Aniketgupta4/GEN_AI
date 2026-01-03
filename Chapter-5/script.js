// 1) implementation of chapter-4

// ui <----------> server <-----------> LLM
//                   |
//                 /  \
//             crypto  weather

// LLM ke 2 baar call hote hain
// 1. user input ko process karne ke liye then send to server then
// 2. server se aayi hui information(ki kisko call/ya extra tool use karna hai) ko process karne ke liye


// ------------------------------------------------------


// 2) see documentation of gemini ai -> for functions
// 2 tool functions -> so llm can call these functions based on user input
// but hmko llm ko ye functions define karne hote hain -> ki konsa function kya karra hai kitne parameters leta hai etc



// --------> FINAL FLOW -> ASK QUESTION -> PUSH TO HISTORY -> RUN AGENT -> LLM CALL HOGA (LLM KE PASS HISTORY + QUESTION AYA) -> LLM DECIDE KAREGA KI KIS FUNCTION KO CALL KARNA HAI LLM RES TO SERVER {KEY:VALUE} PAIR ME -> SERVER FUNCTION CALL KAREGA -> FUNCTION RESPONSE KO HISTORY ME PUSH KAREGA -> PHIR SE LLM KO BHEJEGA WITH UPDATED HISTORY -> AB LLM DECIDE KAREGA KI AAPKO ANSWER DENA HAI YA AUR FUNCTION CALL KARNA HAI -> JAB TAK SARA KAAM NHI HO JATA TAB TAK YE CHALTA RAHEGA
// --------> **** LLM function call ni kar shakta wo sirf hame batayega ki konse function call karwana hai and args kya hai -> uske baad server pe hm function call karenge and uska response LLM ko denge fir LLM decide karega ki aur function call karna hai ya answer dena hai -> so LLM apan ke liye ek agent ki tarah kaam karega jo decide karega ki kya karna hai based on user input and history
// --------> **** LLM ke liye bohot easy task hai ki maine usko functions diye usko user input ko dekh be batana hai ki konse function ko call karna hai bs -> too easy for LLM to handle it dynamically


import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from "readline-sync"
import dotenv from "dotenv";
dotenv.config();

// Configure the client
const ai = new GoogleGenAI({apiKey:process.env.API_KEY});


// crypto currency tool function
async function cryptoCurrency({ coin }) {
  // parameter is object so {} ayse liye hai -> gemini aspects in parameters niche dekho
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`
  );
  const data = await response.json();
  return data;
}



// weather tool function
async function weatherInformation({ city }) {
  const url = `${process.env.WEATHER_BASE_URL}?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}




const cryptoInfo = {
  // **** -> tool function definition for gemini ai -> ki llm hmko jab reply kare to ache se reply kare {} object ke form pe (key-value) proper server ko
  name: "cryptoCurrency", // function name
  description:
    "We can give you the current price or other information related to any cryptocurrency like bitcoin and ethereum.",
  parameters: {
    type: Type.OBJECT, // parameter is in object so {} ayse liye hai
    properties: {
      coin: {
        type: Type.STRING,
        description:
          "It will be the name of the cryptocurrency like bitcoin, ethereum, etc"
      }
    },
    required: ["coin"]
  }
};


const weatherInfo = {
  name: "weatherInformation", // function name
  description:
    "You can get the current weather information of any city like london, goa etc",
  parameters: {
    type: Type.OBJECT, // parameter ka type object
    properties: {
      // parameter ke ander ki value ka type and description
      city: {
        type: Type.STRING,
        description:
          "Name of the city for which I have to fetch weather information like london, goa etc"
      }
    },
    required: ["city"] // which parameter is required
  }
};

// make tools

const tools = [
  {
    functionDeclarations: [cryptoInfo, weatherInfo]
  }
];


const toolFunctions = {
  // instead to if-else -> make object of functions -> jisme key function name and value function reference
  "cryptoCurrency": cryptoCurrency,
  "weatherInformation": weatherInformation
};


const History = []; // to store chat history between user and ai


async function runAgent() {
  
  while (true) {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: { tools }, // send info about tools to llm -> tools ke ander functions hai
    });

    if (result.functionCalls && result.functionCalls.length > 0) {
      
      // kaise pata chalega ki function call ke liye bolra hai ki answer dera hai -> and result.functionCalls array return karta hai -> agar function call karna hai to usme functionCalls key hota hai and uske ander functionCalls ka array hota hai -> agar length>0 hai to mtlb function call karna chahra hai
      console.log("My function is called");
      const functionCall = result.functionCalls[0]; // first function call uthao -> agar multiple function calls hote hai to unke liye loop lagana padega

      const {name,args} = functionCall; // destructure karo functionCall ko -> name and args milenge

      // *********** bohot sare functions hai and unke args bhi hai so unko {key:value} pair pe aye by llm in proper format so use {} in params and agar normal params pass kare toh ----.coin karke value access karna padega that is length and abhi apan {} use kare so wo apne se easily handle kar lega -> so manually if-else laga ke ****nahi karo (so llm ka kya mtlab use karne ka) -> dynamic way me karna padega by LLM *************
      // not use if else for multiple functions -> use llm to handle it dynamically
      // ----> make toolsfunctions in proper format and send to llm -> llm will handle it dynamically based on function name and args

      const response = await toolFunctions[name](args);
       // call the function dynamically based on name and args -> args is object so pass directly

      
      const functionResponsePart = {  // respone part  
            name: functionCall.name,
            response: {
                result: response,
            },
        };

     
      // Send the function response back to the model. and save it in history
      History.push({
        role: "model",
        parts: [{ functionCall: functionCall }],
      });

      History.push({
        role: "user",
        parts: [{ functionResponse: functionResponsePart }],
      });
    } else {
      History.push({
        role: "model",
        parts: [{ text: result.text }],
      });
      console.log(result.text);
      break; // exit the loop if no function call is needed
    }
  }
}


// user input 

while(true){
    
    const question = readlineSync.question('Ask me anything: ');

    if(question == 'exit'){
        break;
    }

    History.push({   // push question to history
      role:'user',
      parts:[{text:question}]
    });

    await runAgent();

}


// ----> FINAL FLOW -> ASK QUESTION -> PUSH TO HISTORY -> RUN AGENT -> LLM CALL HOGA (LLM KE PASS HISTORY + QUESTION AYA) -> LLM DECIDE KAREGA KI KIS FUNCTION KO CALL KARNA HAI LLM RES TO SERVER {KEY:VALUE} PAIR ME -> SERVER FUNCTION CALL KAREGA -> FUNCTION RESPONSE KO HISTORY ME PUSH KAREGA -> PHIR SE LLM KO BHEJEGA WITH UPDATED HISTORY -> AB LLM DECIDE KAREGA KI AAPKO ANSWER DENA HAI YA AUR FUNCTION CALL KARNA HAI -> JAB TAK SARA KAAM NHI HO JATA TAB TAK YE CHALTA RAHEGA
