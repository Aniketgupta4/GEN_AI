// --------- LangChain ----------

// LangChain is an open-source framework used to build applications powered by Large Language Models (LLMs) like OpenAI GPT models.
// It helps developers connect:
// LLMs,prompts,memory,tools/APIs,databases,agents
// to create intelligent AI applications such as chatbots, AI assistants, RAG systems, and autonomous agents.


// ------------------------------------------------------------


// --------- LANGGRAPH ----------

// -> LangGraph is a framework built on top of LangChain that helps developers create stateful, multi-step AI applications using a graph-based workflow.
// -> LangGraph allows you to connect AI agents, tools, and logic together as nodes in a graph, where:
//      Nodes = tasks/functions/agents
//      Edges = flow between tasks
//      State = shared memory/data passed through the workflow


// -> Normal LLM apps follow a simple chain: ----> Input → LLM → Output
// -> LangGraph apps follow a graph structure: ----> Input → Node 1 → Node 2 → Node 3 → Output

// -> Each node can be an LLM call, a tool execution, or custom logic.
// -> The graph structure allows for branching, loops, and complex workflows that are not possible with simple chains.
// -> LangGraph provides a visual interface to design and manage these graphs, making it easier to build sophisticated AI applications without writing complex code.



// --> loop wagera ka bolra hai ki langgraph loop work ke liye use hota hai -> per ye bookish baate hai 
// --> LangGraph is used to create complex AI applications that require multiple steps, decision points, and interactions with tools or APIs.


// ALL ARE BOOKISH ANSWERS uper wale 




// --> **** Actual use of Langgraph ****

// -> llm and tools ke bich bohot sari calls hongi bar bar hai thik (complex workflow) -> isko apan normal bhi kar shakte hai without langgraph -> abhi tk apan normal karray thay without langgraph ----> **** why langgraph langchain pe kya issue hai batao ? 
// -> loop wala/repetitive wala kaam langchain se kar shakte hai ----> but in purane project pe apan ek step karne ke baad usko comment karte thay for next step karne ke liye yaad hai (in runindexing.js pe in step1 and step2) 
// -> in indexing phase : pdf file ki entity create and store in graphdb
// -> and pdf file: chunk kare embedding kare -> store in vector db too 

// -> **** dikkat ye thi graphdb pe data store hogya tha and vectordb pe fail hogya tha --> to usko baar baar comment karna pad raha tha for next step -> isko langgraph se solve kar sakte hai without commenting and uncommenting code for each step
// -> and agar apan again run kare without comment toh duplicate data store ho jayega in graphdb so ise bacnhe ke liye comment kardete thay so ye hmko dhyan rakhna hoga --> YE MAIN ISSUE THA AND ISKO HM KHUD SE KARRAY THAY AND THIS IS NOT SCALABLE SYSTEM SO --> LANGGRAPH KA SCENE AYA YE SAB WO DEKHEGA SAMJHE -> KI KYA CHALANA HAI KYA NI CHALANA HAI WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP
// -> **** langgraph me graph structure banayenge jisme pehle node me graphdb me data store karenge and next node me vectordb me data store karenge and dono nodes ko connect kar denge to dono steps ek sath chal jayenge without commenting and uncommenting code for each step  

// -> so langgraph ke ander kuch aysa hoga ki -> step koi sa done hua toh wo markdown karke rakhega ye hogya tha so ab isko ni chalana dubara toh wo check karega ki ye step already done hai toh wo skip kar dega and next step pe chala jayega without commenting and uncommenting code for each step -> and aage wale ko chalayega khud se samjhe
// -> but ye info kaha store hongi ki ye step done hogya ya ni hua

// -> **** ye info graph structure ke ander store hogi as ***state of the node -> so jab bhi koi node execute hoga toh wo apne state ko update karega ki ye step done hogya hai toh next time jab wo node execute hoga toh wo check karega ki ye step already done hai toh wo skip kar dega and next node pe chala jayega without commenting and uncommenting code for each step

// what is state of the node ?
// -> state of the node is a data structure that holds information about the execution of the node, such as whether the node has been executed or not, and any relevant data or results from the execution. 
// -> this state can be used to determine whether to execute the node again or skip it if it has already been executed, allowing for more efficient and scalable workflows in langgraph applications.

// -> bs iske pehle value store karane ke liye variable pe store kara ray hai ya map pe and kisi pe bhi ki ye run ho chuka hai ni hua hai thik --> but again restart hoga toh ye reset ho jayega na toh ye problem create karega toh isko solve karne ke liye langgraph me state of the node use karenge jisme ye info store hogi ki ye step done hua hai ya ni hua hai toh agar restart hoga toh bhi ye info reset nahi hogi aur next time jab wo node execute hoga toh wo check karega ki ye step already done hai toh wo skip kar dega and next node pe chala jayega without commenting and uncommenting code for each step  
// -> **** use database to store the state of the node so that it can persist even after a restart.
// -> konsa db use kare batao
//  --> sql or nosql or redis ya koi aur db use kare batao --> graphdb use kar sakte hai state of the node store karne ke liye kyunki graphdb me nodes and edges hote hai toh har node ke ander state of the node store kar sakte hai toh jab bhi koi node execute hoga toh wo apne state ko update karega ki ye step done hogya hai toh next time jab wo node execute hoga toh wo check karega ki ye step already done hai toh wo skip kar dega and next node pe chala jayega without commenting and uncommenting code for each step

// or ya phir ek file banake usme data[kam data hai jyada ni hai data bohot] store kar shakte hai na [wo delete bhi ni hogi khud se apan karengai tab delete hogi] and uspe data daldo ki ye step done hua hai ni hua hai and all --> but file me store karne se performance issue aa sakta hai 

// --> but db ka kya need hai jab jyada data ni hai toh file me store kar sakte hai state of the node ko but agar jyada data hai toh db use karna chahiye state of the node store karne ke liye because db me data ko efficiently store and retrieve kiya ja sakta hai without performance issues, whereas file storage can lead to performance issues as the size of the data grows.
// -> but manually code likhna hoga agar file pe store karray hai toh -> actual kaam karna padega -> kisi ke sath share karna hai and usko kisi ko pdf ke liye work karna hai toh wo work ni karega bohot changes karne padengai so ye --> SCALABLE SYSTEM NI BAN PAYEGA --> so db ki requirement ayi -> then graphdb use karne ka idea aya state of the node store karne ke liye because graphdb me nodes and edges hote hai toh har node ke ander state of the node store kar sakte hai toh jab bhi koi node execute hoga toh wo apne state ko update karega ki ye step done hogya hai toh next time jab wo node execute hoga toh wo check karega ki ye step already done hai toh wo skip kar dega and next node pe chala jayega without commenting and uncommenting code for each step



// -------------------- SO LANGGRAPH IS USED IS ISSUE KO SOLVE KARNE KE LIYE -------------------




// PDF --> VECTOR DB [PDF KO VECTOR DB PE STORE KARNA HAI]

// S1) -> LOAD PDF                TEXT CONTENT
// S2) -> CHUNKING                1 MILLION CHUNKS
// S3) -> EMBEDDING               1M VECTOR EMBEDDINGS
// S4) -> STORE IN VECTOR DB      1M VECTOR EMBEDDINGS 
// S5) -> END

// LET BOHOT BADI PDF HAI AND 1 MILLION CHUNKS BANE HAI USKE AND US 1M CHUNKS KE 1M EMBEDDINGS BANI HAI AND US 1M EMBEDDINGS KO VECTOR DB ME STORE KARNA HAI TOH APAN KYA KARENGE ?
// **** SUPPOSE 5 LAKH VECTOR EMBEDING PE FAIL HO GAYA TOH APAN KYA KARENGE ?
// SO APAN KO YE 5 LAKH EMBEDDING HATANA PADEGA AND PHIR SE CHUNKING SE SHURU KARNA PADEGA AND PHIR SE EMBEDDING KARNA PADEGA AND PHIR SE VECTOR DB ME STORE KARNA PADEGA TOH YE BOHOT TIME CONSUMING PROCESS HOGA AND APAN KO YE SAB STEP COMMENT KARNA PADEGA FOR NEXT STEP TO RUN KARNE KE LIYE OR AGAR APAN KO YE STEP AGAIN RUN KARNA HAI TOH APAN KO YE STEP UNCOMMENT KARNA PADEGA TOH YE PROCESS BOHOT TEDIOUS HO JAYEGA AND TIME CONSUMING HO JAYEGA
// YE EMBDEEING ARRAY KE ANDER HI STORE HOTI HAI -> AND CODE FATA TOH ARRAY GAYAB NEW ARRAY AYA -> TOH APAN KO YE 5 LAKH EMBEDDING HATANA PADEGA AND PHIR SE CHUNKING SE SHURU KARNA PADEGA AND PHIR SE EMBEDDING KARNA PADEGA AND PHIR SE VECTOR DB ME STORE KARNA PADEGA TOH YE BOHOT TIME CONSUMING PROCESS HOGA AND APAN KO YE SAB STEP COMMENT KARNA PADEGA FOR NEXT STEP TO RUN KARNE KE LIYE OR AGAR APAN KO YE STEP AGAIN RUN KARNA HAI TOH APAN KO YE STEP UNCOMMENT KARNA PADEGA TOH YE PROCESS BOHOT TEDIOUS HO JAYEGA AND TIME CONSUMING HO JAYEGA
// CHECKPOINTS LAGA HAKTE HAI BICH BICH PE BUT CODE BOHOT LIKHNA PADEGA SO --> LANGGRAPH KA USE AYA YE SAB PROBLEMS SOLVE KARNE KE LIYE 


// -> APAN S1 TO S4 KO LANGGRAPH ME NODE BANAYENGE AND UN NODES KO EDGES SE CONNECT KAR DENGE TOH APAN S1 TO S4 KO EK SATH CHALA SAKTE HAI WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP AND APAN STATE OF THE NODE USE KARKE YE CHECK KAR SAKTE HAI KI KYA YE STEP DONE HOGYA HAI YA NI HOGYA HAI TOH AGAR YE STEP DONE HOGYA HAI TOH WO STEP SKIP HO JAYEGA AND NEXT STEP PE CHALA JAYEGA WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP


// --> LANGGRAPH  --> NODE , STATE , EDGES


// -> Node: A node represents a specific task or function in the workflow. It can be an LLM call, a tool execution, or custom logic. Each node has its own state that can be updated based on the execution of the task it represents.
//          -> NODE -> FUNCTION HAI BS JO KISI SPECIFIC TASK KO REPRESENT KARTA HAI WORKFLOW ME -> YE TASK KYA HAI ? -> LLM CALL HO SAKTA HAI YA TOOL EXECUTION HO SAKTA HAI YA CUSTOM LOGIC HO SAKTA HAI -> HAR NODE KA APNA STATE HOTA HAI JO UPDATE HO SAKTA HAI BASED ON THE EXECUTION OF THE TASK IT REPRESENTS

// -> State: The state of a node is a data structure that holds information about the execution of the node, such as whether the node has been executed or not, and any relevant data or results from the execution. This state can be used to determine whether to execute the node again or skip it if it has already been executed, allowing for more efficient and scalable workflows in LangGraph applications.
//          -> STATE -> STORAGE SYSTEM [DB MAAN LO -> IS DB PE APAN QUESTION DALDO JO USER NE PUCHA HAI AND TEXT CONTENT,CHUNKS,EMBEDINGS SAB DALDO ISME  ]

// -> Edges: Edges represent the flow between nodes in the graph. They define the order of execution and how data is passed from one node to another. Edges can also represent decision points or branching in the workflow, allowing for complex logic and interactions between tasks.
//          -> EDGES -> FLOW BATATA HAI NODES KE BICH KISKE BAAD KYA KARNA HAI KONSA NODE CALL HOGA NEXT


// --> **** SO HAR KOI DATA YAHA SE READ KAREGA , WRITE KAREGA , YAHA SE UPDATE KAREGA YAHA SE SAB KAREGA KI YE STEP DONE -> 1 CENTRALIZED SYSTEM BANA DIYE


// PDF --> VECTOR DB

// S1) -> LOAD PDF                TEXT CONTENT                                               // STATE : STORAGE SYSTEM  
// S2) -> CHUNKING                1 MILLION CHUNKS       ------>                       [PDF,TEXT CONTENT,1M CHUNK,1M EMBEDDINGS] SAB YAHI STORE KARDO   
// S3) -> EMBEDDING               1M VECTOR EMBEDDINGS
// S4) -> STORE IN VECTOR DB      1M VECTOR EMBEDDINGS 
// S5) -> END

// --> **** AGAR KUCH FAIL HUA TOH WO STATE SE CHECK KAREGA KI YE STEP DONE HOGYA HAI YA NI HOGYA HAI TOH AGAR YE STEP DONE HOGYA HAI TOH WO STEP SKIP HO JAYEGA AND NEXT STEP PE CHALA JAYEGA WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP


// ---->  SABSE PEHLE LOAD PDF -> PDF LEGA AND TEXT CONTENT DEGA AND ISKO STORAGE PE SAVE KAR DENGAI THEN CHUNKING WALA -> TEXT CONTENT [STORAGE SE] LEGA AND 1 MILLION CHUNKS DEGA AND ISKO STORAGE PE SAVE KAR DENGAI THEN EMBEDDING WALA -> 1 MILLION CHUNKS [STORAGE SE] LEGA AND 1 MILLION VECTOR EMBEDDINGS DEGA AND ISKO STORAGE PE SAVE KAR DENGAI THEN STORE IN VECTOR DB WALA -> 1 MILLION VECTOR EMBEDDINGS [STORAGE SE] LEGA AND VECTOR DB ME STORE KAR DENGAI 
// -> **** DIKKAT YE HAI KI PROCESS HONE KE BAAD HI STORE HORA HAI AND AGAR BICH PE FAIL HUA TOH PHIR SE PURA 1M DATA PE WO KARNA HOGA WO STEP BAKI USKO UPER JO HO CHUKA HAI WO TOH PTA HAI
// -> SO KUCH AYSA KARO KI -> 1M CHUNK CHUNK DIRECT NA KARKE -> BATCHES BANA KO KARE 10K 10K DATA KA LEKE CHUNK KARO AND PHIR EMBEDDINGS KARO -> TOH SAHI HAI AB YE -> BUT BATCHES KO KON CREATE KAREGA -> TOH APAN KO BATCHES CREATE KARNE KE LIYE EK NODE BANANA PADEGA JO BATCHES CREATE KAREGA AND US NODE KO CHUNKING NODE SE PEHLE RAKHNA PADEGA TOH WO BATCHES CREATE KAREGA AND PHIR CHUNKING NODE US BATCHES KO LEKE CHUNKING KAREGA AND PHIR EMBEDDING NODE US CHUNKS KO LEKE EMBEDDINGS BANAYEGA AND PHIR VECTOR DB ME STORE KAREGA


// FINAL FLOW ----> PDF --> VECTOR DB

// S1) -> LOAD PDF                TEXT CONTENT                                                                                                     // STATE : STORAGE SYSTEM  
// S2) -> CHUNKING                1 MILLION CHUNKS                                                  ------>                               [PDF,TEXT CONTENT,1M CHUNK,1M EMBEDDINGS] SAB YAHI STORE KARDO   
// S3) -> BATCHING                1 MILLION CHUNKS -> 100 BATCHES OF 10K CHUNKS -> A/C TO US                                           INDEX : 0[UPDATE HOTE JAYEGA]  ,  BATCHES : 10K-10K , CHUNKEMBEDDING : 10K CHUNK READY (BAR BAR NEW NEW AGLE 10K VECTORS AYENGAI) , VECTOREMDEDDING: [10KVECTOR,........] , INDEX SIZE 1M SO STOP LOOP AND NICHE JAO NICHE WALE STEPS PE
//          ||(BOTH DIRN FLOW LOOP HAI JABTAK 1M CHUNKS COMPLETE NI HO JATA TAB TAK YE BATCHING NODE CHALTA RAHEGA AND CHUNKING NODE BHI CHALTA RAHEGA)
// S4) -> EMBEDDING               1M VECTOR EMBEDDINGS
// S5) -> STORE IN VECTOR DB      1M VECTOR EMBEDDINGS                                                                                  INDEX2 : 0 [UPDATE HOTE JAYEGA] , JABTAK 1M VECTOR EMBEDDINGS COMPLETE NI HO JATA TAB TAK YE BATCHING NODE CHALTA RAHEGA AND EMBEDDING NODE BHI CHALTA RAHEGA AND STORE IN VECTOR DB NODE BHI CHALTA RAHEGA
// S6) -> END



// --> MORE OPTIMIZE FLOW

// S1) -> LOAD PDF                TEXT CONTENT                                                                                                     // STATE : STORAGE SYSTEM  
// S2) -> CHUNKING                1 MILLION CHUNKS                                                  ------>                               [PDF,TEXT CONTENT,1M CHUNK,1M EMBEDDINGS] SAB YAHI STORE KARDO   
// S3) -> BATCHING                1 MILLION CHUNKS -> 100 BATCHES OF 10K CHUNKS -> A/C TO US                                           INDEX : 0[UPDATE HOTE JAYEGA]  ,  BATCHES : 10K-10K , CHUNKEMBEDDING : 10K CHUNK READY (BAR BAR NEW NEW AGLE 10K VECTORS AYENGAI) , VECTOREMDEDDING: [10KVECTOR,........] , INDEX SIZE 1M SO STOP LOOP AND NICHE JAO NICHE WALE STEPS PE
//        ||  ||(BOTH DIRN FLOW LOOP HAI JABTAK 1M CHUNKS COMPLETE NI HO JATA TAB TAK YE BATCHING NODE CHALTA RAHEGA AND CHUNKING NODE BHI CHALTA RAHEGA)
// S4) -> || EMBEDDING            1M VECTOR EMBEDDINGS
// S5) -> STORE IN VECTOR DB      1M VECTOR EMBEDDINGS                                                                             **** INDEX2 : 0 [UPDATE HOTE JAYEGA] , ******** JABTAK 1M VECTOR EMBEDDINGS COMPLETE NI HOTI --> ************** AND STORE IT IN VECTOREMBEDDING:10K VECTOR EMBEDDINGS READY AND THEN AGAIN CHUNKING NODE SE 10K CHUNKS LEKE AUR 10K VECTOR EMBEDDINGS BANAYEGA AND PHIR STORE IN VECTOR DB NODE US 10K VECTOR EMBEDDINGS KO VECTOR DB ME STORE KAR DEGA AND YE PROCESS TAB TAK CHALEGA JAB TAK 1M VECTOR EMBEDDINGS COMPLETE NI HO JATA AND NO NEED OF ARRAY AB
// S6) -> END                                                                                                                             (ARRAY KI PLACE PE BATCHES BAN JAYENGAI AND BATCHES ME 10K CHUNKS HONGE AND HAR BATCH KE LIYE 10K VECTOR EMBEDDINGS BANENGE AND PHIR US 10K VECTOR EMBEDDINGS KO VECTOR DB ME ****STORE KAR DENGE AND YE PROCESS TAB TAK CHALEGA JAB TAK 1M VECTOR EMBEDDINGS COMPLETE NI HO JATA AND NO NEED OF ARRAY AB)




// -------------------> HOW GRAPH CREATE IN LANGGRAPH ? <------------------ 
// ----> like js object banate hai waise hi graph create karte hai langgraph me

// -> state:{                                               // S1) -> LOAD PDF           
//     pdf:"./hello.pdf",                                   // S2) -> CHUNKING 
//     textContent:null,                                    // S3) -> BATCHING
//     chunks:null,         <---(read/update karega)-----   //        ||  ||                       
//     batches:10k,                                         // S4) -> || EMBEDDING 
//     chunkEmbeddings:null,                                // S5) -> STORE IN VECTOR DB
//     vectorEmbeddings:null                                // S6) -> END
// }

// --> ye states update hoti rahengi 


// -> 1) function loadpdf(state){
//     // load pdf logic and pdf ko load karke text content nikal lo
//     // update the state 
//}

// -> 2) function chunking(state){
//     // chunking logic and text content ko chunks me convert kar do
//     // update the state 
// }

// ..... same functions for batching, embedding and store in vector db


// -----------> **** SINCE ALL THES FUNCTIONS ARE NODES -> AND WORK OF NODE IS TO COMPLETE THERE TASK
// -----------> AND EDGES ARE TO CONNECT THESE NODES TOGETHER TO CREATE A WORKFLOW

// EDGES : graph.add("loadpdf","chunking") -> matlab loadpdf ke baad chunking chalega
// graph.add("chunking","batching") -> matlab chunking ke baad batching chalega
// graph.add("batching","embedding") -> matlab batching ke baad embedding chalega
// graph.add("embedding","storeinvectordb") -> matlab embedding ke baad store in vector db chalega

// kisi kisi pe 2 edges hai toh conditional wo banegi

// graph.addconditionaledge("storedb",
// if(index<1million)
// "batches"
// else
// "end"
// )


// -----------> **** SO LANGGRAPH ME APAN KO YE SAB FUNCTIONS NODES KE FORM ME BANANE HONGAI AND UN NODES KO EDGES SE CONNECT KARNA HOGA TOH APAN KO YE S1 TO S5 KO LANGGRAPH ME NODE BANAYENGE AND UN NODES KO EDGES SE CONNECT KAR DENGE TOH APAN S1 TO S5 KO EK SATH CHALA SAKTE HAI WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP AND APAN STATE OF THE NODE USE KARKE YE CHECK KAR SAKTE HAI KI KYA YE STEP DONE HOGYA HAI YA NI HOGYA HAI TOH AGAR YE STEP DONE HOGYA HAI TOH WO STEP SKIP HO JAYEGA AND NEXT STEP PE CHALA JAYEGA WITHOUT COMMENTING AND UNCOMMENTING CODE FOR EACH STEP



// ------------------------------------------------------------------------------------------------------------------




// LANGGRAPH PART2 

// -> there are so many frameworks like langgraph so apan baki ko bhi dekh shakta hai
// -> but langgraph is the best one for learning and understanding the concept of graph database

// -> state ke ander hum log pura data store karte hai and read write kar shakte hai its like a centralized place [db] where hum log apna data store karte hai and read write kar shakte hai


// --> -------- CHECKPOINTS --------

// -> checkpoints are like milestones in our learning journey, they help us to track our progress and understand how much we have learned so far.

// -> checkpoints are like snapshot -> example -> pdf load kare state create hui -> but new state pe textcontent ko wo karengai -> then next step pe chunking karna hoga so -> again new state create hogi and new state pe chunks create karega purani pe kuch ni karega -> is type se hi new new state create honngi for particular step and we can track our progress and understand how much we have learned so far.

// **** these are checkpoints -> jaise work/process ho jayega koi si waise hi ek new state create hogi and we can track our progress and understand how much we have learned so far.

                                              // langgraph 
// S1) -> LOAD PDF                         // -> state:{                                     // -> state:{                                // -> state:{      
// S2) -> CHUNKING                         //     pdf:"./hello.pdf",                         //     pdf:"./hello.pdf",                    //     pdf:"./hello.pdf", 
// S3) -> BATCHING                         //     textContent:null,                          //     textContent:null,                     //     textContent:null,          
//        ||  ||            ---->          //     chunks:null,                                //     chunks:null,                          //     chunks:null, 
// S4) -> || EMBEDDING                     //     batches:10k,                                //     batches:10k,                          //     batches:10k, 
// S5) -> STORE IN VECTOR DB               //     chunkEmbeddings:null,                       //     chunkEmbeddings:null,                  //     chunkEmbeddings:null, 
// S6) -> END                              //     vectorEmbeddings:null                       //     vectorEmbeddings:null                 //     vectorEmbeddings:null                                                                                            
                                           // }                                                // }                                         // }
                                            //       CHECKPOINT1                                       CHECKPOINT2                                CHECKPOINT3

// -> state:{                                                         
//     pdf:"./hello.pdf",                                 
//     textContent:null,                                  
//     chunks:null,                         
//     batches:10k,                                         
//     chunkEmbeddings:null,                                
//     vectorEmbeddings:null                           
// }
//     CHECKPOINT5

// --> suppose kahi pass code fat gaya so apko samajh ni aa rha ki kaha se start karna hai to ap checkpoints pe jao and dekho ki kaha tak kaam complete ho chuka hai and kaha se start karna hai and uske according code likhna start kar do and jab bhi koi step complete ho jaye to checkpoint pe jao and update kar do ki ye step complete ho gaya hai and next step pe kaam start kar do and is type se apko pata chal jayega ki kaha tak kaam complete ho chuka hai and kaha se start karna hai and apka kaam bhi easy ho jayega.

// --> why itne sare checkpoint create karna and data store karna same same ?
// -> har step pe state create hori hai new new 

// -> **** agar sirf 1 state bs bana diye bs toh new new bohot sari state ni banaye toh ?
// -> **** let kahi pe error aya hai toh pata lagega ki uper bhi kahi pe galti hai
// -> so uper wala bhi code change hoga and then ye niche wala change hoga 
// -> **** so ab apan ko uper wali state chaiye uper ke error ko thik karne ke liye so --> **** AB HMKO WO NEW STATE KI REQUIREMENT AYI SAMJHE
// -> **** AB HMKO WO NEW STATE KI REQUIREMENT AYI SAMJHE TOH AB APAN NEW STATE CREATE KARENGE FOR PARTICULAR STEP AND USME SARA DATA STORE KAR DENGE AND USKE BAAD US STEP KA KAAM COMPLETE KARNE KE BAAD US STATE KO UPDATE KAR DENGE WITH NEW DATA AND IS TYPE SE HAR STEP PE NEW STATE CREATE HOGI AND HAR STEP PE DATA UPDATE HOGA AND APKO PATA CHAL JAYEGA KI KAHAN PE KAAM COMPLETE HO CHUKA HAI AUR KAHAN PE START KARNA HAI AUR APKA KAAM BHI EASY HO JAYEGA.
// -> **** SO YAHI REASON HAI MULTIPLE STATE/CHECKPOINTS CHAIYE APAN KO THIK HAI NA 

// -> CHECKPOINTS MEANS -> HISTORY OF STATES -> JITNE BHI STATES BANAYE HAIN USKA HISTORY RAKHNE KA KAAM CHECKPOINTS KARTA HAI AND USSE APKO PATA CHAL JAYEGA KI KAHAN PE KAAM COMPLETE HO CHUKA HAI AUR KAHAN PE START KARNA HAI AUR APKA KAAM BHI EASY HO JAYEGA.


