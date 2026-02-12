// image1 -> ANN Approach -> approximate nearest neighbour -> finds a data point in a data set thats very close to given query point but not necessarily the absolute closest one 
//                        -> it sacrifice a tiny amount of accuracy -> it might return 9 of the top 10 plus the 11 -> for a massive gain in speed (often order of magnitude faster) 
//                        -> **** fast result ayega per --> 8-9 sahi but 1-2 wrong suggest kar shakta hai --> but faster  




// ----> First Method --> image2 -> Clustering / Inverted file index (IVF) -->

// -> let orange hai 2d pe apple hai and so on -> orange = [2,3], orange=[4,5], apple=[5,6] , ........

// plot in 2d graph see -> image3

// basically see -> image-4 ki cluster like things build hori hai --> similar type of things in one cluster by taking one centroid point in cluster -> ki us centroid point se distance le har point ki and pass walo ko ek cluster pe lelo


// -> centroid is necessary ?
// -> centroid hai so ab new data point find karne ko aya so -> match it with only centoids not with each data points -> and jab pata lag jaye ki yahi wala centroid wala cluster hai toh phir sirf us cluster ke sare data points se match karlo data points with new data -> jo sabse pass hai so unko answer pe return kar dengai   
// -> so time less hua and costing bachi na -> baki sab data points se match ni karna padega sirf centroid se match karo new data point ko and jab centorid mil jaye tab sirf us specific cluster ke data se match karo and return pass pass wala data points with that data point  
// -> agar clusters ni hai so bohot time lagega --> let 1 million data points so 100 cluster banaye with 10k-10k data points so sirf 100 centoird se compare karo and similar wale cluster ke 10k data points se new wala data point match hoga and return pass wale suggestions
// -> but cluster ni hota toh 1 million data points se match karna padta new data point ko whereas in cluster apprach sirf 10k + 100 data points se cmpare karna pada --> so time less laga na 

// --> issues in this method --> 
// -> **** 1 cluster ke saath match kare new data point ko but centorid dekhe only thik ----> but kisi or cluster pe or pass pass data points hai per apan us cluster pe toh dekhe bhi ni and apna isme check ni kare or isme or best result milte as compare to pehle centroid cluster se  

// -> **** little acha approach -> ki 2-3 ache cluster select karo and compare new data point with data points of these clusters and best wale ke top results recommend kardo
// -> drawbags --> time inc ho jayega -> 10K * 3clusters + 100 clusters = 30k+100



// ----> how cluster created in real life ?
// -> initially we have 1 million vectors so how we will build 100 clusters/centroid 
// -> Randomly select vectors --> [100 centroids]
// -> and 1-1 karke data point uthao and jis centorid ke pass data hai usko us cluster pe data daldo
// -> so 100 clusters hai so ayse 1-1 karke randomly cluster pe data points ayega -> and koi se cluster pe kitne bhi data points aa shakte hai 

// -> cluster1 = 1k data points ,cluster2=10k ,cluster3=4k and so on
// -> **** so ab kya karo average nikal lo har ek cluster ke ander ke data points ka and new centroid initialize kardo so sabke sath ayse kare so phir se again 100 new centroid ban gaye and phir se data points ko 1-1 karke pass wale centoid wale cluster pe dal diye thik --> and same process repeat bar bar toh kuch samay baad ye clusters stable ho jayengai  
// -> so stop kab hoga so 100 iteration kara liye and iske baad stable ho jayega cluster maan lete hai --> and clusters pe value (data points) lag bhag equal distribute ho janegai ~1million data in 100 clusters --> diff diff values ni hongi clusters pe bohot gap ni hoga ki kisi mai 10k hai toh kisi mai 20k value hai in cluster


// drawbag of cluster appraoch --> ki 10000 new data points ko add karna hai so --> again pura run karana padega new graph banana padega and repeat same whole process again and again 
//                              -> **** so this is better for static data not for dynamic data [new-new-data]

// -> **** no new insertion so ache se work karega and agar new data ayega so dikkat hai --> repeat karna hoga whole process ko


// ----> **** number of cluster decide by self --> a/c to problem -> elbow method etc




// --------------------------------------------------------------



// ----> Method 2 --> image5 --> Decision Tree Method (Binary space partitioning) -->

// --> **** spotify use this method for long time --> time consuming tha inka approach

// --> main goal of this method is that --> ki kisi ko search karna hai toh normal approaches 1) linear search (n)  2) sort data and apply binary search (logn)  --> but a/c to this method
//           |
//           \/
// ***** --> image6 -> binary search tree banao and build tree in sorted form --> hm jante hai from earlier class ki data ko sorted rakhne se koi fayda ni hai 


// in this method --> 2-dimension hai and data points hai
//                 -> **** do binary partioning karo -> divide x axis -> then again cut in that new line -> mark cut on down side on same first cut -> and jo new wali 2nd line thi na usko phir se 2 mai cut karo ----> so search area reduces -> see image7 
//                 -> make cut in x then y then x then y then x pe

// -> basically cut karke graph banana hai -> see image8
// -> so kya hoga see image8 and -> ki first time level1 pe X pe cut mare thay [mid find karna in all data(vecotrs) pe] -> tree 2 part mai divide hogya
// -> so in 2nd level Y pe cut maro [mid find karo] -> so tree 2 part mai break ho gya
// -> so in 3rd level X pe cut maro [mid find karo] -> so tree 2 part mai break ho gya 

// -> same work do in both side of tree
// ........ so by this way build tree



//           X
//         /   \
//        Y      Y
//       /  \    / \
//      X   X    X   X
//    / \  / \  / \  / \
//   Y  Y  Y  Y Y  Y Y  Y


// --> new data point aya so --> at 1st level jispe cut hai --> X pe so compare self data of x with new data of x --> so left ya right pe send karega level2 pe and so on ----> so new data point ko nearest wale find karna hai na but ho shakta hai nearest wala data point left side ho and level1 se compare hoke isne new wale ko right pe bhej diya ho --> **** so kabhi pass wale se match hi ni hua na --> not get best result
// **** and abhi toh 2d pe hai --> and and agar n-dimensinal pe gya toh --> 10 mai se 2-3 sahi and 7-8 wrong match milega

//  --> **** and data sort form pe hai --> worst hai bohot




// ------------------------------------------------------------------


// --> **** Method 3 --> Hierarchial navigable small word -> (HNSW)

// -> bohot use hota hai in vector database + complex hai to understand

// -> **** log(n) time pe search data + read write also in log(n) time
// 
// -> image9 -> s1) suppose we have bohot sare vectors and each vector consider as node/vector[same] ----> har 1 vector ko pass ke 3** closest walo vector se connect kardo and say it [layer-0] -> image10
//           -> s2) image11 -> ****randomly from layer0 se -> 50% node ko leke layer1 pe chale jao and connect with 3** closest data point/node/vector  -> [layer-1]
//           -> s3) again take randomly 50% node from layer1 and promote it into layer2 -> and connect each node with its 3 closest nodes -> [layer-2]
//           -> s4) image12 -> same step again and at top level 1 node bacha [layer-3]
//
//        -> basically hierarchy ban gi hai layer wise   
//
//
// ----> **** let new element aya so iske 5 closest node find karna hai ->
//    -> at layer-3 1 element so compare new data point [cal cosine distance] with it and if dis match [pass pass dono] so select it and -> move to layer2 and compare distance of all data points in laer-2 with layer-3 min dist point   
//    -> at layer-2 bohot sare points hai so compare new data points with each node [at 2nd layer] -> and jise cosine distance less aya choose it and ab is node [less dis node se] se next layer pe data points se match karega   
//    -> at layer-1 -> layer-2 wale closest data point se move karke aye layer-1 pe and compare distance jisse jisse ye connect hai at layer-1 and less cosine distance wala select and move to layer-0  
//    
//    -> ******** at layer-0 [we have to find 5 closest here] -> so layer-1 se apan niche layer-0 pe aye so apan ko layer-1 se jis data point se layer-0 pe aye hai us data point ko lo and find closest 3 and but apan ko 5 closeat chiaye so -> spread karte jao or 3 ke neighours bhi lelo so jyada closest data point agye --> so select top 5 closest b/w them




//  Q1) --------> RAMDOMLY SAB HORA HAI ----> BUT ANSWER ACCURATE MILRA HAI ?
//  Q2) --------> GRAPH BUILD KARNE PE KITNA TIME LAGEGA --> ki ye har data point se distance calculate karega at each level and nearest 3 select karega --> so complexity inc hogi na toh kya matlab --> BATAO ? 
//  Q3) --------> SO HOW HNSW HAVE LESS TIME COMPLEXITY ? 


