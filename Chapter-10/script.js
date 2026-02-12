// image1 -> ANN Approach -> approximate nearest neighbour -> finds a data point in a data set thats very close to given query point but not necessarily the absolute closest one 
//                        -> it sacrifice a tiny amount of accuracy -> it might return 9 of the top 10 plus the 11 -> for a massive gain in speed (often order of magnitude faster) 
//                        -> **** fast result ayega per --> 8-9 sahi but 1-2 wrong suggest kar shakta hai --> but faster  




// First Method --> image2 -> Clustering / Inverted file index (IVF) -->

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








































