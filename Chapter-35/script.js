// Problem statement regards -> Multiclass classification 

// -> Dataset -> placement_ data 


// --> to add non-linearity in model use relu activation function



// --> 1) can we build our own llm ?

// -> no we cant build our own llm because it requires a lot of data and computational resources.
// -> bohot paisa lagega we cant afford it.
// -> Instead, we can use pre-trained models and fine-tune them for our specific task. 

// --> Transformer , attention all you need  


// --> aysa model banana hai jise kuch bhi puche uska answer de -->
// --> how to train the model , how we get training data [both input and output require to train the model] ?
// --> possible ni hai as a human -> ki khud se question frame karo answer dudho --> time,cost --> ni kar shakte khud se
// --> data present hai bohot sara , bohot place pe internet and all pe but sahi se ni hai --> so kya karo sab jagay se data utha lo jo mile -> webscraping se --> thik hai per but it is not legal so fail 
// --> **** so kya karo aysa model banao ki jo next word ko predict kare --> aysa model banao --> so no human require --> model khud se next word ko predict kare --> toh kya karo sara data internet se le aao --> apan isse train karlengai model ko
// -> labelling :-
//          input        |     output
//      capital          |       of
//      capital of       |      india
//     capital of india  |       is
//  capital of india is  |     newdelhi
//        ....


// --> so let 1 neural network hai --> training ke liye ANN use --> how to train the model ?
// --> we cant give input to model in text format --> convert it into numerical format  ----> so concept of TOKENIZATION comes into picture --> so we have to convert text into numerical format --> so we can use tokenization for this purpose
// --> 50k words -> assign each word a unique number ok 
// --> so -->
// --> capital -> 1
// --> of -> 22
// --> india -> 3
// --> is -> 486
// --> newdelhi -> 52

// --> tokens assign ho gaye to words --> 
// --> so 50k [neurons] --> 50k neurons in output layer --> [by softmax] so probability show hogi 50k words ka next words ki probablity hoga jyada wale ko choose karlo

// --> **** but gpt har bar alag alag word generate karta hai alag alag answer deta hai --> so har baar high probablity wale ko ni uthana hai --> kabhi 2nd highest 3rd highest wale bhi lo tab diff diff answers milengai samjhe

// --> so model will predict next word based on previous words --> so model will learn the pattern of language and generate text accordingly



// --> **** data --> token --> neural hidden layer --> o/p 50k neurons --> softmax --> probability of next word --> choose the word with highest probability --> add it to input and repeat the process to generate text

//      data               neurons          hidden layer         output layer
//
//    capital:100            ----                 ----               ----
//          
//     of:200                ----                 ----               ----
//
//     india:500             ----                 ----               ----
// 
//                           ----                 ----               ----    


// ----> kya ye sahi answer dega NUMBER/token PE CONVERT KARNE KE BAAD ?
// --> nahi nahi nahi


// ----> **** why token convert it into vector embedding ab ?
// -> **** definition of nn learn -> number pe convert kardiya -> and nn ko diya and inka kaam hai input and output ke bich hidden relation find karna jo human ni find kar shakte --> hame samjh ni ayega per nn samjh jayega by weight bias update and all karke thik so isko sab samjh ajana chaiye and correct answer dena chaiye --> so why we do vector embedding ?
// -> **** number/token pe convert kar diya ok -> and nn ko input and output ke bich relation find karna hai ok --> but number/token pe convert karne se nn ko relation find karna mushkil ho jayega usko kuch samjh ni ayega --> **** so we have to convert number into vector embedding --> so that nn can easily find the relation between input and output --> so we can use embedding layer for this purpose

// --> number/token toh de diye but why vector embedding ?
// -> ******** kuch bhi ****meaningless data hai thik and inko token pe convert kar diye ****randomly --> so nn kaise relationship find karega is meaningless data ke token/number ke bich samjhe ye dikkat hai 

// --> **** so kuch aysa chiz chaiye --> jo in data ke meaning ko hold kare --> that is embedding 

// --> **** text --> token[assign random num to words b/c it is label] --> vector embedding [2 words/chizo ke bich kya relation hai] --> neural network --> output layer --> softmax --> probability of next word --> choose the word with highest probability --> add it to input and repeat the process to generate text

// --> kya ye possbile hai vector embedding khud se generate ho jaye ?
// -> yes possible hai but it requires a lot of data and computational resources so we can use pre-trained embedding models like word2vec, glove, fasttext etc. and fine-tune them for our specific task

// --> **** but ye embedding ko ****random ni kar shakte kyunki ye embedding ka kaam hai ki ye words ke bich relation ko hold kare so similar words ke embedding similar hoga and dissimilar words ke embedding dissimilar hoga


// --> tell as a human how to know kisi new chiz ka meaning kya hai ?
// -> ******** word ka meaning ni pta --> **** per agar us word ke surroundings ka pta lag jaye --> to us word ka meaning samjh ajata hai --> so similarly embedding bhi yehi kaam karta hai ki words ke surroundings ke basis pe uska meaning samjhata hai --> context mil jayega apan ko and meaning samjh aa jayega
// -> **** human brain ke andar already kuch concepts hai --> jo ki words ke bich relation ko hold karte hain --> isliye jab hum kisi new chiz ko dekhte hain --> uska meaning us concepts ke saath associate hota hai --> similarly embedding bhi ye same concept hold karta hai --> jo words ke bich relation ko represent karta hai

// --> ex :-   wug  -> meaning ? -> by read this wug is dog 
// -> a stray wug followed me all the way to near market
// -> the wug is barking loudly at the strangers 

// --> vector : 768 
// --> so itna sara text hai thik hmko sirf vector embedding nikalna hai uske liye --> so wug ane ka probability 0.7 hai thik so apan ko vector kaha se milega 768 ? 
// --> ******** last layer se pehle wale pe 768 neurons rakh do --> then 50k neurons hai at last --> so 768 wale wale ka o/p 50k pe i/p jara hai so yahi 768 wale vector hue hai contribute karray hai ki wug ka answer kya ayega  


// --> **** what we will give input to model --> sentence toh ni de shakte and tokens meaningless hai toh ni de shakte -> kya de input pe batao ?
// --> next class 

