// CNN INDEPTH :-

// -> ANN answer de shakta hai images ke liye bhi -> per weight brust ho shakta hai and many issues
// -> ANN model ko jyada data dena padega for training -> it is not flexible
// -> ex: 28X28 ki image hai ANN model manage kar liya chalo per agar 60X60 ki image diye toh syd manage ni kar paye ho shakta hai correct answer ni de paye iske liye -> isi liye jyada training data chaiye ya 60X60 ke liye dushra model train karo phir
// -> ek kaam kar shakte hai -> 3082X3084 sabse big image size hai ispe model train kardo -> but 90lakh i/p each neuron pe ayengai -> so its not efficient method -> weight brust ho jayega -> but phir bhi kaise karke kardiye toh answer milega but wahi -> time jyada lagega during training and cost jyada and all


// -> // -----> **** given image


//           ________________ 
//           |  |  |  |  |  |                      
//           ----------------
//           |  |  |  |  |  |    
//           ----------------                      
//           |  |  |  |  |  |
//           ---------------- 
//           |  |  |  |  |  |
//           ----------------
//           |  |  |  |  |  |
//           ---------------- 
//           image 28X28 = 784

//           ----------
//           |  |  |  |      <----- apply this filter in image
//           ----------
//           |  |  |  |       <------- 9 weights
//           ---------- 
//           |  |  |  | 
//           ----------  3X3

//                |
//                \/
                   
//           ----------------
//           |  |  |  |  |  |    
//           ----------------                      
//           |  |  |  |  |  |               <---- output
//           ---------------- 
//           |  |  |  |  |  |
//           ----------------
//           |  |  |  |  |  |
//           ---------------- 
//              image 26X26                      


// again apply filter ,

//           ----------
//           |  |  |  |
//           ----------
//           |  |  |  |       <------- 9 weights
//           ---------- 
//           |  |  |  | 
//           ----------  3X3

//                |
//                \/
                   
//           ----------------
//           |  |  |  |  |  |    
//           ----------------                      
//           |  |  |  |  |  |               <---- output
//           ---------------- 
//           |  |  |  |  |  |
//           ----------------
//           |  |  |  |  |  |
//           ---------------- 
//              image 24X24                      

// .........

// ---> *** ayse karke filter apply karo in images pe toh inka size chota hota jayega -> and info hai in image wo pass pass aajayengi --> so easily bata payega model ki ye image kis chiz ki hai
// -> **** ye karne se info kam hori hogi image ki -> ok hori hogi
// -> but info pass pass ari hai so prediction easy hori hai and problem solve hori hai weight brust ki ye bhi dekho -> toh sahi hai chalo

// -> **** this whole problem is like -> divide and conquer -> ki image ko small small pe karo get small solutions and phir combine kardo so get final answer

// -> 1st layer pe kitne neuron lengai --> batao ?
// -> multiple neurons hongai and each one do individual work -> koi alag chiz batayega koi alag batayega [hori line,vert line,curve,etc] -> so sabki 9 weights hi milengai thik




// --> see original diagram -> in pdf 


 
//                      |-------------------1st----------------|               |------------------2nd------------------| ........  ---> size chota hote jata hai conv_layer and pooling ki as move left to right --->
// ---->   i/p   ---->    conv_layer           ---->     pooling      ---->        conv_layer    ---->     pooling        --------------->          
//       28X28X1       32 filters + 32B                                           **** multiple cov_layer + pooling   
//                  32 filters is 32 neurons                                           combinations are there ki
//             har 1 neuron alag alag chize dekhegi                                  26X26X32 -> 24X24X32 -> 22X22X32
//       means yaha pe 32 parallel work horay hai samjhe                              ayse reduce hote rahe and we get
//               9*32+32 = 320 ki learning hui                                            compressed final image
//    hit and trail chalta hai 32 filters inc dec a/c to exp
//                     26X26X32



// -> pooling -> **** con_layer pe bohot sari info hogyi -> 26X26X32 ka so apan direct next layer ko pura i/p ni de dengai --> kyuki phir se ek sath itna sara 26X26X32 i/p doge toh computation legega jyada so
//            -> conv1 -> 32 filters * 3X3X1 = 288
//            -> Conv2 -> 64 filters * 3X3X32 = 18432
//            -> ......
//            -> we give 3X3X32 pass in next layer not all at 1 time --> 288 weight learn karega ye --> it means wahi choti wali matrix and 32 parallel work hora hai wo 32 filters image ki dim piche wale wo yaad agya na wahi --> and har next conv pe inc hoga --> but isme bhi sabke liye karengai toh bohot jyada computation lagri hai --> so pooling ka concept aya 
// -> **** so in pooling we apply 2X2X32 filter -> and take ****max value[most imp thing] for this 2X2X32 -> do it for all -> so we get -> 13X13X32 <- so computation less hui na and we get most imp information from this -> and this is not sliding window pehle jaise
// -> **** but thoda bohot loss bhi hota hai data -> in pooling
// -> ******** pehle wo sirf ye bata ra hoga ki -> 1 pixel pe horizontal line , 2 pixel pe vertical line hai ayse ----> **** but in pooling wo ayse combined result batayega ki is 1 pixel pe hori+verti image hai and all is type se samjhe bohot img chiz batayega wo bhi pichli 32 layer ka sabka analyze karke
// -> **** so ye jo 32 block hai na inko parallel process kara ray hai ---> to get most imp info from that con_layer

// ******** -> jyada info loss ni hoti hai ---> pehle apan khud se inc karte hai [overlap hote hai na] in conv_layer ---> then compress karte hai in pooling ------> so overrall jyada info loss ni hoti hai





// ----> now apply flatenning ---> and then apply ANN approach apply softmax to get probability and get final o/p



// ---------------------------------------------------------------------------------------------------

// ----> bhai 1X1X128 hai ---> toh pooling ho jayegai easily ok
// ----> ******** agar koi big img thi and at last we get 50X50X128 --> then how to convert it in pooling by taking avg of these 50X50 ka



// ---> 

// =============================================================================
// Global Average Pooling (GAP)
// =============================================================================

// Suppose CNN ke end me feature map aaya:
//
// 50 × 50 × 128
//
// Meaning:
//
// Height  = 50
// Width   = 50
// Channels = 128
//
// Har channel ek feature detect kar raha hai.
//
// Example:
//
// Channel 1 -> edges
// Channel 2 -> curves
// Channel 3 -> eyes
// ...
// Channel 128 -> complex object feature


// =============================================================================
// Problem
// =============================================================================

// Softmax ya Fully Connected Layer ko direct
//
// 50 × 50 × 128
//
// dena possible nahi hai.
//
// Flatten karoge:
//
// 50 × 50 × 128
//
// = 320000 values
//
// Agar 1000 classes hain:
//
// 320000 × 1000
//
// = 320 Million weights
//
// Bahut jyada computation
// Bahut jyada memory
// Overfitting ka chance bhi badh jayega.


// =============================================================================
// Solution : Global Average Pooling
// =============================================================================

// Har channel ka average nikal do.

// Example

// Channel 1

// 50 × 50

// [
//  2 3 1 ...
//  5 8 4 ...
//  ...
// ]

// ↓

// Average

// (2 + 3 + 1 + 5 + 8 + 4 + ...)
// /2500

// ↓

// 0.72


// Channel 2

// 50 × 50

// ↓

// Average

// ↓

// 1.84


// ...


// Channel 128

// 50 × 50

// ↓

// Average

// ↓

// 0.31


// =============================================================================
// Final Output
// =============================================================================

// Before GAP

// 50 × 50 × 128

// ↓

// Global Average Pooling

// ↓

// 1 × 1 × 128

// or simply

// [128 values]


// Instead of keeping all 2500 values of one channel,
// we keep only ONE representative value (its average).


// =============================================================================
// Visualization
// =============================================================================

// Before

// Channel 1

// 50 × 50

// □□□□□□□□□□□□
// □□□□□□□□□□□□
// □□□□□□□□□□□□
// ...
// □□□□□□□□□□□□

// ↓

// Average

// ↓

// 0.72


// Channel 2

// 50 × 50

// □□□□□□□□□□□□

// ↓

// Average

// ↓

// 1.84


// ...


// Channel 128

// 50 × 50

// ↓

// Average

// ↓

// 0.31


// Final Vector

// [0.72, 1.84, ..., 0.31]

// Length = 128


// =============================================================================
// Why Average?
// =============================================================================

// CNN ka last layer mostly ye batata hai
// ki koi feature image me kitna strongly present hai.
//
// Hume exact location itni important nahi hoti,
// bas feature present hai ya nahi ye important hota hai.
//
// Isliye har channel ka average le lete hain.


// =============================================================================
// Example
// =============================================================================

// Dog classifier

// Last feature maps

// 50 × 50 × 128

// ↓

// Channel 17
// (Ear detector)

// Average = 0.91

// ↓

// Ear strongly present


// Channel 45
// (Tail detector)

// Average = 0.83

// ↓

// Tail strongly present


// Channel 90
// (Car wheel detector)

// Average = 0.02

// ↓

// Almost absent


// Final vector

// [0.91, 0.83, ..., 0.02]

// ↓

// Fully Connected Layer

// ↓

// Softmax

// ↓

// Dog (99%)


// =============================================================================
// Memory Saving
// =============================================================================

// Without GAP

// 50 × 50 × 128

// ↓

// 320000 values


// With GAP

// 1 × 1 × 128

// ↓

// 128 values


// Reduction

// 320000

// ↓

// 128

// Around 2500× fewer values
// Much less computation
// Much less memory
// Less overfitting


// =============================================================================
// One-Line Interview Answer
// =============================================================================

// Global Average Pooling computes the average of every feature map
// independently, converting an H × W × C tensor into a 1 × 1 × C tensor.
// It drastically reduces the number of parameters while preserving
// the presence of learned features.

// ---------------------------------------------------------------------------------------------------