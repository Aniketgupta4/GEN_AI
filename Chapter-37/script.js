// build tokenizer :-

// -> 1) we studied tokens , vector emdeddings and all -> ok
// -->                   text -->         token        -->     vector embedding --> 

// --> ex :- i am best in the --> [10,200,190,73,1098] --> [0.1,1.2,....] [2.1,3.2,....] [4.1,2.4,....] [1.2,2.5,....] [4.2,5.6,....]


// --> **** s1) in real world can we follow this approach --> ki har input ko har neurons ko bhejna hai means -> [each neuron have 5 weight]

// input                neurons         

// "i"               ---- [5 weight]
// "am"              ---- [5 weight]
// "best"            ---- [5 weight]
// "in"              ---- [5 weight]
// "the"             ---- [5 weight]



// --> **** s2) each input is of 768 dim ka thik so ab --> [each neuron have 5*768 weight]

// input                  neurons                

// "i"               ---- [5*768 = 3840 weight]
// "am"              ---- [5*768 = 3840 weight]
// "best"            ---- [5*768 = 3840 weight]
// "in"              ---- [5*768 = 3840 weight]
// "the"             ---- [5*768 = 3840 weight]

// -> ******** tell can this method works and jo input hai wo bhi fix ni hai bohot sare aate jayengai a/c to user conversation ? 
// -> **** so agar input 1000 hai toh --> 1000 * 768 = 768000 weight hongai and ayse hi jitna jayda input utna weight inc hoga --> hm yahi decide ni kar paray ki neuron ka weight kya hoga
// -> **** ek approach ki weight fix kardo neuron ka 

// ----> means we cant tell abhi tk ki 1 neuron ka weight kya hoga ----> as deep learning is complex require too much data so --> so jyada neurons honge so it is complex
// --> let first layer = 10k neurons
// --> 76 lakh * 10k = 7600 crore weights 
// --> let apan context window fixed karde toh --> 10k token --> but apna toh 1st layer pe hi itna sara use hora hai token so it cant works in hidden layer pe bhi bohot sare tokens lagengai so itne pe ni ho payega
//                                              [10k * 768 = 768000] 


// -----------------> ************ this method fails here <---------------------




// ----> 2) we cant discuss abhi tk --> text to token pe kaise convert karengai --> discuss --> how to build tokenizer ? --> and har website ke tokenizer alag alag work karte hai

// -> token --> har 1 word ko number dena hai 
// -> current only support english words ok
// -> let 2 millions words honge in english [verb and all]
// -> get all data form internet and put unique words in set -> {2 million words} -> assign tokens --> "adiv":0 , "harsh":1 , .... 2 million data 
// -> **** ayse system banaogai thik hai --> per we have to store vector embedding of these 2 million vector --> 2 million token * vector embedding
// ----> 2 million * 10k = 2000 crore 
// ----> 150 gb of storage require to store this --> itne pe hai system fatne lagega samjhe

// -> so bohot sara storage chaiye --> storage issue arise and abhi hm 768 dim ki baat karray hai 12k dim tk hote hai so bohot sara in memory chaiye so --> ye possible sa ni lagra hai


// -------------------------------> so this fails <----------------------------------


// ----> **** kuch bich ka method use nowadays -->

// -> ki sirf 50k number ko hi bs token provide karengai --> so how to decide kis kis ko token assign karengai ?
// -> 2 million mai se konse 50k hongai jinko token assign karna hai --> take internet se whole data and jo top 50k pe frequent words hongai --> un top 50k ko assign kardo token 
// -> but koi new word hai toh usko toh kabhi token id provide hi ni hogi --> 

// -> ek kaam karo --> 50k frequent words + 56 words [a-z,. -> ascii values] -> problem solve -> ab assign ho jayega kisi bhi new word ko token -> by this approach 
// --> isme kya issue hai batao ?
// 
//  --> ex :- runs , running , run , runner 
//            sing , sings , singing , singer
//            dance , dances , dancer , dancing
//            .......

// --> ******** jo bhi word internet pe frequent hai inme ye sab hai thik --> and kya ho mai sirf --> run ko bs token assign karu --> run = 4 , ing = 173 , sing:76 [jaise run ko token assign kare diye so running ko ni karengai token assign sirf -> ing ko bs karengai assign token and in future kuch bhi ata hai new word ing related so iske pehle ke bs bo token dena padega ing ko toh assign hai samjhe]
// --> **** so mai variety of words ko -> 50k ke ander laa paoga 

// --> how to build this solution batao -> existing word ko use karke new word bana shake ?



// --> how to build tokenizer :-

// -> given -> low, low, low, lower, .........
// -> break into individaul character -> l o w  l o w  l o w  l o w i n g ........
// -> and ab chalo 2-2 ke pair pe break karlo inko -> 
//    lo 
//    ow
//    w_
//    _l
//    ow  
// -> jinki freq jyada usko 1st token assign kar dengai [0-255]
// -> and ab inko merge karke chalogai ki ye 1 token hai -> ex: lo [max freq wala]
// -> repeat same process -> max freq wale ko token assign kardo --> and total 50k times runs karengai toh sabko token mil jayengai
// -> means isme single word ko token assign hoga then double word ko triple word ko and all sabko token assign hongai


// -> let token assign to :-   in = 238 [consider as single token]
//                       then  ing = ?  --> wahi same process repeat hogi and in wale ing wale count hongai -> max freq wale ko select and assign token too


// -> ex :- let new word is -> chatgpt -> assign token to it ?
// -> existing tokens in library [inko tokens assign hai already] -> [chat , at , c , h , a , t, g , p , t , hat]
// -> so tell kaise assign hongai token to --> chatgpt --> 

// -> 1) **** single words dekho then double words then triple words then 4words so chat is big word and have token already -> and g , p , t -> single single hai and inko bhi assign hai token so g , p , t , chat ----> means it get 4 tokens total

// or 

// -> 2) **** ch ha at tg gp pt --> 2-2 ke pair pe dekho toh at is big and have token --> then triple pe dekho -> ch hat atg gp pt --> hat ke pass hai --> then ab 4pair of dekho -> chat hatg gp pt -> chat ke liye hai token -> ayse hi karo <--------------------- this is follow by openai 


// ----------> 1) this strategy follow by google , gpt and all in real world <----------


// -> **** make 1 more optimization too -> ki jaise ex: low low low low -> bohot baar hai --> lo ow w_ lo ow w_ -> aysa bar bar calculate ni karo computaion bacho -> lo aya hai and low 5 baar hai so lo*5 kardo direct baar baar lo ko wo ni karo samjhe


// -> **** model ho har type ke data -> correct incorrect data sare data pe train karte hai --> tabhi wo sikhta hai 
