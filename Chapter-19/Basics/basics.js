// image1 q1 --> sabse pehle apan user ka entity find karengai ki wo kya hai director,actor and all then pass it to graph db so wo pan ko answer dega and llm usko or acha karke answer dega
//        --> ye se bachna ki kabhi kabhi ayse mai llm halosinate kar dea hai khud hi answer de deta hai --> hamare pdf wagera se ni deta --> so ye sab ache se manage karo
//        --> and apan pehle vector db pe search ni karngai kyuki phir usme se hmko similar wale milengai then inme se pphir or ache se find karna hoga --> so bekar 
//        --> **** apan ko ache se system instruction likhn ahoga ki sabse pehle eneity find karna hai then graph db pe search karna hai agar koi is type se question puche toh graph db otherwise vectordb


// image2 q2 --> egde cases socho ki nolan toh actor director dono ho shakta hai na --> so all entity find karo jisme nolan ho and --> give answer to llm and llm ache se answer dega phir  


// image3 q3 --> first find entity ki rohit hai kon rohit is actor and nolan is director --> so nodes wagera banengi and --> graphdb easily find relation 


// image4 q4 --> first vector db se top 50 utho then send it to graphdb [a/c to theme] search top 10 similar movies


// image5 q5 --> search in graphdb direct movies dekho jisme caprio work kiya ho --> but sabse pehle dekhna hoga caprio hai kya [entity]


// q6 --> **** who is nolan ? [but actual node in graph cristrophen nolan hai ya spelling galat likha user so kaise sahi answer milega]
//    --> **** vector db pe sare nodes store kara do and similarity search karlo names pe so correct name mil jayega --> then find who is nolen in graphdb 


// -------------------------------------

// code :

// 1st find ****entity then do another work : in runquery




// ------------------- EXTRA (--> RANDOMNESS)--------------------------------

// --> KI HOW ROHIT IS CONNECTED TO TRUMP
// --> ROHIT --> PARENT --> YOGI --> MODI --> TRUMP [**** REALWORLD SURVEY -> 5-6 BAAR PE KISI SE BHI MIL SHAKTA HAI RELATIONSHIP]
// --> IMAGE6 --> [NORMAL WITHOUT RANDOMNESS] [SIRF AGAL BAGAL WALE CONECTED HAI] PEOPLES ARE CONNECTED AND EACH ONE HAVE 2 RELATIONSHIP --> SO ISME POSSIBLE NI HAI KI 5-6 BAAR PE POHOCH JAYE JISE MILNA HAI
//            -->  IMAGE7 -> **** [RANDOMNESS] KOI KISI SE BHI CONNECTED HAI SO AB MAI 5-6 BAAR MAI KISI SE BHI MIL SHAKTA HU --> BY RANDOMNESS 


// --> **** IMAGE8 -> BY RANDOMNESS [KOI KISI SE BHI CONNECTED HAI] -> HM KAHI BHI KISI SE RELATE KAR SHAKTE HAI EACH ONE HAVE CHOICE [KOI BHI KISI SE BHI CONNECT HO SHAKTE HAI THAT IS RANDOMNESS] --> AND BY RANDOMNESS WE CAN REACH/CONNECTES WITH ANYONE IN 5-6 STEPS --> ****[IN GRAPHDB BY RANDOMNESS]

// --> **** HNSM ALGO PE BY RANDOMESS HI CORRECT ANSWER MILTA HAI --> BY SEND DATA POINT ONE LAYER INTO ANOTHER LAYER


// **** RANDOMNESS IN BIG-SCALE VALUE PRECISE KARTA HAI ----> EX: 10 BAAR COIN TOSS KARO SO 1/2 NI AYEGI BUT --> ISKO BIG SCALE PE KARE NA 1-2 LAKH BAAR TOH PROBABLITY 1/2 KE KARIB AYEGI SAMJHE 

// --> UNIVERSE GIVES US RANDOMNESS --> AND BY RANDOMNESS WE GET CORRECT ANSWERS TOO
// --> MOST ALGO IN ML RUNS BY RANDOMNESS
// --> RANDOMNESS NOT FIND PATTERNS --> IT IS STILL RANDOM
