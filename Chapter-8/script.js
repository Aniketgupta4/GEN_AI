// 1) Vector 

// THINK -> how someone build recommendation system , youtube search system 

// RECOMMENDATION SYSTEM ---> kuch ko dekhe so wahi wahi show/recommend karta hai

// EXAMPLE : maine web dev course serach kara -----> so in result multiple things/suggestions aari hai ----> html,css,roadmap etc [so html,css thik hai per roadmap kyu aara maine toh sirf web dev search kara na]

// so yaha pe kya hora hai internal ?
// ----> solution in last 




// 2) ----------- AMAZON RECOMMENDATION SYSTEM WORKING WE UNDERSTAND (let 1 MILLION PRODUCT)----------------


 // A) First though principle :

// see image1 ----> kya hota hoga ki grouping karte hongai chizo ki ----> Ex: [apple,mango,banana,grapes....]
//               -> so is table ko manually banana pada hoga and if new product aya so phir se itne sare mai find karo ki new item kisme kisme ayega ----> time consuming + not automated

// ---->  [protein , milk , butter] , [apple , banana , mango]
// ----> **** suppose someone add in cart PROTEIN POWER then abhi apna present system not recommend BANANA too -> beacuse hmne toh protein ke sath banana add hi ni kiya hai  

// **** but both protein and banana belong to another categories na 

// **** but nowadays system are advance so present pe toh sab acha hai ----> Recommend karta hai ache se protein + banana


// -------> **** WALMART -> RECOGNIZE PATTERN -> beer and diper sath bohot buy horay hai FRIDAY ko ----> so in dono ko sath mai rakh diye in mall ----> and research pe pata laga ki friday ke weekend and log ghar se bahar ni nikalna chate so dono sell horay thay by [newly baby couples]


// --> since this thought principle fails -> not scalable not recommend banana with protein

// ------------------------------------------------



 // B) GRAPH BASED APPROACH (image2-3-4) :

// -> img2 -> at start bohot sare normal nodes pe items hai 
// -> img3 -> then jo jo ab sath mai buy hongai so connect it and assign weight bwt them and do update weight when product phir se sath mai buy ho toh
// -> img4 -> we also make table too from graph

// **** since graph is ready and when new_user add prod1 then from graph/table prod1 se jitne connected wale hai and with high weight recommend kara do user ko 
// ******** As new combination buy hongai so update kardo value ya new combination banra hai toh connection bana do and assign weight

// ----> LIMITATIONS :
//                    a) very big table and when new product introduce so add 1 new row and col ---> increase size (size issue)
//                    b) and best combination find karne mai 1 million mai too much time lagega by sorting (time issue)
//                    c) suppose same product with multiple company (A,B,C) and A is ban ---> so ab ye jo iska combination hai wo (B,C) ko recommend hi ni karra hai -> chiz toh same hai company change se kya hua --------> FAIL 


// ---------------------------------------


// C) =====> 


// ----> similar products ko sath mai rakho and assign number to it
// so kya karengai so item aya usme se -1 and +1 kare and recommned that item to and agar or items recommend karna hai toh -2 +2 kar diye thik 
// banana liye kisi ne so banana = 2 so 2-1 = 1 (apple) and 2+1 = 3 (grapes) recommend both


// EXAMPLE :
// apple : 1
// banana : 2
// grapes : 3
// ....
// ....
// protein : 200
// keratin : 201
// vitamin : 202
// ....
// ....


// ----> SIZE ISSUE SOLVE 2D TABLE TO 1D TABLE 

// -> BOUNDARY condition start + MANUALLY KARNA HOGA + new product last pe add karna hoga 
// -> **** combination bhi ni banray isme ab ki ----> BANANA + PROTEIN and all sirf prodcut ke uper niche wale bs ayegai
// -> too much issues but SOLVE SIZE ISSUE 

// ------------------------------------------------



// D) ----------- VECTOR -----------


// EXAMPLE : NETFLIX MOVIE RECOMMENDATION SYSTEM

// let kisi ne dhamal dekhi so next movie kya recommed karu ? 

// -> (img 5 - 2d view representation) -> similar movie ko 1 saath rakho --> categories karo 

// Any Movie ----> full comedy           comedy + action              comedy + reallife

// so kisi ne dhamal dekhi toh mai usko ab full comedy movies recommed karunga 
// (img 6) -> so mai ab plot karunga movies see img6 and jaisi movie hogi uske aass pass wali movies recommend kar dunga 

// ----> **** issue in this system -> Proper categories ni kar parai hai 


// ---------------------------------


// ==> **** Vector + multiple dimension comparision :

// **** 5D MODEL (img 7) ----> basically same chiz ko apan multiple level pe jake dekh ray hai 
// so for a single movie 5 things -> action comedy emotion romance realism
//                          kgf  :   [  5,      1,      5,      2       5]     // all are at multi level
//                          salaar : [  5,       1,      2,      1,      1]
//                          omg :    [  2,       4,      4,      1,      1]


// -> we can easily calculate relation between them by EUCLIDIAN DISTANCE and RECOMMEND EASILY 

// -> **** in real world multi dimension pe ye hota hai [ex-> 800 , 1346 dimension etc] --> so easily recommendation kar shakte hai
// -> **** so accuracy pe answer ayega ----> as jitna depth/dimension pe jayengai utna accuracy milega 


// **** since this all dimension ka khel is VECTOR 



// ------------------------------------



// EXAMPLE : maine web dev course serach kara -----> so in result multiple things/suggestions aari hai ----> html,css,roadmap etc [so html,css thik hai per roadmap kyu aara maine toh sirf web dev search kara na]

// so yaha pe kya hora hai internal ?

// **** -> solution -> since 1 vector create hoga --> and internally jo jo web dev course hongai unka alag se vector bane hote hi hai --> so multiple web dev wale hamare vector pe aa jayengai 
//                          [ - , - , - , -]               <--               [-]   [-]  [-]  [-]

// **** exact word search ni karna hai meaning match karna hai ----> example ----> js ki book dedo so --> js word main hai so focus on js

// -> kya hota hai when 1 video upload hui so yt uska title se (****meaning ko samjh ke ki title word -> meaning) usko ek vector pe add kar deta hai jis type/domain ka video hai thik / ya phir new vector of that domain bana deta hai ----> so when we search so same words ko ni milata uske menaing ko milata hai and add it in main final vector --> so we get multiple results


// **** -> neural networks ye vectors create karta hai we not need to do it manually and manually karne mai error + time taking hai 

// ----> se distance formula image 8 

