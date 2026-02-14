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



//         //////NODE///////
//        0// ROHIT       //  15 BYTES   
//        1// MOHAN       //  15 BYTES              
//        3// ..          //  15 BYTES               
//        4// ..          //  15 BYTES              
//        5// ..          //  15 BYTES              
//        6// ..          //  15 BYTES               
//        7// ..          //  15 BYTES               
//        8// ..          //  15 BYTES              
//        /////////////////                          
//                                                  
// --> **** THIS ARRAY METHOD FAILS DUE TO LESS SIZE 15 BYTES --> AND SUPPOSE 1020 LOCATION PE = 0:[1,2,3,6] STORE HAI 1040 PE = 1:[5,3,6,2] -----> SO AGAR NEW ELEMENT INSERT HONA HAI IN DONO MAI KISI MAI TOH NI KAR SHAKTE DUE TO ARRAY FIX SIZE SO THIS ------> FAILS        
// ----> **** IMAGE9 --> YE ARRAY WALI APPROACH BEKAR HAI ISME PHIR SE ADDRESS FIX KARDENAIGAI SO --> ISSUE CREATE KAREGA IN REPLICA WAGERA PE -----> SO USE YE UPER WALI METHOD THIK





// -> IMAGE8 -> NEW METHOD **** HERE EACH INDEX IF OF 34-34 BYTES --> INDEXING IS FROM 0 AND IF WE KNOW BASE ADDRESS THEN WE FIND ANY ONE THIK
// **** ----> KYA HOGA INME EX: [ROHIT--FRIEND-->MOHIT  , 2(INDEX)] -> EACH DIBBE PE HOGA KON KISKA DOST HAI AND --> INDEX HOGA NEXT DIBBE KA KI ISME USER KE ANOTHER FRIEND HAI SAMJHE EX: [ROHIT--FRIEND-->SOHAN  , NULL(INDEX)] AND NULL MEANS HOGYA AB ITNA HI HAI

// --> **** SO MAI SIRF INDEX STORE KARA RA HU --> AND RELATIONSHIP NIKALNA EASY HOGYA NA  


// ----> **** RELATIONSHIP STORE --> IMPLEMENT ****ARRAY HAI --> MECHANISM ********WORKS/LOOKS LIKE LINKEDLIST[DUE TO INDEX STORE OF NEXT ONE] -> IMAGE10
//  -> **** YAHA PE NODE BHI HOGA THIK SAME UPER WALI FUNCTIONS --> KI EACH INDEX OF NODE HAVE RELATIONSHIP THIK 

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

// --> ********* EK OR ARRAY HOGA FOR SAME USER KNOWN AS ------> PROPERTY[KEY:VALUE PAIR PE HOTI HAI] JISME PROPERTY HONGI OF THAT USER --> [NAME:ROHIT,INDEX:2] SO INDEX 2 PE KUCH OR PROPERTY HONGI [AGE:24,NULL] IS TYPE SE

// **** -> SUPPOSE NEW DATA INSERT KARNA HAI INSERT IN RELATOSHIP ARRAY EASILY --> BUT ORIGINAL CONNECTION  BANANA PADEGA NA --> SO USME 1-1 BOHOT TRAVERSE KARNA HOGA SO EFFECTIVE WAY KI KHALI LAST INDEX PE INSERT HUA HAI PER USKO ORIGINAL START PE HI POINT KARA DOAND BATA DO ROOT KO KI 1ST INDEX AB 70 HAI SEE IN IMAGE --> IN O(1) TIME --> IMAGE11 12
// --> MOTA MOTA KAHI BHI MEMORY DEDO AND INSERT IT IN START SO O(1) TC HOGI --> SEE IN LINKEDLIST LIKE DIAGRAM PE -> AND IF WE INSERT AT LAST SO O(N) TIME LAGTA SO START PE HI INSERT KAR DETE HAI THIK
// --> IMAGE13 -> RELATIONSHIP ALSO LOOKS LIKE LINKEDLIST BUT ACTUAL ARRAY USE HORA HAI

// ----> **** FOR EACH RELATIONSHIP THEIR IS PROPERTIES WALA ARRAY HOTA HAI --> STORE HOTA INFO KI WO DONO KAB CONNECT HUE DATE AND ALL



// --> **** LET KISI NE ACCOUNT DELETE KAR DIYA TOH INDEX KHALI HO JAYEGA --> SO INDEX KO KHALI REHNE DO --> SHIFT WAGERA NI KARNA THIK NA
// --> **** NOE4J MAINTAINS KI KONSA INDEX KHALI HAI AND JAB NEW DATA ATA HAI SO WO IS INDEX PE POINT KARA DETA HAI


// --> ***** IMAGE14 OR INDEPTH PE ---> FOR EACH RELATION SABKE AGE , DOB , TIME , DATE HONGAI --> SO YE HAR USER KE LIYE HONGAI --> AND KEY:VALUE PAIR PE HOTA HAI NA ---> SO OR OPTIMIZE KARNE KE LIYE EK ARRAY/TABLE BANAKE INDEX ALLOCATE KAR DETE HAI SO AB PURA NI LIKHEGAI NAME AGE --> INDEX LIKHEGAI --> SPACE OPTIMIZE HUI NA




// Q1 -> **** KUCH AYSA KI ROHIT TOH INKO FOLLOW KARTA HAI PER YE BHI PATA LAGE KI SOHAN/.... KO KON KON FOLLOW KARTA HAI YE INFO KAISE PATA LAGEGA ?
// -> **** STORE THIS INFO TOO IN RELATIONSHIP BUT HOW ?

// -> **** OR OPTIMIZE KAR DIYE KI **** NODE PE 2 CHIZE HONGI FIRST POINTER RELATIOSHIP AND SECOND POINTER RELATIONSHIP -> FIRST RELATIONSHIP NICHE DIAGRAM WALA AND SECOND RELATIONSIP PE STORE KAREGA --> KI ISKO KON KON FOLLOW KARTA HAI -> IMAGE15
// -> **** HAR EK USER KE LIYE 2ND RELATIONSHIP HOGA JISPE HOGA KON KON FOLLOW KARTA HAI THIK


//         //////NODE///////
//        0// ROHIT       //  15 BYTES------------------------------------------>  //REATIONSHIP2//
//        1// MOHAN       //  15 BYTES                POINTER2                     // SOHAN  // 
//        3// ..          //  15 BYTES--------------                               // MOHAN  // 
//        4// ..          //  15 BYTES              |                              // .....  // 
//        5// ..          //  15 BYTES              |                              ////////////
//        6// ..          //  15 BYTES              | 
//        7// ..          //  15 BYTES              | POINTER1
//        8// ..          //  15 BYTES              |
//        /////////////////                         | 
//                                                  |
//                                                  \/
//                                          //////////RELATIONSIO1/////                            ///////PROPERTY/////         
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


// --> **** 15 BYTES WALE PE 2 RELATIOSHIP PRESENT HOTA HAI SAMJHE



// --> **** NEO4J NOT USES HASHMAP --> DUE TO SIZE AND ALL
// --> **** FOR RANGE QUERIES NEO4J USES B+ TREES [HANDLES EFFICIENTLY IN BEST TIME COMPLEXITY]

// -------------------------------------------- PART-2 --------------------------------------------------------


// REVISION 

