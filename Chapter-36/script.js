
// --> **** what we will give input to model --> sentence toh ni de shakte and tokens meaningless hai toh ni de shakte -> kya de input pe batao ?
// --> We provide the model with natural language text (a prompt), such as a sentence, paragraph, 
//  code, or any text sequence. The tokenizer converts this text into tokens, then into token IDs,
//  which are transformed into embeddings before being processed by the Transformer model. So, from the user's
//  perspective the input is text, while internally the model processes token IDs.
// 
// -> User
//    │
//    ▼
// "Explain Binary Search in Java"
//    │
//    ▼
// Tokenizer
//    │
//    ▼
// ["Explain", " Binary", " Search", " in", " Java"]
//    │
//    ▼
// Token IDs
// [4521, 8912, 645, 287, 9034]
//    │
//    ▼
// Embeddings
//    │
//    ▼
// LLM
//    │
//    ▼
// Output Tokens


// ----------------------------------------------------------------------------------------



// --> let training data hai placement.csv wala --> 2k training data hai -> 


// --> 3 cases arise when data given to model ->


// ----> case1 :- suppose 600 data points ayse hai jo contradict karray hai kabhi o/p pe tcs/microsoft deray hai toh dekho ayse pass pass hai approx
//               2k total     ->    600  incorrect [30%]        1200 correct [70%]
// ex:-      dsa           iq                   cgpa           project         attendance           company
//          190            110                    8             7               88                  microsoft
//          191            111                    8.1           7               87                  tcs

// -> so meaningfull data toh --> 2k - 600 = 1400 hua na --> 600 toh biased hai na [ye 600 data bohot ass pass hai contradictry answer dera hai]
// -> **** aysa lagra hai ki ye 600 value dikkat karri hai toh -> inko drop kardo --> batao ? --> itna sara data drop karna sahi ni hai b/c real world data hai -> no drop data model isme mai train karo bhale accuracy less ho --> and 600 data remove kardiye and wahi use check kara toh --> model answer ni de payega correct --> samjhe bhai
// -> 600 data drop toh kar diya accuracy jyada ayega per --> model learn ni kara hai yaha hai ratta mara hai [overfitting] -> means jane hue data pe correct ans new data pe incorrect ans ---> aysa ni karna hai samjhe
// --> **** 70%-75%-77% data hi correct hai [1200 data] --> agar 600 data remove kar diye toh --> toh 80% data pe train karu 20% se test karu ki, 1400 data pe train, test karu -> 80-20 wala is correct and --> apni accuracy bhi itne ke across ani chaiye -> 70%-75%-77% thik



// ----> case2 :- 80% training , 20% testing 
// --> 80% pe hi train and test karengai toh accuracy achi ayegi -> approx accuracy ayi -> 73%
// --> and ab testing data pe test kare 20% pe accuracy 57% ayi
// -> **** isne ratta mara hai --> 



// ----> case3 :- 80% train      ,  test 20%  
// --> accuracy ->  74%                72%             <- **** this is the best model 

// -----> ******** accuracy 74 - 75 % dekh ke ye ni sochna less hai acuracy --> samjhe --> b/c we work on less data --> in industry whole amount of data so --> accuracy achi ayegi --> 80-20 pe train test karo and jyada data drop ni karo samjhe 

// ------------------------------------------------------------------------------------------



// ----> ex :-                                    10 lakh data
//                                                  /      \ 
//                                          9 lakh data        1 lakh data
//  c1 :-                                   97%                  64%                   ----> bekar model
//  c2 :-                                   96%                  95%                   ----> good model 



// --> **** in real world itna sara data hota toh kaha se find karogai ki data sahi hai ya galat hai ye socho [ex: some say modi is good some say modi is bad so how u conclude] --> isi liye data drop ni karna chaiye apan ko bhai sahab 
// --> **** pehle ye toh karo data sahi se laao sikhne do ----> then baad mai fine tune and all karengai ki wo sahi se ho jayega samjhe  




// ----------------------------DOUBT-------------------------------
// **** another chiz --> loss = actual - predicted hai so isme chote chote changes show honge w update ho so lagega changes ni horay so square ki terms pe kardo big big value dikhegi lagega ki loss calculate hora hai samjhe and update w and all --> and ye ki loss change hora hai toh aage kare warna loss change ni hora toh ab stop ho jaye -> loss = (actual - predicted)^2
// -> loss positive hi ho samjhe toh sahi hai  
// ---------------------------------------------------------------




// ----> ex :-  
//                         dsa                  iq                project             attendance         cgpa            company
//                        200                   110                7                     82               8                ----

// --> firstly normalize it -> without normalize bhi answers milega but time lagega --> so normalize it first sabki 1 range pe le aao [fast learn and o/p milega] -> normalize = x-min/max-min 
// --> [normalize = x-min/max-min ] this formula of normalization is not work here so use ---------> z_score work here 
// --> z_score = x - mean / std

// --> in real world --> any one has done 500 questions thik ---> but 1 dikkat hai --> limit thoda na hai dsa question solve karne ki --> ex:-    500 - 80/200 = 3.5 [so ye toh range 0-1 se bahar hai] --> so dont use this formula ----> normalize = x-min/max-min <---- model worst perform here in this condition 
// --> **** jaha limit ho waha pe use --> normalize = x-min/max-min --> warna use z_score wala formula **** std values use karo 
// --> so use z_score method --> z_score = x - mean / stddev      --> stddev = (mean-x1)^2 + (mean-x1)^2 +....+(mean-xn)^2   --> squareroot(s/n) = sd
// --> z_score wala --> -2 se 2 ki range pe answer lake deta hai <---- bookish baate ->kaise bol shakte hai --> ok thik per isi ke bich pe ans ate hai max thik --> iske bahar ayengai toh wo outlier treat hote hai 

// --> suppose sigmoid ([0-1] convert sigmoid) use karray hai so konsa use kare --> z_score





// -----> let king = 120 , queen = 777    <- tokens assign hai thik

// --> take 50k length arr ----> [0,0,0,0,0,0,0,0,....,1,0,0,0,0,0]  120 idx is 1   ,   777 idx is 1      [0,0,0,0,0,0,0,0,....,0,0,0,0,1,0,0,0,0,0] 
// --> ab sahi lagra hai comparison pe  --> vector pe represent kara ke ----> normal token compare karne pe ajib hora tha --> token value se bada chota lagra tha toh isko choro and ye vector wala pe think karo 

// [

// // -----> Example:
// "king"  -> Token ID = 120
// "queen" -> Token ID = 777
//
// Token IDs are just unique identifiers.
// They DO NOT represent meaning or similarity.
// For example, 120 < 777 does NOT mean "king" is smaller or less meaningful than "queen".

// ------------------------------------------------------------------
// One-Hot Encoding Representation
// ------------------------------------------------------------------

// Assume the vocabulary size is 50,000.

// "king" (Token ID = 120)

// [0, 0, 0, ..., 1, ..., 0, 0]
//                 ↑
//             Index 120 = 1

// // "queen" (Token ID = 777)

// [0, 0, 0, ..., 1, ..., 0, 0]
//                 ↑
//             Index 777 = 1

// Here, each token is represented as a vector of length 50,000.
// Only the position corresponding to its Token ID is 1, and all others are 0.

// This representation makes it clear that Token IDs are simply positions (indices)
// in the vocabulary, not numerical values with semantic meaning.

// Instead of thinking:
//    king = 120
//    queen = 777
// and comparing 120 vs 777 (which is meaningless),
// think of them as one-hot vectors representing different vocabulary entries.

// Note:
// In real LLMs, one-hot vectors are NOT fed directly into the Transformer.
// They are multiplied by the Embedding Matrix to produce dense embedding vectors
// (e.g., 768, 1024, or 4096 dimensions), which capture semantic relationships.

// ]




// ---> it --> means --> yeahh
// --> a dog hit the wall, it __hurt__     <---- here it meaning is dog 
// ----> ******** so word ka meaning context ke uspe change hota rehta hai samjhe  

