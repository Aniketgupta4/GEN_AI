// ----> BY CHATGPT 

// --> -(YLOG(P)+(1-Y)LOG(1-P))
// --> W1_NEW = W1_OLD + N * (Y-P) * X

// ----> BY ROHIT BHAIYA 

// --> -(YLOG(P)-(1-Y)LOG(1-P))
// --> W1_NEW = W1_OLD + N * ERROR * INPUT 


// --> GPT SAID BOTH FORMULA ARE CORRECT --> IT'S CAN'T PROVE WRONG TO ROHIT BHAIYA FORMULA
// --> **** BUT IN ROHIT BHAIYA FORMULA --> THEIR IS EDGE CASE SO FORMULA FAILS SOMETIME


// --> **** EDGE CASE FAILS IN ROHIT FORMULA :- [FOR 99% CASE ROHIT FORMULA IS FAIL BUT FOR 1% BOHOT BEKAR HAI SO ISSUE HAI FOR 1%]
// --> ROHIT WALA BOHOT ACHA WORK KAREGA THIK FOR 99% CASE U CAN USE IT 
// --> LOOP HOLE --> LOG(0) -> INFINITE <- AYEGA YE DIKKAT HAI BS --> BAKI SAB KE LIYE ACHA WORK KAREGA 
// --> **** AND ORIGINAL FORMULA PE LOG USE HI NI KARRA SO INFINITE KA DIKKAT NI HAI NO LOOP HOLE HERE 
// --> APNA METHOD THIK HAI NORMAL INC KARO DEC KARO EK DAM SE NI INC DEC KARO YE APAN JANTE HAI THIK OK --> WORK EVERYWHERE OK BUT WAHI LOG(0) KE CASE PE INFINITE YAHI BS ISSUE HAI 1 EDGE CASE FAILS 
// --> AS HUGE JUMP NI HAI --> B/C NOISE HOTE HAI DATA PE TOH --> APNE PE JUMP NORMAL HAI TOH YE BHI THIK HAI NO ISSUE 
// --> OUR FORMULA FAILS FOR LOG(0) AND LOG(0.000001) BOHOT PASS 0 WALI VALUES KE LIYE FAIL HORA HAI THIK 
// ----> **** EXCEPTION LELO IN OUR METHOD KI 0 KE LIYE NI KARO BAKI APNA MSG SAHI HAI THIK WORK KAREGA 99% 


// -> **** WHY/HOW LOSS FUNCTION IS +VE ALWAYS AND WHY CALCULATE LOSS FUNCTION ? --> 
// -> GRADIENT = DW/DT --> CHANGE IN WEIGHT KI LOSS LESS HO 

// -> WHY CALCULATE LOSS FUNCTION JAB FORMULA PE USE NI HAI TOH KYU CALCULATE KARU MAI LOSS FUNCTION KO ?
// --> LOSS = -(YLOG(P)+(1-Y)LOG(1-P))
// --> W1_NEW = W1_OLD + N * (Y-P) * X

// --> WHY OUR METHOD CORRECT --> WHEN 5% WRONG DATA THEN OUR FORMULA FAIL AND WHY CALCULATE LOSS FUNCTION ?
// --> EPOCH --> EX: 1LAKH DATA HAI SO 1000 DATA TRAIN KARRAY HAI IN 1 EPOCH THIK 
// --> KYA HAI KI 0-100 CHANGES HUE BUT 100 SE 1000 TK KUCH CHANGES NI HUE
// **** --> SO LOSS FUNCTION BATATA HAI KI ACTUAL ANSWER SE AP KITNE DUR PE HO --> AFTER 1 EPOCH WE CALCULATE LOSS THEN 2 EPOCH WE AGAIN CALCULATE LOSS SO PATA LAGTA HAI KI LOSS LESS HORA HAI KI NI SAMJHE 
// **** --> SO LOSS +VE ALWAYS B/C --> TAKI MAI CALCULATION KAR PAAO KI ORIGINAL ANSWER SE KITNA DUR HU --> +VE -VE +VE -VE 0 SO CALCULATE NI KAR PAYE ORIGINAL SE O/P SE KITNA DUR HU --> MODEL IMPROVE NI KARRA HAI SO EPOCH NI CHALO NA --> AND SO ISI LIYE +VE HOTA HAI LOSS FOR CALCULATION AND SAB 0 NA HO JAYE AND FALTU EPOCH FALTU NA CHALAYE APAN THIK  

// --> **** LOSS SE ISSUE NI HAI -VE +VE --> EPOCH SE MATLAB HAI SAME DATA PE TRAIN KARNA AND MODEL PERFORMANCE SAHI NI HORI TOH AND FALTU KA COMPUTATION POWER LAGRI HAI SO ISSE BACHNA HAI 

// --> SO WE USE AB ORIGINAL GPT METHOD OK 


// -----CONCLUSION--------------------------------------------------------------------------------------------------

// -> Formula ComparisionOriginal (Correct) Formula: $-(Y \log(P) + (1-Y) \log(1-P))$Kyun? Ye Cross-Entropy hai. Perfect mathematical distance batata hai.
//    Rohit Bhaiya Formula: $-(Y \log(P) - (1-Y) \log(1-P))$Issue: Beech mein minus sign ki wajah se logic galat ho jata hai. Sirf 99% cases mein chalega, 1% mein fail hoga.

// -> Loss Function Kyu Calculate Karein?
// Early Stopping: Agar Loss kam nahi ho raha, toh training rok do (Time aur Power bachegi).
// Tracking Progress: Loss batata hai ki model kitna "galat" hai.
// No Cancellation: Loss hamesha Positive hota hai, taaki positive/negative errors aapas mein cut na jayein aur model ki asli performance pata chale.

// -> Final Pro-Tip (Edge Case Fix)
// log(0) ka issue: Kabhi bhi direct log(P) mat likho.
// Code mein ye use karo: log(P + 1e-9)
// Isse 0 value kabhi nahi aayegi, error nahi aayega, aur model stable rahega.
 
//Conclusion: Original formula use karo + 1e-9 wala fix lagao. Kaam ho jayega!

// -------------------------------------------------------------------------------------------------------




// --> NORMALIZATION :- 

//  DSA     |   IQ    |    PROJECT    |   ATTENDENCE
//  500         100           4               70

// LET W1=0.2 W2=0.3 W3=0.4 W4 = 0.1 B=2

// O/P = W1X + W2Y + W3Z + W4K + B   <-   CALCULATE KARO O/P 10 SE TOH UPER HI AYEGA NA 

// **** SIGMOID KI EK PROPERTY --> SEE GRAPH -> 5 SE UPER GYA SO 0.99999 KE AROUND VALUE CHALI JAYEGI BUT NOT TO 1 --> MEANS MODEL LEARN KARNA BAND KAR CHUKA HAI -> AND MODEL BOHOT SLOW CALCULATE/LEARN KAREGA AND WEIGHT UPDATE HOGA TOH BOHOT SLOW UPDATE CHANGE HOGA 

// --> **** APAN HAR VALUE KO NORMALIZE KARDE --> [KI EK LIMIT PE HI NA DSA IQ PROJECT AND ALL HOGA]  
// --> **** SO APAN NORMALIZE KARKE INKO 0TO1 BICH PE KARDE --> THEN OUR MODEL BEHAVE WELL 
// --> KI BIG VALUE HAI TOH USKO LAGE JYADA IMP HAI YE ****NA HO THIK --> SO DO NORMALIZATION 

//  DSA     |   IQ    |    PROJECT    |   ATTENDENCE
//  500         100           4               70
// -> SABKO O TO 1 KI RANGE PE LEKE ANA HAI NORMALIZE IT ---> BY   (DSA - MIN)  / ( MAX - MIN )  IS TARAH SE CALCULATE KAR SHAKTE HAI 

// SO OUTPUT -->
// **** O/P = W1X + W2Y + W3Z + W4K + B   <-   CALCULATE KARO O/P BY PUTTING NORMALIZED VALUE SO AB SAHI RESULT AYEGA 



