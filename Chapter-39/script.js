// --> what is queryweight , keyweight , valueweight  and query , value , key and why sabko alag alag rakhte hai ?


//               k/v  k/v k/v k/v ........    [each one have k/v pair]
// --> ex :-     the chai is hot so he waited
//                                       | [query]

// --> and last wale ke sath baki sabka --> dot product nikale gai and softmax apply karke probabilty pe laray thay --> and high probabilty walo ko leray thay ----> so new vector embedding created []

// --> query --> web dev course
// --> key --> title present
// --> value --> finally video

// ----> **** yt example is very worst example for understanding --> query , key and weight



// ----> ex :- ---> query -> fiction book <--- librarian 
// ----> key ---> book title
// ----> value --> actual content

// **** why key value ko alag alag leray hai --> query ka chalo alag thik hai per why key and value alag alag -> all query key and value is of 768 dim phir bhi both ke value are alag alag ?
// -> 


// -> ex :- today i withdraw my money from the bank ____ [predict]
// -> bank -> have static meaning from raw embedding -> paisa se related , nadi ka kinara
// -> but is example pe --> ****[attention you need] ----> bank ka kya meaning hai --> paisa wala bank --> pata kaise chala --> by some words -> money,withdraw

// --> so ye last wale word --> query karega ki -> hm [finance ya nature] kisse related hai ---> so pehle ke words agar jis chiz se related hai so wo pata lag jayega
// --> so ab har word bolengai -> [withdraw]key: i am related to finance , [money]key:i am related to key , ........ for all
// -> so jab mai query ka har key se dot product nikaluga toh pata lagega ki --> kiski weitage jyada hai -> money and withdraw ki weitage jyada hai --> so ab ye bank last wala -> samjh gya mai finance se related hu ----> then ab ye apne ander context store karega of all prev ones 
// -> so ab withdraw ki value:i am someone related to finance you withdraw , money ki value: i am also related to bank money ----> so ye inki value ho gayi



// ----> query -> asks a question
// ----> key -> tells mai mai kya hu
// ----> value -> ye batayega ki mai actual mai related hu  


// ----> **** key and query alag alag hai kyuki -> key searchable ban paye ki meko koi dhdh paye mai kitna match ho paaoga


// --------------------------------INTERVIEW------------------------------
// Query (Q)
//
// Represents what the current token is looking for
// from the other tokens.

// Key (K)
//
// Represents what information each token contains
// so that other tokens can measure its relevance.

// Value (V)
//
// Represents the actual information that will be
// passed to the current token after attention scores
// are computed.


// Query = What do I need?
// Key   = What do I have?
// Value = What do I give?

// ----------------------------------------------------------------------



// --> raw embedding * with wq, wk, wv -> get key,value,pair
// -> this wq, wk, wv --> is same for all

//                                          768 dim 
//                                   0   1  2  3 4  5  6   7
// ex:- raw embedding1 for the -->  |--|--|--|--|--|--|--|--|
//                                       |      0  1   2  3  4  5  6  7
//                                       | *   |--|--|--|--|--|--|--|--|     queryweight 
//                                       \/
//                                 new embedding [get new embedding]
//                             |--|--|--|--|--|--|--|--| 
// --> 0*0 + 1*1 ..... --> is type se sabke liye hoga keyweight , valueweight ---> and for all one so sabke liye [queryweight , keyweight , valueweight] same hongai --> the chai was too hot so he waited


// or


// -> wq, wk, wv -> same for all -> means all inputs are * by same weights ok --> so all inputs * by same same -> wq, wk, wv

//       w1   w2  w3  w4 w5 w6 w7             <---- [w -> same for all inputs]
//        |    |   |  |  |  |  | 
//      |--|--|--|--|--|--|--|--|                <------
//                                                     |
//      |--|--|--|--|--|--|--|--|                <------  all are inputs 
//                                                     |
//      |--|--|--|--|--|--|--|--|                <------



// -> so ->              |--|--|--|--|--|--|--|--|         
//                          /     |             \
//                       wk/      |wq            \wv
//          |--|--|--|--|--|   |--|--|--|--|--|  |--|--|--|--|--|

// --> wq, wk, wv -> same for all inputs 



// ----> **** new vector embedding agyi --> 768[isme context hai + raw embedding of last word] ?
//                                                       |
//                                               do normalization in it  ---> [kya ye enough hai to find next one] 
//                                                       |
//                 hmne sirf linear relatiosnhip[by dot product] ka baat kiya hai --> quadratic cubic kuch bhi ho shata hai so --> so give it to feed forward n/w
//                                                       |
//        feed forward network with 2 layers -> 2048 neuron in input and 768 in output and use relu activation function in input [find non-linear relationship]



// --> **** 1 single pass of this -> provide general meaning of our i/p -> itne pe kuch ni bata payengai apan correct o/p
// --> **** repeat whole process for 96 times --> ki all info ajaye ki apan correct next word predict kar paye   


// --> **** let kisi ne sirf single word diya -> ex:- bank -> toh wo phir general word pe answer dega -> where we doposit withdraw money

// -------------------------------------------------------------------------
// --------------> kv catch :-

//                   for this last[bank] we have key:value both -> ****so store k-v
//                                       |         
// --> ex:                             [last]                 //////////////
//  today i withdraw my money from the bank          ------>  // LLM MODEL//   ------>  today i withdraw my money from the bank of            
//  today i withdraw my money from the bank of       ------>  //////////////   ------>  today i withdraw my money from the bank of baroda
//                                          [last]
//                                             |
//                            so why we calculate it again for last[of] -> use uper wale ka k-v here  

//                                                                                                       k-v  k-v k-v  k-v  k-v  k-v k-v k-v k-v
// -> 1st time toh sabke liye cal karna hoga k-v value then + karke store karlo then use in next time -> today i withdraw my money from the bank
// -> can't store query for last word -> last word ka toh apan ko pta hi hai
// -> **** since this is k-v catch -> ki 1st time wale ka k-v catch karke rakho har last ke liye ni find karo use karlo 1st time wala -> so this is -> k-v catch

// -------------------------------------------------------------------------


// --> positional embedding :- 
// -> ex:-    i sat by the river and went to withdraw money from the bank -> **** ab yaha pe river bhi hai and bank bhi hai so dono mai se kisko dekhe --> so position embedding ki baat ayi
// -> **** jo last wale ke pass hongai unko jyada ****weighted milengai ----> tabhi in gpt previous chat / bohot purani yad ni rehti usko new bs rehti hai yaad -> purana context bhul jata hai inko jyada weightage ni milta -> current walo ko jyada weighted milta hai so wo inko yaad rehna hai



// --------------------------------------------------------------------------


// --> multihead attention :-
// -> **** agar multihead attention ni hota toh ye process ko 400-500 baar karna padta -> jo abhi 96 baar karna padra hai
// -> whole process is sequential [1 ka i/p dushre ka o/p]
// -> so isme hm heads ko attention dete hai
// --> ex:                                  attention
//                                 |--|--|--|--|--|--|--|--|   512 vector embedding       
//                                 /         |             \      break it
//                                /          |               \ 
//  |--|--|--|--|--|--|--|--|       |--|--|--|--|--|--|--|--|   |--|--|--|--|--|--|--|--|   ......
//      /\  /\   /\   /\                   /\ /\ /\ /\             /\ /\   /\  /\ 

// --> **** ye sab parallel pe work karay hongai -----> work 96 baar pe hi ho jayega ----> so this is multihead attention

// ---------------------------------------------------------------------------


// ----> since itna sara transformer architecture hi hai 
// ----> **** real pe kisi ko ni pata kya hora hai -> har company bs try karri hai and experiment karke new theory deri hai samjhe
// ----> see transformer block --> diagram in pdf

