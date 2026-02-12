// RAG'S --> 

// -> 1) IMAGE1 -> WHAT DATA IS ACTUALLY STORE IN VECTOR DB ?
// -> METADATA + VECTOR STORE IN VECTOR DB

// ->  ///////VECTOR DB///////
//     // __,__,__,__,__,__ // <- VECTOR + METADATA + ID
//     // __,__,__,__,__,__ // <- [0.1,0.8,4.6,3.8] + "MY NAME IS ANIKET" + 101
//     // __,__,__,__,__,__ // <- [0.4,3.5,8.6,3.6] + "HELLO HOW ARE YOU" + 102
//     // __,__,__,__,__,__ // 
//     // __,__,__,__,__,__ //
//     // __,__,__,__,__,__ //
//     // __,__,__,__,__,__ //
//     // __,__,__,__,__,__ //
//     // __,__,__,__,__,__ //
//     // __,__,__,__,__,__ //
//     ///////////////////////

// S1) FIRSTLY CONVERT DATA INTO VECTOR EX: ->

//                                      "MY NAME IS ANIKET"   ------>   [0.1,0.8,4.6,3.8] 
//                                                      DATA CONVERT INTO VECTOR


// S2) METADATA["MY NAME IS ANIKET"] ALSO STORE IN VECTOR DB --> BECAUSE PATA CHALE KI DATA KIS CHIZ KA HAI


// S3) STORE PRODUCT_ID WITH IT --> IN VECTOR DB
//                       -> AS WE DO SEMENTIC SEARCH IN VECTOR DB NOT DO EXACT SEARCH IN VECTOR DB
//                       -> SEMENTIC SEARCH MEANS -> I GIVE VECTOR SO ISE MILTE JULTE MEKO OR VECTOR DEDO ----> EX: WEB DEV SEARCH KARE TOH SAB LAKE DE DEGA HTML CSS JS AND ALL
// -> UPDATE KARNA HO YA DELETE KARNA HO YA EXACT SEARCH KARNA HO IN VECTOR DB TOH -> WITH THE HELP OF ID -> YE SAB OPERATION KAR SHAKTE HAI --> SO MAINTAIN HASHTABLE TOO FOR EXACT SEARCH IN VECTOR DB
//                                                                                                                                                       //////HASHTABLE//////
//                                                                                                                                                       // ID // LOCATION  //              
//
//
//
//                                                                                                                                                        ////////////////////                                 



// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 2) RAG --> RETRIEVAL AUGMENTED GENERATION


// -> WE GIVE CONTEXT TO LLM HAR BAAR --> KYUKI LLM HAMARE HISTORY SE SAMJHE AND REPLY KARE JAISE MEKO JARURAT HAI 

// -> BUT **** CONTEXT[HISTORY] PASS KARE HAR BAAR LLM KO TOH --> TOKEN JYADA LAGTA HAI --> AND APAN LUUT JAYENGAI ----> **** THIS IS BEKAR SYSTEM

// -> IF WE ASK ANY QUESTION WITH CHATGPT_LLM --> SO IT NOT TELL KISI PARTICULAR CHIZ KA SPECIFIC ANSWER [ROHTI NEGI KA INCOME] ----> SO WE HAVE TO SEND CONTEXT[ROHIT SE RELATED] WITH CHATGPT_LLM SO IT WILL TELL CORRECT ANSWER AB ----> BUT THE WAY WE PROVIDE CONTEXT IS BEKAR --> JYADA TOKEN LAGTE HAI

// -> ///////REPORT////////                              //////LLM///////
//    // 1) DETAILS      //                              //            //
//    // 2) REVENUE      //     ---------------->        //            //
//    // 3) COURSE       //                              //            //
//    // 4) .....        //                              //            //
//    //    .....        //                              //            //
//    /////////////////////                              ////////////////
//       120 PAGES REPORT

// ----> **** KYA HO KI PURI REPORT SHARE NA HO CONTEXT PE JISKE BARE PE PUCHA HAI WAHI INDIVIDUAL BS SHARE HO --> SO LESS TOKEN LAGENGAI
//    -> KI CONTEXT SE ONLY WAHI UTHAO JISKI JARURAT HAI AND GIVE IT TO LLM NOT WHOLE CONTEXT ----> AND LLM GIVE US ANSWER ----> AND TOKEN BHI LESS USE HOGA AB


// ********************* VECTOR DB KI JARURAT LAGRI HAI ****************************


// --> **** SO APAN KO FIRST REPORT KO VECTOR DB PE STORE KARKE HOGA --> SO ISLE LIYE FIRST

//  -> BREAK WHOLE REPORT IN -------> CHUNKS [VECTOR] (CHOTE CHOTE VECTOR BANA DIYE) 
//  -> THEN STORE ALL CHUNKS OR VECTOR IN VECTOR DB

//  -> **** AGAR 1 HI VECTOR BANEYE HOTE BS SO BAR BAR WAHI ATA 1 BADA VECTOR --> SO KOI MATLAB NI PURA CONTEXT SHARE HOGA AND TOKEN JYADA LAGENGAI  
// ----> ****** SO APAN INKO SMALL SMALL VECTOR PE CHUNKS PE DIVIDE KARE HAI --> KI QUESTION KE HISAB SE CONTEXT [MINI VECTOR] SEND HO PURA CONTEXT NI JAYE ----> SO TOKENS LESS USE HO

// --> PROCESS : USER ASK QUESTION --> CONVERT INTO VECTOR --> AND FIND RELATED VECTORS IN VECTOR DB AND TOP 10 NIKAL DO --> SO GIVE TOP 10 VECTOR + METADATA IN RESULT  
//                                 --> MINI CONTEXT SHARE KARE NOT WHOLE CONTEXT SO --> **** TOKEN BHI BACH GAYE                                



// -------------TECHNICAL TALK-------------


// A)

//  ////////////////////////////////INDEXING PHASE///////////////////////////////// 
//
//     ///PDF///  CHUNK   //CHUNK1//  EMBEDDING   //VECTOR1//       //VECTOR DB//
//     ////////  -------> //CHUNK2// -----------> //VECTOR2// ----> //         // <- ISME SABKO STORE KARDO
//     ////////           //......//              //.......//       ////////////
//
//  ///////////////////////////////////////////////////////////////////////////////



// B)

//  ////////////////////////////////QUERY PHASE/////////////////////////////////////// 
//
//                      [S2]
//  QUERY(S1)///////  -------> ///EMBEDDING//
//  -------->///////  <------- /////////////      
//  <--------///////   S3(VECTOR1)                                   /////LLM//////      
// OUTPUT(S8)///////                 [S6] [S7]                       //////////////
//           /////// <------------------------------------------>    //////////////
//           ///////                                                 //////////////     
//           ///////  ----(VECTOR1) [S4]-->  //VECTORDB//
//           ///////  <----(TOP10) [S5]----  ////////////
//
// //////////////////////////////////////////////////////////////////////////////////////


//                           RETRIEVAL AUGMENTED GENERATION




// --> EMBEDDING -> VECTOR PE CONVERT KARTA HAI
//  -> APAN QUERY/QUESTION DIYE ["WHAT IS UPSC"] --> CONVERT IT INTO VECTOR/CHUNKS [BY EMBEDDING] --> AND SEND IT TO VECTOR DB SO WO APAN KO TOP10 RESULT MILA --> AND SEND QUERY + TOP10 TO LLM --> AND LLM ANALYSE IT AND GIVE RESULT 


// ----> **** RETRIEVAL AUGMENTED GENERATION --> A) RETRIEVAL -> VECTOR DB SE RETRIVE INFO JO IMP HAI
//                                               B) AUGMENTED -> SEND THAT INFO TO LLM   
//                                               C) GENERATION -> LLM GENERATE ANSWER




// --------------------------------------------------------------------------------------------------------------------------------------------

// ----> RAG BANANA KYU HAI ?  -> [CURRENT INFO KO LLM KO DETA HAI]

// **** -> IN A COMPANY 1-10 LAKH DOCUMENT HAI --> THIK AND APAN KO KUCH ISSUE HUA THIK --> TOH MAI KYA KARU
// -> BIG BIG COMPANIES DATA KO CHUNKS PE DIVIDE KARKE VECTOR PE STORE KARA DETI HAI --> PAISA HAI COMPANY KE PASS BHAIYA
// -> SO IF WE HAVE DOUBT --> SO SEARCH DOCUMENTATION FROM VECTOR DB AND GIVE IT TO LLM --> LLM GIVES ANSWER


// EX: COURT CASES --> BOHOT SARE RULES HAI/OLD CASES SO BREAK RULES IN SMALL CHUNKS/VECTOR AND STORE IT IN VECTOR DB ----> SO IF WE HAVE ANY ISSUE SO SEARCH RULES/OLD CASE FROM VECTOR DB AND GIVE IT TO LLM AND LLM GIVES ANSWER




// --------------------------------------------------------------------------

// -> 3) ALTERNATIVE APPROACH THAN RAG I.E. ----> FINE TUNE

// --> ALREADY EXISTING MODEL KO TRAIN KARNE LAG JAO --> KI AJ TK KE YE COURT CASES HAI YAAD KARLE 
//  -> BUT **** MODEL TRAINING PE BOHOT SARE COST LAGTA HAI -> AND DAILY NEW COURT CASES ATE HAI SO UNKO BHI REGULAR UPDATE KARO AAND AGAIN TRAIN KARO SO TOO MUCH COST LAGEGI NOT EFFECTIVE

// --------------------------------------------------------------------------



// ---------- => RAG IS USING BOHOT BHARI AMOUNT PE [RAG KA WORK CONTEXT PROVIDE KARNA BY VECTOR DB IN EFFECTIVE WAY] ----------

// -> VECTORDB IS SAFE -> BECAUSE WE OWN
// -> BUT LLM KO APAN REPORT DIYE AND WO BACK PE BAHI OR BHEJ RA HAI TOH NI PTA --> YE SAFE NI HAI
// -> TOH BIG BIG COMPANIES SELF HOST LLM'S ON OWN SERVER [COSTLY] -> SO SAFE HAI AB DATA BAHAR NI JAYEGA

// -> **** IF WE TRAIN MODEL BY OUR COMPANY DATA SO --> WE CANT REQUIRE VECTOR DB


// ---------------------------------------------------------------------------------------------------------------------------


// 3) LANGCHAIN ->


// BUILD RAG SYSTEM 

// s1) load pdf --> code
// s2) chunking --> code
// s3) 1 lakh chunk -> 1 lakh vector [find chunks ke vector]
// s4) vector db pe store karne ka code
// ----> BOHOT SARA CODE LIKHNA PADEGA YR


// --> IMAGE2 --> **** LANGCHAIN --> PROVIDE UTILITY FUNCTIONS [BUILDIN FUNCTIONS PROVIDE] -> FOR THIS UPER KA WORK DO IN SMALL LINE OF CODE ------------------

// --> USING PINECONE VECTOR BASE --> BECAUSE IT IS FREE -> CREATE ACCOUNT -> CREATE INDEX AND NAMED IT [EX:NODEJS] -> DO CUSTOMSETTING -> VECTORTYPE=DENSE , DIMENSION=768 , METRIC=COSINE , CLOUD=AWS --> CREATE IT
//  -> AWS:SERVER FREE PE MILGYA AND PINECONE VECTORDATA KO STORE KARKE RAKHEGA IN VECTORDB[PINECONE MANAGE VECORTDB] AT AWS SERVER FREELY


// -> INSTALL LANGCHAIN --> npm i @langchain/core@latest
// -> INSTALL MORE THINGS FROM PDF -> npm i @langchain/pinecone @pinecone-database/pinecone @langchain/community @langchain/google-genai @langchain/textsplitters dotenv pdf-parse readline-sync


