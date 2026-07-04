// Introduction to CNN

// -> convolutional neural network
// -> working on images,videos


// -> ex:-               ////image////  
//                       //    7    //
//                       /////////////

// -> detect kya likha hai is image pe ?

// -> apan rule ni bana shakte ----> so we use neural network ok
// -> first thought :- normal wahi ann wala approach ->

// ****  input pe kuch neurons -> hidden layer pe kuch neuron[apply activation function handle non-linear relationship and find hidden patterns] ->  output layer pe 10 neuron[0-9]   ->  apply softmax probability ayi jiski jyada wahi answer



// -> let image is black and white

//           ________________ 
//           |  |  |  |  |  |   <- 0-255 [1 pixel represent] 
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


// -> input ko kaise doge image ko ?
// -> image ko pixels pe convert karke dedo image i/p ---> so give 784 pixels in i/p


// -> kya yaha pe weight burst ni hoga kya as image is too complex and have multiple dimensions ?
// -> ha yr baat toh sahi hai -> bohot sare neurons lagengai -> weight burst hoga pakka chalo thik hai


// -> **** image ko dekhke kuch patterns yaad karraa hoga --> ki 0-9 tk kaise banengai -> sidha line ayega is block pe and all


// -> **** har ek image alag alag dim ki hoti hai so sabko i/p alag alag hoga so kaise i/p doge ab
// -> koi si image right side pe hoti koi left side pe hoti hai , size small big and all --> so bohot ache se model train karana padega
// -> **** so during training --> apan ko har ek type ki image dikhana padega -> position shift wali , small big size image , and all <----------------- issue is this ANN ye sab chiz ratta mar lega ----> shifting and all ----> so ANN fails in image
// -> **** means bohot choti choti chize changes hori hai isko learn karna chaiye but ye ratta marra hai 
// -> **** ye ratta marra hai --> toh new i/p aya toh ye toh fail ho jayega
// -> **** ye kar shakta hai 1 basic serious yaad karlo ki position ka diff ayega , and all ka learning karra hai tab so sahi hai ---> but ann apna ratta marra hai so its fails


// Problem :-
// -> **** so aysa system kaise banaye 1) i/p ka size [variable size i/p kaise pehchane]  2) position samjhe 1 baar but baar baar ratta ni mare -> [0-9 and all ka]


// --> tackle it :-    when we design transformer -> i/p ke har 1 ke pass 768 ki vector embedding hogi -> so apan har 1 ko 3 chiz pe wo karte thay -> wk,wq,wv -> same weights use for all one      <---- ki weight ka outbrust na ho is liye ye sab kare

// --> **** same strategy apply here --> 1 sath puri image ko process na karu -> chote chote pattern ko recognize karo then combine these all small get big one
//
//           ----------
//           |  |  |  |
//           ----------
//           |  |  |  |       <------- 9 weights
//           ---------- 
//           |  |  |  | 
//           ----------  3X3

// --> so ab isme se big wale ko wo karao -> ki ye itna part big wale ka yaad rakhe -> ki itne chote wale ka big part kitna cover karra hai
// --> then ayse hi puri image pe slide karao is chote wale ko in big wale pe

// --> **** so isme se wo i/p burst wala problem solve hogya and position kahi bhi po image ki wo bhi solve -> ye yaad rakhega ki kaha pe konsa part aya hai image ka ye chota wale mai
// --> ***************** so weight bhi same hongai for all 9 weights -> kyuki apan ek baar pe 9 pixel dekh ray hai for each one -> so same weight use hongai


// --> **** so ye chota wala big wale pe traverse karega and small small o/p dega [blank hai,vertical line , horizontal line, curve] --> so combine all small o/p get full o/p

// --> diagram is like ANN --> pass small small i/p[3X3] to all neurons --> pass through multiple hidden layer neurons process these i/p --> and at o/p layer neurons give o/p


// --> **** so ab kitni bhi big image ho mai handle kar lunga easily 



// -----> **** given image


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
//              image 26X26                      



// -> apply this small filter in image so we get o/p pe 26X26 matrix ------> then again pass this to hidden layer -----> get 24X24 o/p again pass to hidden layer ----> get 20X20 o/p ----> ........ 
// -> is type se multiple hidden layer se pass karo then we get compressed image --> pass pass image ke ander ki chize aa jayengi
// -> so or ache se ye identify kar payega image pe kya hai --> and we get correct o/p


