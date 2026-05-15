// NOW WE HAVE TO BUILD OUR SYSTEM :

// S1) DESIGNED THE DOCUMENT
// S2) PHASE WISE CODE LIKHO (IN 6-7 PHRASE) -> EACH PHRASE INDEPENDENT RAHE -> DO PARTICULAR ONE TEST AND ALL



// --> in langgraph --> node is a function take state and return a state and call function automatically --> having read state and have a return state too (i.e. checkpoints)
// state is an js object



// phrase1 ->

// start ----> p-m agent <------->  human agent
//               |
//               \/
//              end 





// ------------------ DOCKER ------------------

// -> CREATE A SANDBOX ENVIRONMENT FOR RUN CODE
// -> KYA HOTA HAI SOME CODE WORK IN MACBOOK BUT NOT WORK IN WINDOWS AND ALL -->
// -> CODE LIKH DIYE AND TESTER KO DIYE FOR TESTING AND CODE NOT WORK IN TESTER ENVIRONMENT --> 
// -> GTA COPY PASTE KARKE NI WORK KARTA [FORM 1 PC TO ANOTHER PC]


//   /////MACOS////               ////WINDOWS////             ////UBUNTU////
//   /////////////               ///////////////              /////////////


// -> MAI YE NI CHAHTA KI MAI SABKE LIYE ALAG ALAG CODE LIKHU <- BUILDING ANY SOFTWARE/APP
// -> **** SO AYSA APP/SOFTWARE BANANA HAI KI USPE KUCH BHI RUN HOJAYE --> EX: UNIVERSAL APP ----> SO KYA KARE 1-1 BAAR CODE SABKE LIYE LIKH DO FOR ALL OS


//   /////MACOS////               ////WINDOWS////             ////UBUNTU////
//    /////                          /////                        /////
//    /////                         /////                         /////
//   /////////////               ///////////////              /////////////



// -> UNIVERSAL APP ------>                      /////////////////////////////
//                                               ////    ////    ////    /////   
//                                               /////////////////////////////
// -> SO AB IS UNIVERSAL PE HM KOI SA BHI APP RUN KAR SHAKTE HAI [EX: PUBG,GTA,ETC]



// ----> **** DOCKER NE KYA KIYA [AYSE HI 1-1 BAAR DOCKER KA SABKE LIYE LIKH DIYA FOR ALL OS SO] ISKE ANDER HM KUCH BHI CODE LIKH SHAKTE HAI RUN KAR SHAKTE HAI AND SHARE KARTE HAI TOH WO ANOTHER ONE KE ME BHI CHALEGA


// --> WHY THIS ISSUE COMES ?
// -> LET INITIALLY WE WRITE NODEJS CODE IN WINDOWS SYSTEM AND SHARE WITH MACOS SYSTEM SO IT CANT WORKS --> REASONS: DUE TO VERSION ISSUES , OR OUR CODE DEPENDS ON OS TOO , 
// -> SO CODE CHALANE KE LIYE MACOS WALE KO WINDOWS SYSTEM CHAIYE 
// -> LET MACOS WALA WORK ON 2 PROJECTS 1 REQUIRE NODE22.2 AND 1 REQUIRE NODE24.4 SO AB YE KYA KARE
//  ----> SO CONCEPT OF VIRTUAL MACHINE AYA ----> 1 APPLICAION ISKE ANDER FULL OS INSTALL HOTA HAI AND BATA DO KI WINDOWS USE KARNA HAI AND ALL AND CODE DALDO AND DEPENDENCY SO CODE RUN KARDEGA YE AB
//     -> AND KITNE BHI VIRTUAL ENV BANA SHAKTE HAI PER -> DIKKAT HAI STORAGE 1 VIRTUAL ENV 8-10 GB KA HO SHAKTA HAI SO ISKO CHORO

// --> DOCKER NE KYA KIYA --> OUR SYSTEM IS LINUX BASED -> BUT VM IS LIGHTWEIGHT + LINUX BASED HOGI 


//              /////DOCKER/////  
//              //APPLICATION// -> SO APPLICATION KO JO CHAIYE WO OS LAKE DEGA APPLICATION KO 
//              //   OS      // 
//              // HARDWARE  // 


// --> SO DOCKER PE APAN MULTIPLE ENV CREATE KAR SHAKTE HAI SEPERATELY

// --> A) CONTAINER --> KISI PROCESS[EX: REACT] KO RUN KARNA TOH BOLEGAI CONTAINER RUN HOGYA
// --> B) IMAGE --> IMAGES KE ANDER INSTRUCTION LIKHI HOTI HAI -> WO CONTAINER KO DETA HAI AND PROCESS RUN HO JATI HAI  
//       (CODE+ENVIRONMENT)


// -> WHY WE USE DOCKER IN OUR PROJECT ?
// -> IT CREATE SEPERATE SYSTEM -> JO BHI CODE AI LIKH KE DEGA USKO DOCKER PE PASTE KARUNGA -> AND IS SANDBOX ENV PE RUN KARUNGA[PARTICULAR MEMORY/HARDWARE/RESOURCE PE] NA KI SYSTEM PE RUN KARUNGA 
// -> KI AGAR KOI DIKKAT AYI IN CODE IN THAT DOCKER SO APAN USKO HATA SHAKTE HAI AND AGAR POORE SYSTEM PE RUN KARAYE TOH DIKKAT HAI NA HALLOCINATION SE SYSTEM KA KUCH DELETE KAR DIYA TOH AND ALL SO --> WORK KARENGAI IN DOCKER
// -> SANDBOX ENV PE RESTRICTIONS HONGI --> KYUKI HMNE PEHLE SE HI DOCKER KO BATA DIYA HAI KI ITNA HI RESOURCES DENA HAI AND ALL TOH USKO OS UTHA NI RESOURCE AND ALL DEGA

// -> use direct docker or run cmd by terminal -> ex: -> docker run hello-world

// --> DISADV OF DOCKER --> LET 1 CONTAINER USPE SARA WORK HORA HAI THEN WORK HONE KE BAAD THEN SARE RESOURCES KO PRIMARAY AS WELL AS SEC MEMORY SE DELETE KAR DETA HAI
//                      --> DELETION WALA BYDEFAULT KARTA HAI AFTER COMPLETION OF WORK
//                      --> **** WE WANT KI SEC MEMORY SE DELETE NA KARE RESOURCES KO --> SO **** VOLUMES KA CONCEPT AYA --> SEC MEMORY PE RAHEGA RESOURCES BHALE PROCESS KILL HOGYI BUT USE KAR SHAKE APAN SEC MEMORY SE USKI RESOURCES KO



// --> **** in our project 1 container pe hi sabko ni dalna hai thik --> har chiz ko alag alag container pe rakhna hai --> so we can scale it 
// --> **** db , frontend , backend --> sab alag alag container pe rahe --> so how they talk to each other --> talk by api's calls normal 


// -----------------------------------------------------------------



// -------- ISSUES WHILE MAKING PROJECT WITH VIBE CODE --------

// -> DB SCHEMA : BATA DO KONSA NAMING CONVENTION WHOLE PROJECT PE SCHEMA BANANE KE LIYE USE KARNA HAI <- REMOVE THIS INCONSISTENCY 
// -> BATA DO IMPORT EXPORT USE KARNA HAI KI REQUIRE USE KARWANA HAI IN WHOLE PROJECT
// -> FUNCTION CONVENTION KA BHI EK NAMING BATA DO --> AND HAR FUNCTION KO CONTEXT PE PASS NI KARNA HAI --> AND FUNCTION KA NAAM AND RETURN BS CONTEXT PE DENA HAI THIK 



// --------------------------------------------------------------------- 


// --> **** in our project actual envirement create hota hai and code run hota in docker --> and baki sab mai toh llm answer predict karta hai per --> apne mai toh alag hi hai env create hoga and whole code run hoga 

