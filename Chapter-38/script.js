// -> as number of neurons too much weight too much [in 1st layer = 100 crore weight ho jara] -> so computation power bohot lagegi so can't use ANN ---> this is not an optimize approach

// -> ex:- the chai is hot 
//           \   |  |    /         
//            \  |  |   / 
//              _______    neuron 


//           0   1   2   3   4   5
// the  -> [ _ , _ , _ , _ , _ , _]  -> 768 dim hai
// chai -> [ _ , _ , _ , _ , _ , _]
// is   -> [ _ , _ , _ , _ , _ , _]
// hot  -> [ _ , _ , _ , _ , _ , _]



// take 1 vector -> and give it to neuron

//           0   1   2   3   4   5
//         [ _ , _ , _ , _ , _ , _]              <- the
//         w1\  w2| |w3 |w4 |w5  /w6         
//            \  |  |   |   |   / 
//                 _______    neuron 

// --> **** so learn that there is 768 dim present -> for each one [the chai is hot]
// --> ******** so yaha pe weight less ho gaye --> per neuron samjhe [in older method jo fail hua tha uspe 100 crore weight aara tha per neuron per isme sirf 768 weight hai so this is optimize]

// --> [the chai is hot]   <---- **** in sab ko parallel pe chala do 
//      /    |    |    \         
//    ___   ___   ___   ___  [neurons] --> and sirf 768 weight hi yaad rakhna hai bs --> b/c w1 -> 0 idx , w2->1 dx2  and so on --> so apan ko idea hogya ab ki w1 , w2 .... sabke liye same hongai so --> sabko parallel pe chala shakte hai kyuki sabme same weight use hongai -> sirf weight yaad rakhna hai i.e. 768

// --> so ye sab yaad kar liye --> learning ho gayi thik --> and user ne input diya toh --> apan sabko parallel pe chala shakte hai samjhe 
// --> **** so wo pehle wali problem solve ho gayi --> weight outbrust wali in older method


// --> [the chai is hot]   <---- **** in sab ko parallel pe chala do 
//      /    |    |    \         
//    ___   ___   ___   ___  [neurons] --> and sirf 768 weight hi yaad rakhna hai bs --> b/c w1 -> 0 idx , w2->1 dx2  and so on --> so apan ko idea hogya ab ki w1 , w2 .... sabke liye same hongai so --> sabko parallel pe chala shakte hai kyuki sabme same weight use hongai -> sirf weight yaad rakhna hai i.e. 768
//     |
//     \/
//     o/p

// --> **** jitne size[768 dim] ka vector embedding diye so --> 768 dim ka o/p hi chaiye so kya karo last pe 768 neuron bana lo --> 

//                    the                                 
//            /   /   /  \   \   \                        [768(neurons*768(weight) + 768(bias)]    ----> itne hi sabke liye hongai
//           /    /   /    \    \    \
//    __  __  __   __  __   __  __  __  __      768 neurons
//     |    |   |   |   |    |   |   |   | 
//  _________________________________________     768 dim o/p 





// 2) how to predict next token -->

// ---->  the chai was too hot so he waited (token ?)
// -> sabne apni calculation khud kari hai parallely thik

// --> find next token ok ?
// --> let last layer pe 1 single 768 dim vector hai ----> 50k tokens exists ok
// --> fig1                                         probability
//                          |------->  __  ->    0.1
//          768 dim vector  -------->  __  ->    0.6
//            (last layer)  |------->  __  ->    0.3
// 
// --> softmax apply kare hai in last layer ki probability mai jaye jiski probabilty jyada usko dedo new token 

// --> **** so sirf agar dim pata lag jaye last dim ki toh apan kar lengai easy se --> ki apply softmax probbilty max assign token --> but kaise pata lagega dim of vector at last layer


// ex :- har 1 chiz ka meaning alag hota hai context ke hisab se --> the chai was too hot so he waited ____
// -> kya karo --> last word ka meaning store karlo --> waited -> 768 dim --> so jab ye pura read karke koi ayega toh usko purana bhi yaad ayega ki pehle chai , hot tha toh --> next kya ayega wo last word ko dekh ke predict kar dega  --> [means general meaning change hogya of last word waited samjhe a/c to context]
// --> **** so last wale word ko context aware bana do ki usko pata ho ki last wale ko ki --> pichle baki sab ka meaning kya hai --> so sahi rahega predict karne pe 
// --> so 768 dim vectors of all [the chai ......] ------------------>  new 768 vector   ---> and used it uper in fig1   -----> and aage probabilty wagera lagaye toh o/p mil jayega -----> this is **** attention you need 
//                                                     convert to      [all prev meaning present means conclusion of all previous vector]

// --> **** so agar new work predict hua so ab us new vector [last wale] pe context aajaye all prev ka in new vector so next predict kar paye --> easily 

// --> **** aysa kabhi ni socho ki bohot big vector kar diye toh jyada chize aa payegi --> aysa ni hai samjhe

// --> **** 12k dimension wala vector kyu use karray hai itna big vector ?
// --> so baat ye hai jitne jyada dimension --> utna jyada depth us chiz ki apan store karray in that dim vector samjhe





// ----> see niche wali img in pdf ----> self attention wali

// -> waited [last] wale ko --> vector embedding change karni hai how [baki sab ke vectors details isme aajaye -> last wale pe]?
// -> **** means we have to pay attention in last word ----> means we have to find dot product -> [(not use) -> similarity search] ****RELEVANCE  b/w others and last wale se --> and apply softmax so pata lagega kon kitna pass hai last wale se by probablity 
// -> **** 0.01,0.04 , ......[7 values total] we get by dot product ---> apply softmax so we get in % terms ki kitne similar hai -----> so kya kare --> 0.01 wale ko the se * kare , 0.01 wale ka * chai and all se ayse hi hoga and do sum of all so ----> we get 768 dim vector [new]

// -> **** can we do similarity search here or not ?
// -> similarity search se koi help ni milega yr ---> ex: dog , doggy -> ye same hai so kya hua isse --> kuch help ni mili ----> so not use this similarity search ----> ****relevance pe focus karo last wale se samjhe [waited -> hot -> chai] and inme se context pe sahi lagra hai samjhe
// -> last word -> ka meaning samjho pehle then --> use related/relevance words dudho ki agar 2 4 subject hai sentence pe toh last word kispe focus karray hai tab apan ko correct -> context milega finally
// -> **** so jispe attention you need last wale ka jispe jyada hai ---> uske hisab se hi correct context wo hoga and we get correct next word

// -----> **** and hame vector embedding ko -----> change karna hoga to new vector embedding ki isme relevane wale another vectors aa shake --> 
// --> so change it by 3 things -> query,key,value [kc-cache this is]
// --> **** query embedding pe key embedding pe and value embedding pe change karo vector embedding ko 
// --> means 3 vector banengai 1 for query 1 for key 1 for value [] , [] , []
// --> ex : - youtube video upload too much things  --> so title is -> key , video is -> value , search kare particular topic video is -> query


// --> so find -> query key value for each one -> ex :- the chai was too hot so he waited
// --> queryweight , keyweight , valueweight ----> sabke liye same hongai ----> so vector embedding pakdo * karo [v.embedding * qweight = query,v.embedding * qkey=key,v.embedding * qvalue = value] ---> and we get query key and value embedding
// --> learn these weights by training time ----> queryweight , keyweight , valueweight

// --> yaad hai uper ka -> last wale se sabka dot product nikalte thay baki sabka --> so we get 8 values -> apply softmax we get [0.1,0.2,.....] -> so ab 0.1 * the + 0.2*chai + ..... ---> get new 768 dim vector [chai hot too]


// --> **** queryweight , keyweight , valueweight ---> same for all why ?
// --> ******* let agar queryweight , keyweight , valueweight --> diff diff hue toh --> weight phir se crash ho jayega bohot sare ho jayengai ----> isi liye ye same hai normal ache se work kare
// -> queryweight , keyweight , valueweight -> same hongai for all raw embeddings 
//
//                                   0   1  2  3 4  5  6   7
// ex:- raw embedding1 for the -->  |--|--|--|--|--|--|--|--|
//                                       |      0  1   2  3  4  5  6  7
//                                       | *   |--|--|--|--|--|--|--|--|     queryweight 
//                                       \/
//                                 new embedding [get new embedding]
//                             |--|--|--|--|--|--|--|--| 
// --> 0*0 + 1*1 ..... --> is type se sabke liye hoga keyweight , valueweight ---> and for all one so sabke liye [queryweight , keyweight , valueweight] same hongai --> the chai was too hot so he waited

// --> what is queryweight , keyweight , valueweight ?
// --> in next class 


