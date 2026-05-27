// -------> DEEP LEARNING <-------

// -> NORMAL CODE WE LEARNT IN DSA -> FIBO SERIES , PRIME NO , ETC --> NORMAL WAY TO WRITE CODE --> BUILD LOGICS
// -> AND OUTPUT OF THESE ONE'S ARE ****DETERMINISTIC [O/P IS KNOWN/FIXED ALWAYS]

// -> INPUT ------> CODE -------> OUTPUT
// -> EACH TIME SAME O/P GENERATE [7 IS PRIME AND 9 IS NOT PRIME -> FIXED]


// ----> **** WHEREAS LLM'S GIVE'S NON-DETERMINISTIC O/P --> EACH TIME DIFF O/P WE GET --> AND LLM'S ARE BASED ON DEEP LEARNING




// --> MANY REAL LIFE PROBLEMS WO CAN'T BUILD SOLUTIONS -->

// /////////////////
// //             //
// //    A        //    --> INPUT IMAGE PE A LIKHA HAI --> SO O/P PE WO WORD DO --> WRITE CODE FOR THIS -->  
// //             //     -> NOT WRITE MANUAL CODE --> DO IT BY LIBRARIES OR APPLICATIONS OF DL WE DO THIS
// /////////////////
//      IMAGE

// --> OR TELL THE IMAGE IS OF DOG/CAT --> WRITE PROGRAM --> TOUGH TO DO --> CAN'T SOLVE 


// -> THINK LIKE HUMAN :-

// -> SMALL CHILD OF 4-5 YEARS HOW WE TELL IS IT CAT/DOG ?
// -> EITHER BY IMAGE OR BY TELLING --> BAAR BAAR BATAO/DIKHAO --> SO APAN USKO REALITY MANNE LAG JATE HAI --> SO CHILD SAMJH JATA HAI KI YAHI HAI YE CHIZ 
// -> CAN'T KNOW THE LOGIC IN MIND --> BUT WE TELL THE DIFF B/W DOG AND CAT AND ALL ----> BY RATTA FICATION 


// -> **** HM BACCHE/KUTTE KE SAMNE JAISE BOLTE HAI TOH BACCHA KHUD SE SIKH JATA HAI BUT DOG NI SIKH PATA --> HOW INTERNALLY WORKS DON'T KNOW -> KI CHILD SIKH JATA HAI SUNKE/DEKH KE BUT DOG NI SIKH PATA ?   
// -> PROOF HUMAN HAVE EMOTIONS -> DEFINE IT ? -> THEN IMPLEMENT IN M/C TOO --> SO HOW WE SAY THAT M/C DON'T HAVE EMOTION AND ALL SAY ? 

// --> **** NOT KNOW TILL NOW KI HOW OUR BRAIN WORKS ?
// --> NOT TELL GOD EXISTS OR NOT -> SCIENCE FAIL HERE --> ANYONE CAN'T DEFINE GOD EACH RELIGION DIFF DIFF GOD --> NOT SAY GOD IS GOOD OR BAD AND ALL --> SO HOW TO SAY GOD EXISTS OR NOT 


// --> ******** LOGICAL PROOF LE AYE TOH M/C REPLICATE KAR DEGI US CHIZ KO --> AND APAN PROOF LEKE NI PAYE THEN WE CAN'T SAY M/C CAN'T THINK


// --> **** CAN'T BUILD LOGICS SOMETIMES IN OUR END --> 


// --> **** SO WE HAVE TO TRAIN OUR MODEL --> BUT GIVING I/P AND O/P SO IT RETURN FUNCTION
// ->  INPUT -----> MODEL ------> OUTPUT
//                    |
//                    \/
//                 FUNCTION(X) [GENERATE AUTOMATICALLY]



// -> EX: 

// STUDY   |    MARKS
//   3           32
//   4           42 
//   5           52
//   6           62
//   7            ?   ---> 72 (PREDICT)

// -> ISKA CODE APAN KHUD LIKH SHAKTE HAI -> MARKS = STUDY * 10 + 2 



//  X           Y            Z
// STUDY  |   SLEEP   |    MARKS
//  3           2            21
//  4           5            35
//  5           8            49
//  8           2            46
//  6           6            48
//  7           3             ?      (PREDICT)

// --> FORMULA BANEGA --> MARKS = 5 * STUDY HOURS + 3 * SLEEP



// --> **** CAN WE GENERATE THIS FORMULA BY THESE INPUTS <--- YES BY LLM'S AND BY DEEP LEARNING
// --> BUT HOW ?
// --> LET GENERAL EQUATION --> W1*X + W2*Y + B
// --> WE FIND --> W1 W2 AND B [W-> WEIGHT , B-> BIAS]
// --> WHEREAS X AND Y ARE GIVEN INPUTS
// --> APAN KO ISME SE ISME JANA HAI --> [W1*X + W2*Y + B] -----------> [MARKS = 5 * STUDY HOURS + 3 * SLEEP]
// --> SINCE BY THIS FORMULA [W1*X + W2*Y + B] --> TAKE RANDOM VALUES OF W1 AND W2 AND B AND PUT IN FORMULA --> AND MATCH O/P WITH GIVEN DATA AND ****CHANGE VALUE A/C TO PREDICTED AND GIVEN DATA KI MATCH KARE O/P
// --> [CHANGE VALUE] --> THIS IS NORMAL HIT AND TRIAL METHOD USE KARNA HAI BS
// --> BUT AYSA NI KARNA HAI BHAI --> DIKKAT HOGI

// --> **** B/C REAL WORLD DATA HOTA HAI NA WO IDEAL DATA NI HOTA HAI KI MAI ACCURATE FORMULA BANA HI PAO --> IN REAL WORLD DATA TOO MUCH MISTAKES ARE THERE --> SO DHEERE DHEERE APAN ACTUAL VALUE TK POHOCH PATE HAI DIRECT NI POHOCH PATE HAI ACTUAL VALUE PE


// ----> **** FIND BEST VALUE WEIGHT AND BIAS IS DEEP LEARNING


// ----> 2 MODEL TRAIN WITH SAME DATA BUT PREDICT DIFF O/P WHY ?
// -> B/C THESE RANDOM VALUES OF W AND B WO DIFF LERA HOGA SO O/P DIFF AARA HAI SAMJHE 





// ------------------------ chapter - 28 -----------------------

// --> let take w1 = 15 w2 = 2 b = 1 --> W1*X + W2*Y + B
// SO EQN => 15*3 + 2*2 + 1 = 50 PREDICT BY MODEL  <--- BUT ACTUAL IS 21 -> DATA[3           2            21]
// SO ISKO APAN KO 21 LANA HAI PER 50 AARA HAI SO CHANGE VALUE OF W1 W2 AND B KI CORRECT FORMULA BANE AND CORRECT O/P MILE



// <-------------- THIS IS WRONG [] --------------->
// --> SO KYA KARO JO VALUE LIYE HAI APAN CHANGE IT --> let take w1 = 7.5 w2 = 1 b = 0.5 --> 
// --> SO AB WE GET 21 PREDICT O/P


// --> **** NOT DO THIS TYPE B/C --> IN REAL WORLD DATA PE NOISE ARE PRESENT --> NOISE MEANS DATA WRONG HO -> KUCH 0/NULL VALUES HO AND ALL SO DIRECT VALUES KO JUMP NI KARA SHAKTE HAI KI CORRECT ANSWER MIL JAYE DIRECT
 
//        ______________________________________>|                                      
//   ----|------------|--------------------------|------
//                     <_________________________|
//                  MORE CORRECT O/P          CORRECT O/P 

// --> ******** ISSUE YE HAI AGAR CORRECT O/P KE LIYE BHAG RA HAI TOH IN FUTURE --> WRONG O/P KE LIYE BHI TOH BHAG SHAKTA HAI NA
// --> **** PAGLO JAISE NA BHAGE THIK --> **** DHEERE DHEERE KARKE KARE JUMP --> SO PROFIT MILEGA HI KI --> **** JAB THODA SA CORRECT KI TARAF JAYEGA TOH THODA SA HI GALAT KE LIYE JAYEGA --> **** SO MAX DATA SAHI JAYEGA AND APAN CORRECT KI TARAF POHOCH JAYENGAI  
// --> **** 

//        ____________>                          |                                      
//   ----|------------|--------------------------|------
//                                               |
//                 CORRECT O/P               


// --> LOSS FUNCTION -> PREDICTION KARNA HAI 21 KI AND APAN PREDICT KARE 50 SO --> LOSS FUNCTION = 21-50=-29 KA DIFF HAI BICH PE --> SO APAN KO WEIGHT KE SATH KHELNA PADEGA
// --> 21 KE PASS POHOCHNE KE LIYE *W DEC KARO *B DEC KARO --> TAKE DECISION BY --> 
// --> BY MENTAL MODEL ---> W1_NEW = W1_OLD + 0.01*ERROR 
//                                   15 + (-0.29) = 14.71
// -> W2_NEW = 2+0.01*(-29) => 1.71
// -> B_NEW = 1 - 0.29 = 0.71


// -> SO NEW FORMULA --> 14.71X + 1.75Y + 0.75 <------ THODA BOHOT IMPROVE TOH HUA PEHLE SE [15X + 2Y + 1]


// --> SO AB MAI ISKO ->  14.71X + 1.75Y + 0.75 -> 2ND DATA KE SATH APPLY KARUNGA [4           5            35]
// --> 14.71*4 + 1.71*5 + 0.71 => 68.1  <--------- BUT ACTUAL IS 35 
// --> SO ERROR IS -> 35 - 68.1 = -33.09 (ASSUME IT 30)   ---> SO FURTHER WE HAVE TO DECREASE THE VALUE OF W1,W2,B
// --> SO AGAIN [BY PUTTING VALUES] FORMULA CHANGES AND BECOME

// --> 14.45X + 1.45Y + 0.45 <----- PEHLE SE OR THIK HUI AND AYSE HI KARTE REHNA HAI ......... JAB TAK BOHOT PASS NA AJAYE APAN CORRECT O/P KE 

// --> BHAI 3NO EQN PE APAN SAME USPE SE BADH RAY HAI --> SO HM KABHI DESIRED EQN/O/P PE NI POHOCH PAYENGAI AYSE 



// --> DIKKAT KYA HAI APAN W1 KO FALTU PE PUNISH KARRAY HAI --> W2 AND BIAS KO PUSH KARO ---> NEW TERM X,Y AYI

// --> W1_NEW = W1_OLD + 0.01 * ERROR * X
// --> W2_NEW = W2_OLD + 0.01 * ERROR * Y             <------- NEW CORRECTION FORMULA 
// --> B_NEW = B_OLD + 0.01 * ERROR

// --> THESE FORMULAS WORKS --> ACCURACY ACHI ATI HAI INSE --> TRUSTED HAI YE FORMULA

// --> AGAIN , let take w1 = 15 w2 = 2 b = 1 --> W1*X + W2*Y + B
// --> SO EQN => 15*3 + 2*2 + 1 = 50 PREDICT BY MODEL  <--- BUT ACTUAL IS 21 -> DATA[3           2            21]
// --> LOSS = 25-50 = -25
// --> W1_NEW = 15+0.01*-25*3 = 14.25
// --> W2_NEW = 2+0.01*-25*2 = 1.5
// --> B_NEW = 1+0.01*-25 = 0.75

// --> NEW UPDATED FORMULA :- 14.25X + 1.5Y + 0.75 <--------- ****SO YE DIFF DIFF USME SE INC/DEC HORAY HAI -> SO AB HM IS FORMULA KE PASS POHOCH SHAKTE HAI --> [CORRECT :- 5X*3Y+4]
// --> DO IT BAAR BAAR AND APAN CORRECT FORMULA KE PASS POHOCH JAYENGAI


// --> SUPPOSE WE HAVE 1000 DATA POINTS --> SO FINAL FORMULA KUCH BHI BAN SHAKTA HAI --> EX:- 4.98X + 3.01Y + 4.2 <-- AND YE ACCEPTED BHI HO SHAKTA HAI B/C MODEL/LLM PREDICTS
// --> EQN KE PASS JANE KI KOSIS KARTE HAI --> SINCE WE SAY THAT OUR MODEL PREDICTS



// --> **** AND THIS IS CALLED SINGLE NEURON -->

//               W1                   +B 
//        X ---------------->    |----------|
//                               |          |    ----------> ANSWER
//        Y ---------------->    |__________| 
//               W2              SINGLE NEURON

// --> X,Y WE HAVE AND WE FIND W1,W2,B 
// --> TRAIN OUR DATA THEN WE GET VALUE OF W1,W2,B [EQN]
// --> THEN WE GET PREDICTIONS 



// --> FOR 3 INPUTS :-


//               W1                   +B 
//        X ---------------->    |----------|
//               W2              |          |    
//        Y ---------------->    |          |     ----------> ANSWER
//               W3              |          |
//        Z ---------------->    |----------|

// --> SAME FORMULA FOR UPDATATION



// ----> **** ABHI HM SIRF LINEAR EQNS BS SOLVE KAR SHAKTE HAI --> Y = MX + C --> NOT ABLE TO SOLVE QUADRATIC AND ALL EQNS

// -> Y = 2X+1
//                            |  /
//                            | / 
//                            |/
//             ------------------------------
//                          / |
//                         /  |
//                        /   |    