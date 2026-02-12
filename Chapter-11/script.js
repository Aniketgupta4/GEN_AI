// HNSW ALGORITHM --> image1


// -> SOLUTIONS OF LAST CLASS --> KI WHY WE CHOOSE HNSW ? -------> THESE ARE THE PROBLEM ARISES IF ONLY 1 LAYER IS THERE ---->


// --> suppose sirf 1 hi layer bs hai -> see image2 --> so agar new data point aya and new data se related top 10 closest data point choose karna hai so sabko traverse karna hoga -> let 1 billion data points hai so 1 billion search karna hoga --> 0(n) time lagega answer milega but tc worst hogi --> worst time complexity

// --> Another approach -> 2 list banao --> list1 = _________  and list2 = __________ => list1 pe data point ayega then find distance from self single element so self element hi closest hai so 2ndlist pe daldo => then list1 pe data1 ke closest element daldo then calculate pass wale elements and unko list2 pe daldo and list1 pe data element ke neighours dalte jao ----> but top start 10 result agye but abhi bhi elements bache hai so --> ye final answer ni hue ----> NOT WORK PROPERLY

// --> ANOTHER APPROACH --> image3 ->  MIN HEAP = LIST1 & MAX HEAP = LIST2 --> new element aya thik --> so graph se 1 by 1 element select karo min heap pe dalo calculate distance and max heap pe daldo --> then min heap pe closest element data1 ke daldo arrange it a/c to min heap calculate distance and less distence wale ko push in max heap and min heap pe data point ke neighbours ko daldo --> and so on --> so list2 pe top 10 elements aa chuke hai --> so we have to stop our list or not and declare it final result ? --> **** aysa ho shakta hai ki list2 pe top 10 element hai thik -> and list1 pe data point ke neighbour aye 110 and 102 and [new data point tha [10,2]] that is close to 110 so max heap se element ko remove karna hoga na --> so tab kak karna hai process ko ki max heap se distance less ho min heap ke element se -> image4
//                                 -> isme bhi issue hai ki top 10 pehle mil gaye and we stop --> but aage ke chut gaye traverse karne ke liye and wahi top 10 result thay -> see image5 graph itna chut gya jaha main top result thay
//                                 -> hmko isme stopage condition bhi decide karna hoga in max heap ki sirf 10 element bs ayegai jyada na ayengai
//                                 -> compare 1st element ko min heap with 1st element of max heap --> agar max heap 1st element value less and min heap 1st element value jayda so --> stop the kardo and half bach jayega graph to traverse --> or may be original top 10 answer left to find --> and solution fail



// --> **** BASCIALLY ITNI SARI PROBLEMS HAI ----> KI SIRF 1 PLACE SE FIND KARE AND 10 BEST RESULT MILGAYE AND BAKI PART CHOOT GYA ---> SO ISI LIYE HNSW IS BEST ----> CREATE HIERARCHY KI RANDOM DATA POINTS LETE HAI AND NEXT LAYER PE LE JATE HAI SO SAB SAHI REHTA HAI  

// --> ADV OF HNSW ---->
//  -> COSINE DISTANCE CALCULATE [TEND TO 1 IS BEST] B/W NEIGHBOUR CHOOST PASS WALA [BEST SIMILARTY] AND AND ISKO LEKE MOVE TO NEXT LAYER AND FIND COSINE DISTANCE WITH ITS NEIGHBOUR AND PASS DISTANCE [HIGH SIMILARITY EX-> 0.8 0.9 SO CHOOSE 0.9 COSINE 1 KI TARAF WALA IS BEST] CHOOSE IT AND MOVE TO NEXT LAYER AND GET BEST SOLUTION [SIMILAR WALA] --> SO KI LESS COMPARSION HOGA IN START AND JAISE NICHE JAOGE DATA POINTS INCREASE HONGAI AND STABLE HOTA JEYEGA [BEST SIMILAR ONE MILEGA]            
//  -> **** AT 0 LAYER WE FIND TOP N RESULTS : -> AND ACURACY HIGH CHAIYE TOH N SE JYADA FIND KARO ACCHE RESULT AND ---> INME SE TOP N SIMILAR RESULT SELECT KARLO 
//  -> INSERTION DELETION WAGERA PERFORM HO SHAKTA HAI -> DYNAMIC WORKS


// --> DISADV OF HNSW -->
// --> TAKE JAYDA SPACE/MEMORY


// ----> CREATION OF LAYERED HNSW DIAGRAM : 
// -> LET 1 DATA ELEMENT AYA -> SELECT KITNE LAYER TAK JAYEGA YE DATA POINT [RANDOMLY]
// -> NEW DATA POINT COME SO -> SAME DECIDE KONSE LAYER TAB JAYEGA YE DATA POINT
// -> FROM TOP OF DIAGRAM SE DECIDE RANDOMLY KI KONSI LAYER TK JAYEGA AND JOIN KARTE JAO DATA POINT KO PASS WALE NEIGHBOURS SE
// -> BUT YE BHI DEKHTE REHNA KI IS PARTICULAR LAYER PE IS DATA POINT KE PASS HAI ELEMENT SO ISE HI NICHE WALI LAYER PE JAYEGA
// -> AND ATLAST CONNECTION BAN JAYEGA 
// -> TOP TO DOWN APPROACH INSERTION AND -> LOG(N) TIME PE WORKS
// -> TIME LESS LAGEGA PER SPACE THODA SA JYADA LAG SHAKTA HAI

// --------------------------------------------------------------------- 


// ----> QUESTION -> KISI NE MILK SEARCH KARA --> SO RESULT LAAKE DE DIYA 20 MILK PRODUCTS [SIMILARITY SEARCH] --> SO AS I ADD MILK IN CART --> SO IT WILL SUGGEST --> BREAD , BUTTER , GHEE AND 17 MORE PRODUCTS SUGGESTS [SUGGESTION]
//                -> HOW THIS WORKS --> 2 SUGGESTIONS KAISE DERA HAI 1ST 20 TYPES OF MILK THEN AFTER ADD MILK IN CART --> SUGGEST 20 OTHER PRODUCTS --> SO YE 1 HI VECTOR DB PE SE DEKHKE BATARA HAI KI KYA ?
//                -> HOW THEY SUGGEST 2 DIFF THINGS --> SOLVE THIS IN CONTEXT OF VECTOR DB ?

// ----> SOLUTION ----> 
//                 -> IN SIMILARITY SEARCH --> DIFF COMPANY MILK IS SIMILAR TO NORMAL MILK --> RATHER THAN BREAD AND ALL
//                 -> SO WHEN MODEL TRAIN -> SO WHEN VECTOR DESIGN TOH RELATIONSHIP BUILD ON THE BASIC OF USER BEHAVIOUR --> KI USER NE KYA KYA SATH PE PURCHASE KARA
//                 -> AND YE SUGGESTION WALE -> GRAPH BASED BANTE HAI  
//                 
//      -> **** USE IF ELSE KI WHEN USER SEARCH SO SHOW TOP 20 REULTS AND WHEN USER ADD PRODUCT IN CART SO TOP 500 KO UTHAO BY HSNW AND FILTER OUT KARO AB IN 500 DATA REMOVE MILK FIRST THEN ****SUGGEST --> UNIQUE 10 - 20 PRODUCTS [KYA HOGA TOP 500 PE BREAD HAI TOH 20-30 TYPE KI BREAD HOGI SO SIRF 1 SO KARO IS TYPE SE]

//      -> ******** REAL TIME PE SEARCH NI KARTE HAI ITNA YAAD RAKHO --> **** PRE COMPUTED DB[REDIS] PE SAVE REHTE HAI PEHLE SEHI --> KI USER ADD THIS IN CART SO SUGGEST THIS TOP 10 PRODUCTS ----> **** AND USER KI ACTIVITY DEKHTE HAI AND UPDATES KARTE REHTE HAI IN LIST IN DB SAMJHE



// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// APPROACH 4 --> IMAGE6 --> THE COMPRESSION METHOD (PRODUCT QUANTIZATION -> PQ) :

// -> **** A SINGLE VECTOR USING 1526 DIMENSIONS OF 32-BIT FLOATING-POINT NUMBERS TAKES UP 1526*4 BYTES = 6144 BYTES AND IF YOU HAVE A BILLION VECTORS THATS 6.1 TERABYTES OF RAM THATS INCREDIBLY EXPENSIVE
// 1VECTOR = [0.2,0.4,...........1526 VECTOR]
//             |
//             \/
//           4 BYTES 
// SO TOTAL = 1526 * 4 = 6144 BYTES ~ 6.1TB [THIS IS EXPENSIVE]
// AND YE 6.1TB DATA STORE IN SECONDARY STORAGE AND THODA THODA KARKE RAM PE LEKE AAO
// SO THIS IS NOT SCALABLE SYSTEM 


// ---------------------------------------------------------

// -> IN REAL LIFE SAME PROBLEM --> SO WE COMPRESS DATA --> BUT IN COMPRESSION SOME ISSUES ---> QUALITY REDUCES [BECAUSE DIMENSION REDUCE HO JATE HAI OF DATA] 
// EXAMPLE WITH PHOTO --> 
//                        PHOTOS IS IN DIMENSIONS -> _ _ _ _ _ ....
                                              
//                                              LET 3 BYTES TAKES                        256 COLORS
//                                            RGB : [__,__,__]         --------->        0 -> __
//                                                    |                                  1 -> __
//                                                  0-255 ....                           2 -> __
//                                                                                       3 -> __
//                                                                                       4 -> __
//                                                                                       ........

// ----> **** SO KYA HOTA HAI KI ORIGINAL IMAGE KE RGB VALUE KO DEKHTA HAI AND 256 COLOR PE SE SIMILAR LESS QULAITY KA CHOOSE KARTA HAI AND SHOW MILTA JULTA COLOR SO QUALITY REDUCES
//    -> EX -> [234,222,214]    ------------------>   [__,__,__]
//         (3 BYTES MEMORY TAKES)    REDUCE TO      (1 BYTES MEMORY TAKES)


// --> SO QUALITY REDUCE HO JATI HAI IN COMPRESSION AND SIZE ALSO REDUCES OF IMAGE 

// ---------------------------------------------------------



// ----------------> IMAGE7 -> COMPRESSION <-------------------

// -> FIRSTLY VECTOR IS BIG --> SO BREAK IT INTO FEW CHUNKS
// -> THEN COMPRESS IT -> GIVE EACH CHUNK A VALUE -> [10] , [20] , [30] , [5] --> SO PEHLE YE 64 BYTES LERA THA PER AB --> SIRF 4 BYTES LERA HAI AFTER COMPRESSION 

// -> **** IMAGE10 -> [10] , [20] , [30] , [5] KAISE AYE --> SUPPOSE 1 MILLION VECTOR HAI --> SO IN 1 MILLION VECTORS --> SELECT FIRST CHUNK OF VECTORS I.E. ([0.2,1.9,..],[0.2,1.9,..],....) 
//                 -> THEN CHOOSE CENTROIDS LET 256 CENTROIDS FIND AND HAVING THEIR VALUES THIK --> AND COMPARE KI [0.2,1.9,...] YE WALA KIS CENTROID KE SABSE PASS HAI SO SABSE PASS WALE KO ASSIGN KAR DIYE IN V_CHUNK1 AND SO ON --> I.E. --> [10] , [20] , [30] , [5]

// -> AND JO FIRST CHUNK HAI NA INKO APAN --> CODEBOOK1 KEHTE HAI 
// -> SECOND CHUNK WALO KO --> CODEBOOK2 KEHTE HAI  

 
// ---------> **** IMAGE9 -> SO PEHLE SIZE 64 BYTE THA AND AFTER COMPRESSION -------> 4 BYTE SIZE HOGYA





// ===============> IMAGE10 -> SEARCH FOR A QUERY -->

// -> DATA KO AGAIN CHUNK PE CONVERT KARO AND SEARCH KARO --> IMAGE11

// **** -> AS COMPRESSED HAI TOH YE HAME BETTER RESULT LAKE NI DEGA



// --> **** DISADV OF COMPRESSION -->
// -> RESULT QUALITY REDUCES --> 10 MAI SAB 4-5 HI SAHI MATCHING MILENGAI 



// ------------------------------------------------------------------------------------------------------------------------------------------



// -> APPROACH -> ********* SO KUCH ACCHA METHOD LAATE HAI S0 COMBINE BOTH --> INVERTED FILE INDEX + COMPRESSION 

// -> CLUSTER NORMAL METHOD SE CREATED HOGA --> QUERY AYI SO DEKHO KONSE CLUSTER KO BELONG KARTI HAI 
// -> **** MAIN CHIZ --> CLUSTER PE JO DATA HAI NA APAN INKO ****COMPRESSED FROM PE STORE KARKE RAKHTE HAI
// -> **** SO IF WE CALCULATE DISTANCE TOH APAN KO BOHOT ****LESS TIME LAGEGA 







