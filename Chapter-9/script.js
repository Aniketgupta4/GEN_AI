// question -> vector1 : [1,2,3,4,5]
//             vector2 : [5,3,6,3,8]
//             vector3 : [2,3,4,5,6]

// konsa vector kiske jyada pass hai tell it by
// --> a) (LESS USE)EUCLIDIAN DISTANCE -> ans less utna pass dist hai btw both vectors 
// --> b) ***(MOST USE) COSINE SIMILARITY -> result is in btw [-1,1] -> 1 means both same , 0 unrelated , -1 opposite direction most different (image1)     

// ----> WHY COSINE ? ----> because cosine only tell direction we need direction whereas euclidian tells both dirn and mag


// **** image2 example ([10,20,30,40] and iska magnitude badha [100,200,300,400] and apan ko magnitude se mtlab ni so remove and compare without magintude by direction COSINE) -> calculate euclidian distance so relation bohot dur ayega (due to magnitude) so EUCLIDIAN FAIL -> wahi agar cosine se nikale toh relation pass ayega dono ka (ONLY DIRECTION)--> because dono ke vector milte julte hai cat se related hai  

// ----> LET [1,4,2,8] LIKHA HAI INKO RAW EMBEDDING BOLDE VECTOR NI ----> SO ****NORMALIZE IT FIRST (RAW EMBEDDING KO NORMALIZE KARO) image3
// ----> **** value normalize karke 1 banate hai


// Example: image4
// Day A and Day B have the **same pattern (one is a scaled version of the other),
// therefore cosine similarity is more suitable as it measures directional similarity.

// Day A and Day C have similar **actual values,
// therefore Euclidean distance is suitable to measure closeness.



// ----> **** SIMILAR CHIZE KI BAAT HO TOH COSINE --> SAME DIRECTION (VALUE DUR DUR HO REMOVE DISTANCE AND DIRECTION DEKHO BS)
// ----> **** USE EUCLIDEAN WHERE MAGNITUDE IS IMPORTANT --> VALUES PASS PASS HO TAB



// -----------------------------------------------



// 1) ----------------VECTOR DATABASE-----------------

// --> NEED OF VECTOR DB ?
// --> basically sql and nosql db are designed to find exact matches bwt values
//     ****where vector db are designed to find similar items by conceptual meaning


// Example : Blinkit with 1 million items

// SOLUITON1) --> BRUTE FORCE : 0(N) complexity for 1 user 
// -> image5 -> onion ko cart pe add kiye --> so wo onion se related similar vector find karega in 1 million data items and --> suggest karega hmko similar items 
// -> 0(N) complexity for 1 user -> jitne new user ayega cart pe add karengai so sabke liye 1 million data se ****bar bar search karega smiliar ones ----> very slow 

// ----> **** SLOW NOT SCLABALE METHOD WORST TIME COMPLEXITY 



// SOLUTION2) CAN WE DO SORTING PROPERLY IN VECTORS ? [logn -> for sorting only 1 time bs on whole 1 million data]
//           -> on what basis we do sorting?

// ->[1 time sorting ka kharcha ayega bs] -> items ke basis ke sort karlo matlab vector items hai toh -> vector_cart[cart selected vector item] ke 1st item ko vector1 ke 1 item if match then 2nd item and all is type se 

// ******* apply binary search but kyu binary search --> correct answer dega ki ni ?

// ** -> bohot bekar hai binary search
// example  --> image6 binary search lageye first item match kare toh bada mila and chote ki bhej diya per 2nd item of vector ko bohot dur ho gya ----> worst suggest binary search
//           -> **** image7 -> agar normalize bhi hai data tabbhi bekar answer hi milega yr by binary search

// ******* jyada dimension vector ke match hone chaiye waha binary search suggest ni karta wo sirf vector ki 1 value dekh ke suggest karta hai bekar hai



// SOLUTION3) NOT USE HASHING --> 0(1) COMPLEXITY GIVE PHIR BHI NOT USE IT

// because HASHING ****exact search karta hai and apan ko similar search chaiye so not use hashing



// SOLUTION4) KOI SA BHI TREE BHI SAHI ANSWER NI DEGA BECAUSE -> YE SAB SORTING USE KARENGAI AND SORTING APAN KO SAHI ANSWER DE HI NI RI HAI --> SO TREES BHI USE NI KARENGAI

















