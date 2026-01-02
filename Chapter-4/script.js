// 1) AI Agent ( -> Ai Agent = LLM + Functions/Tools)


// automation pe chala jaye -> ex : video upload karna hai yt pe so mai sirf cmd diya wo apne se access kare video and upload karde

// Pure LLM : not have current data 
// but gpt-4 : have current data access (LLM + something extra)

// client -----> server (api) ----> LLM (gpt-4) + other tools (scraping, code execution, searching web etc) ye tools server pe lage hote hai
//                   | have
//                 TOOLS  (multiple tools available)      


// agent : jo apne aap decide kar lega ki konsa tool use karna hai
// ex : video upload karna hai yt pe so agent decide karega ki youtube api use karna hai
// agent ke paas kuch tools hote hai jese ki youtube api, web scraping, code execution etc
// jab client koi cmd deta hai to agent decide karega ki konsa tool use karna hai aur fir us tool ko use karke kaam complete karega


// -> ************* LLM function call ni kar sakta hai but LLM hame bata sakta hai ki konsa function call karna hai and uske args kya hone chahiye

// -> chatgpt -----> server (api) ----> LLM (gpt-4) + other tools (crypto api, weather api, news api etc) ye tools server pe lage hote hai
//                      | have
//                    TOOLS  (multiple tools available)

// -> jo when we talk to pure llm then it cant give time and date 
// -> whereas with gpt ->  (we)pc send req to gpt then context also send to llm(gpt) about current time and date and llm use that context to give answer or another tools se time date le leta hoga 

// ------------------------------------------------------------------


// -> Api -> jo free hoti hai wo hame ip se track karti hai ki kitna use kar rahe hai and limit cross karne pe block kar deti hai -> and jo kuch paid api hoti hai unme key hoti hai jise use karke hi api ko access kar sakte hai and wo hame key ke basis pe track karte hai ki kitna use kar rahe hai
// **** -> user ---req---> crypto api ---req---> crypto server ---res--> crypto api ---res--> user 


// 2) -> Api to get data
// -> User se crypto ka naam lega -> but user sirf name dega (ex : bitcoin, ethereum etc) tab toh work karegi api and 
// -> agar user kuch aur input dega (ex : price of bitcoin, aj kya price hai crypto ka, what is ethereum etc) toh kaam nahi karegi api
// -> **** so work ko automate karne ke liye hume ek aisa agent chahiye jo user ke input ko samjhe aur fir sahi crypto ka naam nikal ke de api ko de de taki api sahi se kaam kare
// **** -> iske liye apan ek ai agent banayenge jo LLM ka use karke user ke input ko samjhega aur fir sahi crypto ka naam nikal ke dega api ko taki api sahi se kaam kare and give data 

// -> so apan ko kya karna hai ki -> input mai se crypto ka **** naam nikalna hai using LLM and fir us naam ko api mai use karna hai


import readlineSync from "readline-sync";

async function get_crypto_price(coin){
    
   const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin}`);
   const data = await response.json();

   console.log(data);
}

// const question = readlineSync.question("Ask me about crypto :-> ");
// get_crypto_price(question);


// ------------------------------------------------------------------


// 3) bohot sare functions hote hai so kaise pata lagega kya key word data se nikalna hai konse function ko call karna hai ? 
// -> bohot bada code hoga so we dont we if-else or switch case


async function news(topic){
  // logic
}

async function weather(city){
  // logic
}

// --------------------AUTOMATION(AI-AGENT)-----------------------

// **** so kaise decide hoga konse function ko call karna hai ? 
// ************ manually nahi kar sakte hai so iske liye apan ai agent ka use karenge jo LLM ka use karke ye decide karega ki konsa function call karwana hai by server based on user input


// ************* LLM function call ni kar sakta hai but LLM hame bata sakta hai ki konsa function call karna hai and uske args kya hone chahiye ----> so server function call kar dega
// -> **** LLM hamara answer dene mai expert hai -> so mai LLM ko bataoga ki 3 functions hai 1) crypto  2) weather 3) news -> so jo bhi user input dega uske basis pe LLM batayega ki is particular function ko use karo and is format mai info send karega ****server ko {"name":"crypto",args:{coin:"bitcoin"}} thik
// -> and fir ****server function call kar dega


// -> hame LLM ko prompt dena hoga jisme hame batana hoga ki konsa function available hai and uska format kya hai taki LLM sahi se samajh sake ki konsa function call karna hai and uske args kya hone chahiye
// -> fir LLM user ke input ko samjhega and decide karega ki konsa function call karwana hai and uske args kya hone chahiye ------> and fir server us function ko call kar dega with args
// -> ****context mai hame batana hoga ki konsa function available hai and uska format kya hai taki LLM sahi se samajh sake ki konsa function call karna hai and uske args kya hone chahiye 

// -> mota mota flow kuch is tarah hoga : 
// user ---> server ---> LLM (decide function and args) ---> server (call function with args) ---> function (return data) ---> server ---> user

// ----------------------------------------------------------------

const question = readlineSync.question("Ask me about crypto :-> ");
get_crypto_price(question); // get_crypto_price(question);  -> ye function call karna hai ya news(topic) or weather(city) ye decide karna hai ai agent ko


// ----------------------------------------------


// 4) AUTOMATION FLOW ->

// let aysa kuch automate karna hai ki mai sirf batao and wo file delete ho jaye
// so we have to create ai agent per
// ******** LLM toh sirf answer dene mai expert hai ----> so LLM hmko file delete karne ki command de dega and fir server wo command execute kar dega

// -----------> LLM cannot execute code but can suggest code / **** GIVE COMMANDS to be executed <------------
// user ---> server ---> LLM (suggest code / **** GIVE COMMANDS to be executed) ---> server (execute code) ---> OS (file deleted) ---> server ---> user

// **** ----> hamare uper hai LLM ko prompt dena hai ki konsa kaam karna hai and LLM hame commands de dega and fir server wo commands execute kar dega

///////////// AI AGENT = LLM + FUNCTIONS /////////////



// -> llm cant access our db or file system directly but llm hame commands de sakta hai ki konsa function call karna hai and uske args kya hone chahiye and fir server wo function call kar dega with args
// -> so ai agent = llm + functions (functions jo server pe lage hote hai jese ki file delete karna, db se data nikalna etc) 
// -> jab user koi cmd deta hai to ai agent decide karega ki konsa function call karna hai and uske args kya hone chahiye and fir server wo function call kar dega with args


// ----------------------------------------------------------


// 5) ----> **** LLM per aankh band karke llm pe bharosa ni karo ----> london mai ek llm ne command di db delete kardo -> so company ka db hi delete hogya
// -> so hamesha llm ke output ko verify karna chahiye before executing any command
// -> jese ki agar llm ne bola ki db delete kar do toh pehle check kar lo ki kya waqai mai aisa command dena chahte ho
// -> iske liye apan ek verification step add kar sakte hai jisme llm ke output ko verify kiya jaye before executing any command
// -> agar haan toh hi command execute karo warna nahi


// **** ----> so ek or LLM use kar sakte hai verification ke liye
// user ---> server ---> LLM1 (suggest code / **** GIVE COMMANDS to be executed) ---> LLM2 (verify commands) ---> server (execute code) ---> OS (ANY WORK) ---> server ---> user
// -> LLM1 jo hai wo command suggest karega and LLM2 jo hai wo us command ko verify karega


// --------> MEANS LLM ONLY PREDICT OUTPUT BASED ON INPUT AND CONTEXT  <--------

// ----------------------------------------------------------