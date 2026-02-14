// ------------- GRAPHDB-INTERNAL -------------

// -> **** PREVIOUS CLASS --> IMAGE1 -> WHY NOT USE POINTERS/FIXED-ADDRESS ?


// ------------------------------------------------------------------------------------------



// --> 1) ------------- DESIGN GRAPH DATABASE -------------- 


// -> JAISE AARAY HAI IS IN CONTIGUOUS MEMORY LOCATION PE WAISE HI --> GRAPH DB KI APPROACH DEKHTE HAI THIK

// -> SUPPPOSE AARAY HAI SO -> DATA IS STORE 1 BY 1 IN CONTIGUOS MEMORY LOCATION --> KEHTE HAI KI SAME USE DO IN GRAPH DB



// -> LET 5 USERS HAI : [EACH USER IS A : NODE]

// ROHIT,
// MOHIT,
// SOHAN,
// AVINASH,
// TULSI


// FRIENDSHIP : [RELATIONSHIP -> REPRESENT IN THE FROM LINKEDLIST -> IMAGE2] [** LINKS KISI BHI ADDRESS PE PRESENT **NI HO SHAKTE -> ASSUMPTION]

// -> ROHIT --> MOHIT
// -> MOHIT --> SOHAN
// -> SOHAN --> TULSI
// -> SOHAN --> ROHIT 
// .......


// --> **** SUPPOSE --> NAMAN FRIEND ----->  ////ROHAN,SOHAN,AMAN////
//                      AMAN FRIEND  ----->  ////SOHAN,GOLU,MOLU////
//                      ANJALI FRIEND ---->  ////ROHIT,MOHIT,NEHA////


// --> PROBLEM --> **** DATA KO AS A ADDRESS STORE KARKE NI RAKH SHAKTE --> SAME DATA KISI OR DB PE PRESENT HOGA UNKA ADDRESS ALAG HOGA -> IMAGE3

// ----> ******** IS TYPE KI INFO KO MAI KAISE STORE KARKE RAKHUGA  


// --> SUPPOSE --> IMAGE4 -> A ARRAY AND WE KNOW ADDRESS OF ONLY 1ST LOCATION OF ARRAY ELEMENT [I.E.-> 1000] --> AND 1 ELEMENT[NODE BOL DIYE THIK] TAKES 15 BYTES SO 15-15 KE GAP PE SAB HONGAI THIK 

// --> **** SO FORMULA --> BASE ADDRESS + (INDEX * 15)


// ********** IF BASE ADDRESS KNOWN HAI SO KISI KA ADDRESS FIND KAR SHAKTA HU


// ----> **** IMAGE5 --> ONLY NODE[ARRAY ELEMENT] INFORMATION STORE IN DB --> 
// -> SO AGAR DB1 KE ANDER KOI DATA PRESENT HAI IN ANY LOCATION ---> AND WE COPY PASTE IN ANOTHER DB2 SO WE ONLY NOTE ADDRESS KI KAHA SE STORE KARNA SURU KARRAY HAI 


// --> **** SO BY EXAMPLE --> NAMAN AMAN ANJALI --> ALL ARE PRESENT IN CONTIGUOUS MEMORY LOCATION --> AND WE FIND KISI KO BHI EVEN WO KISI DB PE PRESENT HO       

// ******** IMAGE5 -> MOTA MOTA HAI KI EK ARRAY PE 4-5 DOSTO INFO STORE HOGI --> COPY IT IN ANY ANOTHER DB SAB SATH 1 HI ARRAY PE HONGAI --> SO AGAR MEKO 1ST NODE OF ARRAY KA ADDRESS PATA HAI TOH MAI KISI ELEMENT/NODE KO FIND KAR SHAKTA HU EASILY --> BHALE WO KISI BHI DB PE HO BS MEKO US ARRAY KA BASE ADDRESS PTA HONE CHAIYE



// --> **** ARRAY IS USED KYUKI --> ARRAY STORES ELEMENT IN CONTIGUOS MEMORY LOCATION --> AND HMKO 0TH INDEX KA LOCATION PATA HAI TOH WE CALCULATE ANY INDEX ON ARRAY --> BHALE WO KISI BHI DB PE HO




// ------------------------------------------------------------------------------------------------------------------------------------------------------------


// 2) NEO4J :

// -> NODE SIZE IS OF --> 15 BYTES() --> FIXED SIZE

// -> IMAGE6[ARRAY] -> 0TH INDEX KA ADDRESS PATA HAI TOH MAI KISI BHI INDEX KA ADDRESS NIKAL SHAKTA HU ----> AGAR YE PURA KISI OR DB PE COPY HOGA TOH SIRF MEKO 0TH INDEX KA ADDRESS NOTE KARNA HAI BAKI MAI NIKAL LUNGA

// -> ******** SIRF INDEX STORE KARANA HAI BAKI ADDRESS MAI KHUD CALCULATE KAR LUNGA -> AND BASE INDEX BS PATA HONA CHAIYE

// -> **** ARRAY WALA APPROACH ISI LIYE KARE KYUKI POINTER KA ISSUE NA HO [VALUE HARDCODE KARKE RAKHTE HAI IN POINTER APPROACH] --> KI 1 DB PE DUSHRA MEMORY LOCATION PE HAI 2ND DB PE DUSHRA MEMORY LOCATION PE HAI -> SABKA ADDRESS KAISE MILEGA AND ALL ISSUE HAI POINTER WALE APPROACH PE 



// --> IMAGE7 -> BASICALLY 15 BYTES PE USER KI INFO BS STORE RAKHNA HAI --> NA KI USKE FRIENDS KI INFO THIK  

// --> BUT USER KE FRIENDS KI BHI INFO TOH KAHI NA KAHI TOH RAKHNA HOGA NA BUT KAHA KAISE ?

// --> DEKHO USER NE JISKO FOLLOW KARA HAI CONNECTION HAI SAB KI INFO RAKHNI HOGI --> BUT SIZE SIRF 15 BYTES HAI --> TOH KAISE RAKHENGAI BATAO --> EX: USER KE 10000 FRIEND HAI TOH INKA USERNAME BS BHI NI STORE KARA NA IN 15 BYTES 10000 LOG KA SO KUCH ALAG HI SOLUTION HOGA -->



// --> ******** IN LAST CLASS LINKEDLIST WALA FAIL --> KYUKI REPLICA CREATE KARE TOH ADDRESS PE DIKKAT AARI THI SO --> **** LINKEDLIST KO DB PE STORE NI KAR SHAKTE -> SO ARRAY PE AYE --> THIK  

// -> **** AND ARRAY PE SIZE FIX HAI NODE KA 15 BYTES IN NEO4J --> SO AGAIN LINKEDLIST KO ARRAY PE CONVERT KARKE STORE IN DB --> IS TYPE KA KUCH CONCEPT


// -> IMAGE8 -> **** HERE EACH INDEX IF OF 34-34 BYTES --> INDEXING IS FROM 0 AND IF WE KNOW BASE ADDRESS THEN WE FIND ANY ONE THIK
// **** ----> KYA HOGA INME EX: [ROHIT--FRIEND-->MOHIT  , 2(INDEX)] -> EACH DIBBE PE HOGA KON KISKA DOST HAI AND --> INDEX HOGA NEXT DIBBE KA KI ISME USER KE ANOTHER FRIEND HAI SAMJHE EX: [ROHIT--FRIEND-->SOHAN  , NULL(INDEX)] AND NULL MEANS HOGYA AB ITNA HI HAI

// --> **** SO MAI SIRF INDEX STORE KARA RA HU --> AND RELATIONSHIP NIKALNA EASY HOGYA NA  


// **** CONCLUSION ----> KI 1 ARRAY HAI THIK EACH NODE IS OF 15 BYTES WE ONLY STORE NAME OF USER AND THODA SA 15 BYTES SE MEMORY BACHI TOH FRIENDSHIP KA PURA DATA STORE NI KAR SHAKTE THIK --> SO KYA KARE FOR EACH NODE 1-1 ARRAY BANWA DIYE AND ISME EACH NODE SIZE IS 34 BYTES AND HM IS ARRAY MAI SPECIFIC USER RELATED FRIENDSHIP KARENGAI -> AND ISKE HAR EK NODE PE [FRIENDSHIP , INDEX] HOGA AND INDEX NEXT NODE KA HOGA JAHA US USER KE ANOTHER FRIEND KA RELLATION HOGA SAMJHE   

//         //////NODE///////
//        0// ROHIT       //  15 BYTES   -----------
//        1// MOHAN       //  15 BYTES              |
//        3// ..          //  15 BYTES              | 
//        4// ..          //  15 BYTES              |
//        5// ..          //  15 BYTES              |
//        6// ..          //  15 BYTES              | 
//        7// ..          //  15 BYTES              | 
//        8// ..          //  15 BYTES              |
//        /////////////////                         | 
//                                                  |
//                                                  \/
//                                          ///////////////////////////                            ///////PROPERTY/////         
//                                         0// ROHIT -> SOHAN , 1    //  34 BYTES                0 // NAME:ROHIT , 2 //
//                                         1// ROHIT -> ARTI , 5     //  34 BYTES                1 //                //
//                                         2// ..                   //  34 BYTES                 2 // AGE:24 , NULL  //  
//                                         3// ..                   //  34 BYTES     ----->      3 //                 //        
//                                         4// ..                    //  34 BYTES                4 //                 //
//                                         5// ROHIT -> KOMAL , NULL //  34 BYTES                5 //                 //
//                                         6// ..                   //  34 BYTES                 6 //                 //
//                                         7// ..                   //  34 BYTES                 7 //                 //
//                                         //////////////////////////                              /////////////////////
//

// --> **** AYSE HI HAR EK USER KE LIYE BANEGA THIK 

// --> ********* EK OR ARRAY HOGA FOR SAME USER KNOWN AS ------> PROPERTY JISME PROPERTY HONGI OF THAT USER --> [NAME:ROHIT,INDEX:2] SO INDEX 2 PE KUCH OR PROPERTY HONGI [AGE:24,NULL] IS TYPE SE


// ----> **** IMAGE9 --> YE LINKEDLIST WALI APPROACH BEKAR HAI ISME PHIR SE ADDRESS FIX KARDENAIGAI SO --> ISSUE CREATE KAREGA IN REPLICA WAGERA PE -----> SO USE YE UPER WALI METHOD THIK

