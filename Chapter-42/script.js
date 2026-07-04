//  RNN :-

// -> Recurrent neural network
// -> used for sequential and time series data


// -> ANN -> next word predict kar shakta tha --> problem :- input size fixed , weight blast




// -> RNN -> isme sequential pe dekhte hai chize ->

// ex:- the cat sat on the ____ [predict it]

//                              Wx                      w1                        w3                       w5                    w4 
//        w,b    neuron       output     neuron      output     neuron         output     neuron        output     neuron                      |----->    neuron  
// the -------> --------- -----------> ---------- -----------> ----------  -----------> ----------  -----------> ---------- ---------> vector ------->    neuron     ------> output
//                                         /\                     /\                         /\                     /\                         |----->    neuron  
//                                       Wy|                    w2 |                     w4  |                   w6 |
//                                        cat                     sat                         on                    the

// -> ******** ye acha way hai isme last pe o/p aya so ---> ab is o/p ke pehle ek neuron add kardo so wo or new i/p process kar payega and we get new output   -----> warna hmko pura again chalana padega from start se i/p agar or new words predict karana hai toh
// -> **** mtlab isme repitition ni karna padra hai samjhe dubara agar phir se continuation pe new word generate karana hai toh -----> bohot fast new word predict karta hai
// -> answer cache karke rakh ray hai so give fast o/p -> in O(1) time


//                              Wx                      w1                        w3                       w5                    w7       (new one)          
//        w,b    neuron       output     neuron      output     neuron         output     neuron        output     neuron       output     neuron             |----->     neuron  
// the -------> --------- -----------> ---------- -----------> ----------  -----------> ----------  -----------> ---------- --------->  ------------   vector |------>    neuron     ------> output
//                                         /\                     /\                         /\                     /\                        /\         /\   |----->     neuron  
//                                       Wy|                    w2 |                     w4  |                   w6 |                        w7|          | 
//                                        cat                     sat                         on                    the                       mat     (softmax)       


// ----> **** is last wale pe o/p and previous context store hoga ----> so agar bohot big i/p hua toh blast ho jayega
// ----> so use for words generation , blanks , recommendation pe 
// ----> long sentence generation pe ---> dikkat ayegi purana bhul jayega blast ho shakta hai 



// -> **** let each neuron is diff diff so sabko alag alag weight dene hongai ----> **** problem ye hai is method pe ki hame toh number of input ki length ni pata toh kaise decide karengai kitne neurons hongai so ---->


// ----> use recursion represent ------->

//                           b 
//      Output Wprev      --------- 
//             -------->  |_______|   ------> output
//                         /\      
//           --------------|
//               Wcurr              

// --> flow same hai answer kon fast lake dega --> uper wala



// --> **** in transformer we predict next word ----> ex: the cat sat on the ___ -> but isme wahi hai last wala piche walo dekhta hai and all --> so isme next word predict karne pe O(n) time lagta hai
// --> calculation in parallel but piche toh dekh ra hai and softmax apply kare --> so isme O(n) time lagra hai
// --> **** transformer is slow that RNN



// ----> **** let o/p chaiye 128 vector ka 
// ----> so 128 neurons hongai use
// ----> and each neuron having weight weight 256[128+128] + b <- prevcontext + lastword 
// ----> so total learning --> 128neuron * 256perneuronweight + 128bias
// ----> use tanh activation function -> [-1 , 1] ki range
// ----> a/c to i/p complexity -> use hidden layers



// ----> ******** isme issue hai -> RNN bohot purane walo ko bhul jara hai ----> so kuch aysa aye jo ****imp prev info ko yaad rakhe sabko ni in ****memory so lstm aya

// ******** in deep learning kisi ko kuch ni bs bolte rehte hai aysa ni aysa hora hai ----> actual kisi ko ni pata hai sab apni theory deray hai bs
// **** jaise in transformer pehle vector se similarity search karte thay per wo correct answer ni de paray thay ----> so iske baad queryweight , querykey , queryvalue wala concept aye samjhe ---> in future modify ho shakta hai kuch jyada accurate answer mila kisi se toh
// ******** let kisi ne formula bana diya ---> usko verify karne ki liye data large amount pe chaiye ---> so weight jannane ke liye model train karana padega ---> iske liye high gpus and all chaiye ---> iske liye paisa chaiye ----> so bohot big companies hi model bana ri hai -> and kuch open source kar deti hai ----> so normal log model ni bana paray hai
// -> **** you can cross question in deep learning too with anyone --> kyuki samne wala proof ni kar payega


// --------------> LSTM <-------------

// -> **** in lstm -> only imp prev info carry on in memory ---> so bohot pehle ki chiz bhi yaad rahe and acha se work kare correct o/p de


//                                      memory only imp info
// ----> the cat sat on the mat in  -----> [cat,sat,mat] c(t)
//                                             |
//                                             \/
//                                             h(t)

// **** is memory ke ander sirf imp info ayega and kuch time baad agar kuch faltu irrelevent info hai so isko remove kardo form memory ---> and agar kuch na imp hai or baki sab sahi hai toh kuch ni karo na insert na remove constant raho


//                                          memory only imp info
// ----> the cat sat on the mat in the   -----> [cat,sat] c(t+1)
//                                                   |
//                                                  \/
//                                                 h(t+1)


//                                                 memory only imp info
// ----> the cat sat on the mat in the evening  -----> [cat,sat,evening] c(t+2)
//                                                          |
//                                                          \/
//                                                         h(t+2)


// ******** correct word ke context pe answer nikalte hai








// ------------------------------------------- LSTM in detail ----------------------------------------

// -> **** in lstm -> only imp prev info carry on in memory ---> so bohot pehle ki chiz bhi yaad rahe and acha se work kare correct o/p de


// =============================================================================
// LONG SHORT-TERM MEMORY (LSTM)
// Complete Notes (From Scratch)
// =============================================================================


// =============================================================================
// WHY LSTM WAS CREATED?
// =============================================================================

// Before LSTM, people used RNN (Recurrent Neural Network).

// Problem:
//
// RNN remembers previous words,
// but as the sentence becomes longer,
// it starts forgetting old information.

// This happens because of
//
// Vanishing Gradient Problem.
//
// Therefore RNN cannot remember long-term dependencies.


// Example

// "The movie which I watched yesterday with my friends was really amazing."

// // When predicting the word "amazing",
// // RNN may already forget
// //
// // "movie"



// // =============================================================================
// // REAL LIFE EXAMPLE
// // =============================================================================

// // Rahul woke up.
// // He brushed his teeth.
// // He ate breakfast.
// // He went to college.
// // He attended classes.
// // He returned home.
// // He slept.

// // Question

// Who returned home?

// Answer

// Rahul

// // Human brain remembers Rahul
// // throughout the sentence.

// // RNN struggles with this
// // for long sequences.

// // LSTM solves this problem.


// // =============================================================================
// // MAIN IDEA OF LSTM
// // =============================================================================

// // LSTM contains

// 1. Cell State
// 2. Hidden State
// 3. Forget Gate
// 4. Input Gate
// 5. Output Gate

// // Cell State

// Long-Term Memory

// // Hidden State

// Current Output


// // =============================================================================
// // CELL STATE
// // =============================================================================

// // Cell State

// Ct

// // Think of it as

// Long notebook

// // It carries important information
// // throughout the sequence.

// // Almost every time step
// // receives previous Cell State.


// // Example

// C0

// ↓

// C1

// ↓

// C2

// ↓

// C3

// ↓

// C4

// ↓

// C5


// // Information flows almost directly,
// // making long-term memory possible.


// // =============================================================================
// // HIDDEN STATE
// // =============================================================================

// // Hidden State

// ht

// // Hidden State is

// Current output

// // Every word produces

// Current Hidden State

// ↓

// Passed to

// 1. Next LSTM Cell
// 2. Final Prediction


// // =============================================================================
// // COMPLETE LSTM STRUCTURE
// // =============================================================================

// Previous Hidden State

// ht-1

// ↓

// Previous Cell State

// Ct-1

// ↓

// Current Word

// xt

// ↓

// Forget Gate

// ↓

// Input Gate

// ↓

// Candidate Memory

// ↓

// Update Cell State

// ↓

// Output Gate

// ↓

// New Hidden State

// ht


// // =============================================================================
// // STEP 1
// // FORGET GATE
// // =============================================================================

// // Question

// "What should I forget?"

// // Formula

// Ft

// =

// σ(Wf[ht−1, xt] + bf)

// // Output

// 0 to 1

// 0

// Forget completely

// 1

// Keep completely


// // Example

// Sentence

// "I live in Delhi.
// Now I live in Mumbai."

// // After reading

// Mumbai

// // Forget Gate says

// Forget

// Delhi

// Keep

// Mumbai


// // =============================================================================
// // STEP 2
// // INPUT GATE
// // =============================================================================

// // Question

// "What new information should I store?"

// // Formula

// It

// =

// σ(Wi[ht−1, xt] + bi)

// // Output

// 0 to 1

// 1

// Store

// 0

// Ignore


// // Example

// Sentence

// "The weather is rainy."

// // Store

// Rainy

// because important.

// Ignore

// "The"

// because not important.


// // =============================================================================
// // STEP 3
// // CANDIDATE MEMORY
// // =============================================================================

// // Candidate Memory

// C~

// // Formula

// tanh(Wc[ht−1, xt])

// // It creates

// Possible new information

// to be stored.


// // Example

// Sentence

// "I got placed in Microsoft."

// // Candidate Memory

// Placed

// Microsoft

// Career Success


// // =============================================================================
// // STEP 4
// // UPDATE CELL STATE
// // =============================================================================

// // Formula

// Ct

// =

// Ft × Ct−1

// +

// It × C~


// // Meaning

// Old Memory

// ↓

// Forget unnecessary part

// +

// Add new important information


// // Example

// Old Memory

// Delhi

// ↓

// Forget Gate

// 0

// ↓

// Removed

// +

// Mumbai

// ↓

// Input Gate

// 1

// ↓

// Stored


// // New Cell State

// Mumbai


// // =============================================================================
// // STEP 5
// // OUTPUT GATE
// // =============================================================================

// // Question

// "What should I output?"

// // Formula

// Ot

// =

// σ(Wo[ht−1, xt])

// // Hidden State

// ht

// =

// Ot × tanh(Ct)


// // Hidden State becomes

// Current Output


// // =============================================================================
// // COMPLETE FLOW
// // =============================================================================

// Previous Memory

// ↓

// Forget Gate

// ↓

// Remove unnecessary information

// ↓

// Input Gate

// ↓

// Store useful information

// ↓

// Update Cell State

// ↓

// Output Gate

// ↓

// Current Output

// ↓

// Next LSTM Cell


// // =============================================================================
// // EXAMPLE
// // =============================================================================

// // Sentence

// "The tea was too hot so he waited."

// // Word

// waited

// // To understand

// waited

// // LSTM remembers

// tea

// hot

// too

// // Therefore

// waited

// gets proper meaning.


// // =============================================================================
// // WHY THREE GATES?
// // =============================================================================

// // Forget Gate

// Deletes unnecessary information.

// // Input Gate

// Stores important information.

// // Output Gate

// Decides what to send forward.


// // =============================================================================
// // MEMORY ANALOGY
// // =============================================================================

// // Imagine

// Your Brain

// Forget Gate

// ↓

// Delete useless memories.

// Input Gate

// ↓

// Store important memories.

// Output Gate

// ↓

// Speak only required information.


// // =============================================================================
// // VANISHING GRADIENT
// // =============================================================================

// // RNN

// Word1

// ↓

// Word2

// ↓

// Word3

// ↓

// Word4

// ↓

// Word5

// ↓

// Word6

// ↓

// Word7

// ↓

// Prediction

// // Gradient becomes smaller and smaller.

// // Earlier words

// Forgotten.


// // LSTM

// Cell State

// ↓

// Flows almost unchanged.

// ↓

// Gradient survives.

// ↓

// Long-term memory possible.


// // =============================================================================
// // WHY LSTM WORKS BETTER THAN RNN?
// // =============================================================================

// // RNN

// Small memory

// ↓

// Forget old words.


// // LSTM

// Large memory

// ↓

// Remembers long sequences.


// // =============================================================================
// // WHERE IS LSTM USED?
// // =============================================================================

// // Machine Translation

// English

// ↓

// Hindi


// // Text Generation

// Next Word Prediction


// // Speech Recognition

// Voice

// ↓

// Text


// Sentiment Analysis

// Movie Review

// ↓

// Positive

// Negative


// // Chatbots

// Conversation


// Time Series Prediction

// Stock Prices

// Weather Forecast

// Electricity Demand


// Handwriting Recognition

// Image

// ↓

// Characters


// =============================================================================
// ADVANTAGES
// =============================================================================

// Remembers long-term dependencies.

// Solves vanishing gradient.

// Better than RNN.

// Works well on sequential data.

// Can learn context.


// =============================================================================
// DISADVANTAGES
// =============================================================================

// Slow training.

// Large number of parameters.

// Sequential computation.

// Cannot fully parallelize.

// Transformers are much faster.


// =============================================================================
// RNN vs LSTM
// =============================================================================

// RNN

// Simple

// Fast

// Short Memory

// Forget long sentences

// Vanishing Gradient


// LSTM

// Complex

// Slower

// Long Memory

// Remembers long sentences

// Solves Vanishing Gradient


// =============================================================================
// LSTM vs Transformer
// =============================================================================

// LSTM

// Processes

// One word at a time.

// Cannot fully parallelize.

// Long training time.

// Good for small sequential tasks.


// Transformer

// Processes all words together.

// Highly parallel.

// GPU friendly.

// Much faster.

// Used in

// GPT

// BERT

// Gemini

// Claude

// Llama


// =============================================================================
// INTERVIEW DEFINITIONS
// =============================================================================

// LSTM

// Long Short-Term Memory

// is an improved version of RNN that uses
// Forget Gate, Input Gate, and Output Gate
// along with Cell State to remember
// long-term dependencies while solving
// the vanishing gradient problem.


// // Cell State

// Long-term memory carried throughout
// the sequence.


// Hidden State

// Current output of the LSTM cell.


// Forget Gate

// Decides what information should be removed
// from the previous memory.


// Input Gate

// Decides what new information should be stored.


// Output Gate

// Decides what information should be sent
// to the next time step.


// =============================================================================
// MEMORY TRICK
// =============================================================================

// Forget Gate

// "What should I forget?"

// // Input Gate

// "What should I remember?"

// // Output Gate

// "What should I say?"

// // Cell State

// "My long-term memory."

// // Hidden State

// "My current answer."


// =============================================================================
// COMPLETE PIPELINE
// =============================================================================

// Input Sequence

// ↓

// Embedding

// ↓

// LSTM Cell 1

// ↓

// LSTM Cell 2

// ↓

// LSTM Cell 3

// ↓

// ...

// ↓

// Last Hidden State

// ↓

// Fully Connected Layer

// ↓

// Softmax

// ↓

// Prediction


