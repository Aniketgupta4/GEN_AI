// ------------> PROJECT : AI SOFTWARE DEVELOPMENT TEAM <--------------


// -> koi bhi kaam hai usko auomation pe leke jayengai -> kuch bhi kaam kar dega -> REPLACE HUMANS 
// -> **** is project se ye pata lagega ki human replace ni hongai



// --------- IN REAL WORLD HOW PROBLEM STATEMENT KE BARE PE THINKS (SUPPOSE AI NI AYA HAI ABHI TK) ---------


// -> PROBLEM STATEMENT : LEETCODE KA CLONE CREATE KARNA HAI 

// -> 1) PRODUCT MANAGER [ISKO CODING KA KNOWLEDGE NI HAI SIRF PROJECT KE BARE PE BATANA HAI YE HO SHAKTA HAI AND YE YE -> GIVE OVERVIEW OF PROJECT -> REQ SAMAJHNA HAI] --> SAB BATAYEGA KYA KAR SHAKTE HAI --> "HUM LOG EK AISA PLATFORM BANAYENGE JISPE LOG APNE CODING PROBLEMS SOLVE KAR SAKTE HAIN, APNE SOLUTIONS SHARE KAR SAKTE HAIN, AUR DUSRE LOGON KE SOLUTIONS DEKH SAKTE HAIN AND KI LOGIN / SIGNUP PAGE KAISE SHOW HOGA , COSTING AND SO ON."
// -> 2) ARCHITECT [ISKO CODING KA THODA KNOWLEDGE HAI BUT NOT DEEP KNOWLEDGE, YE LOG PROJECT KE DESIGN PE FOCUS KARTA HAI, KI KAISE DESIGN KARNA HAI PROJECT KO, KAISE DATABASE DESIGN KARNA HAI, KAISE FRONTEND DESIGN KARNA HAI, KAISE BACKEND DESIGN KARNA HAI AUR KI TECHNOLOGY STACK KYA HOGA, FOLDER STRUCTURE] --> "HUM LOG FRONTEND ME REACT USE KAR SAKTE HAIN, BACKEND ME NODEJS USE KAR SAKTE HAIN AUR DATABASE ME MONGODB USE KAR SAKTE HAIN. HUM LOG EK AISA ARCHITECTURE DESIGN KAR SAKTE HAIN JISME FRONTEND AUR BACKEND KE BECH ME EK API LAYER HO JISPE FRONTEND BACKEND SE COMMUNICATE KAREGA."
// -> 3) DEVELOPER [ISKO CODING KA DEEP KNOWLEDGE HAI, YE LOG PROJECT KE IMPLEMENTATION PE FOCUS KARTA HAI, KI KAISE CODE LIKHNA HAI, KI KAISE ALGORITHM DESIGN KARNA HAI, KI KAISE DATABASE QUERIES LIKHNI HAIN AUR KI KAISE FRONTEND COMPONENTS BANANE HAIN] --> "HUM LOG FRONTEND ME REACT COMPONENTS BANAYENGE, BACKEND ME API ENDPOINTS BANAYENGE AUR DATABASE ME SCHEMAS DESIGN KARNE HAIN. HUM LOG ALGORITHMS DESIGN KARNE HAIN JISSE PROBLEMS SOLVE HO SAKTE HAIN AUR HUM LOG DATABASE QUERIES LIKHNI HAIN JISSE DATA RETRIEVE HO SAKTA HAIN."
// -> 4) TESTER [ISKO CODING KA THODA KNOWLEDGE HAI BUT NOT DEEP KNOWLEDGE, YE LOG PROJECT KE TESTING PE FOCUS KARTA HAI, KI KAISE TEST CASES LIKHNE HAIN, KI KAISE BUGS FIND KARNE HAIN AUR KI KAISE PERFORMANCE TESTING KARNE HAIN] --> "HUM LOG UNIT TESTS LIKHENGE JISSE INDIVIDUAL COMPONENTS AUR FUNCTIONS TEST HO SAKTE HAIN, HUM LOG INTEGRATION TESTS LIKHENGE JISSE DIFFERENT MODULES KE BECH ME COMMUNICATION TEST HO SAKTA HAIN AUR HUM LOG PERFORMANCE TESTS LIKHENGE JISSE APPLICATION KI PERFORMANCE CHECK HO SAKTI HAIN."
// -> 5) CODE REVIEWER [ISKO CODING KA DEEP KNOWLEDGE HAI, YE LOG PROJECT KE CODE REVIEW PE FOCUS KARTA HAI, KI KAISE CODE KO REVIEW KARNA HAI, KI KAISE CODE ME IMPROVEMENTS SUGGEST KARNE HAIN AUR KI KAISE CODE ME BEST PRACTICES FOLLOW KARNE HAIN] --> "HUM LOG CODE REVIEW KARNE HAIN JISSE CODE QUALITY IMPROVE HO SAKTI HAIN, HUM LOG BEST PRACTICES FOLLOW KARNE HAIN JISSE CODE MAINTAINABLE AUR SCALABLE HO SAKTA HAIN AUR HUM LOG IMPROVEMENTS SUGGEST KARNE HAIN JISSE CODE BETTER HO SAKTA HAIN."
// -> 6) DEVOPS ENGINEER [ISKO CODING KA THODA KNOWLEDGE HAI BUT NOT DEEP KNOWLEDGE, YE LOG PROJECT KE DEPLOYMENT PE FOCUS KARTA HAI, KI KAISE APPLICATION KO DEPLOY KARNA HAI, KI KAISE CI/CD PIPELINE BANANI HAIN AUR KI KAISE INFRASTRUCTURE DESIGN KARNA HAIN] --> "HUM LOG APPLICATION KO AWS YA HEROKU PE DEPLOY KAR SAKTE HAIN, HUM LOG CI/CD PIPELINE BANAYENGE JISSE CODE AUTOMATICALLY DEPLOY HO SAKTA HAIN AUR HUM LOG INFRASTRUCTURE DESIGN KARNE HAIN JISSE APPLICATION SCALABLE AUR RELIABLE HO SAKTI HAIN."

// -> THIS LOOKS LIKE LANGGRAPH -> AND KAHI BHI DIKKAT HAI CODE FATA TOH BATA SHAKTE HAIN USKO KI YAHA DIKKAT HAI US STEP PE JAKE AND WO US PROBLEM KO SOLVE KAREGA AND THEN AGAIN CHECK KARNE KE LIYE USKO TESTER KO DEGA KI TEST CASES PASS HO RAHE HAIN YA NI 

// --> **** SO APAN YE WORKFLOW CREATE KAR SHAKTE HAIN JISME HUM LOG PROBLEM STATEMENT LEKE USKO SOLVE KARNE KE LIYE ALGORITHMS DESIGN KARTE HAIN, USKE BAAD US ALGORITHM KO CODE ME IMPLEMENT KARTE HAIN AUR USKE BAAD US CODE KO TEST CASES KE SAATH TEST KARTE HAIN JISSE HUM LOG CHECK KAR SAKTE HAIN KI KYA HUMARA SOLUTION Sahi KAAM KAR RAHA HAI YA NI. 

// -> **** YE PURA LOOP PE WORK HOGA JAB TAK PROBLEM SOLVE NA HO JAYE, AUR JAB TAK PROBLEM SOLVE NA HO JAYE TAB TAK HUM LOG IS LOOP ME REPEAT KARTE RAHEGA.


// --> **** kya hota hai customer ko khud ni pata hota kya banwana hai thoda bohot hi bataye so uski help --> PRODUCT MANAGER KARTA HAI USHE RELATED OR CHIZEIN BHI BATAYEGA KI KAISE BANAYENGE, KAISE DESIGN KARNE HAIN, KI TECHNOLOGY STACK KYA HOGA AUR KI KAISE IMPLEMENTATION KARNE HAIN.


// --> FLOW :  

//   CUSTOMER 
//      /\
//      |
//      \/
// 1) PRODUCT MANAGER <-----           <---->    END
//      |                  |
//      \/                 |
// 2) ARCHITECT            |
//      |                  |
//      \/                 |
// 3) DEVELOPER            |
//      |                  |
//      \/                 |
// 4) TESTER               |
//      |                  |
//      \/                 |
// 5) CODE REVIEWER        |
//      |                  |
//      \/                 |
// 6) DEVOPS ENGINEER ---->|


// --> **** LLM GIVES NON-DETERMINISTIC OUTPUT, ISKA MATLAB HAI KI SAME PROMPT PE ALAG ALAG OUTPUT DEGA, AUR YE OUTPUT KI QUALITY PE DEPEND KARTA HAI KI HUMNE ****PROMPT KAISA LIKHA HAI AUR KI HUMNE LLM KO KAISA INSTRUCT KIYA HAI.
// --> **** APAN SMALL SMALL PE WORK KARAYENGAI , KI LLM FAATE NA ACHE SE ANSWER KARE ACHE SE BANAYE PRODUCT KO



// --> **** YE BATAO CODER KO EK BAAR PE HI SARA CODE LIKH KE TESTER KO DE DENA CHAIYE KI NI BATAO ?
// -> * Nahi, coder ko ek baar pe sara code likh ke tester ko dena chahiye, kyunki agar coder ek baar pe sara code likh ke tester ko dega toh tester ko bohot saare test cases likhne padenge aur agar coder ne code me koi galti ki hai toh tester ko us galti ko dhundhne me bohot time lagega. Isliye coder ko chhote chhote parts me code likh ke tester ko dena chahiye, jisse tester ko test cases likhne me asani ho aur agar coder ne code me koi galti ki hai toh tester us galti ko jaldi se dhundh sakta hai.
// -> ek baar pe code dene se -> halocination ka dikkat ayega , bohot jyada token lagengai , etc 
// -> **** chhote chhote parts me code dene se karwane se -> halocination ka dikkat kam ayega , bohot jyada token ni lagengai , etc


// -> **** example --> as our db's models are related to another db's models -> 
// -> so agar apan frontend+backend+db ka bar bar kara ray hai code chote chote pe toh --> dikkat ayegi na aage new thing add kare toh pura db and all changes karna hoga so
// -> **** ise or kuch acha kar shakte hai kya ?

// -> **** jaise sabse pehle db's hi create karo sare then test karo then move to next part backend then test then frontend banao then test karo -> ye way sahi hai

// s1) design schema --> test
// s2) backend code --> test
// s3) frontend code --> test

// -> implement karo feature wise chize ko then test karo
// -> **** issue aa shakta hai as ki in architecture pe koi si file ni hai --> and wo chaiye hmne aage code likhne ke liye so ----> ***** so ek loopback/feedback mechanism hona chaiye --> ki coder bol shake architecture ko ki ye file chaiye then coder code likh shake   
// -> **** means sabpe ek loopback/feedback mechanism hona chaiye



// --> FINAL FLOW :  [EACH ONE HAVE LOOPBACK MECHANISM -> KISI KO KOI ISSUE HAI TOH WO PICHLE WALE KO BATA SHAKE AND PROBLEM SOLVE HOYE]

//   CUSTOMER 
//      /\
//      |
//      \/
// 1) PRODUCT MANAGER <-----           <---->    END
//      /\                 |
//      |                  |
//      \/                 |
// 2) ARCHITECT            |
//      /\                 |
//      |                  |
//      \/                 |
// 3) DEVELOPER            |
//      /\                 |
//      |                  |
//      \/                 |
// 4) TESTER               |
//      /\                 |
//      |                  |
//      \/                 |
// 5) CODE REVIEWER        |
//      /\                 |
//      |                  |
//      \/                 |
// 6) DEVOPS ENGINEER ---->|


// ISSUE IN THIS --> ROJ KOI NA KOI LIBRARY UPDATE SO LLM UPTODATE RAHENGAI -> B/C LLM DONOT HAVE ONLINE/NET ACCESS 
// -> LLM UNKO LEKE AYEGA KI NEW REACT USE KARE PURANA WALA NI --> SO LATEST UPDATE KE LIYE ****NEW TOOL BANA SHAKTE HAI 
// -> SO AB YE UPDATED WAY SE CODE LIKHEGA -> TOH KYA APAN TOOL KI HELP SE REACT YA OR KISI KI PURI DOCUMENTATION KA CODE CONTEXT PE DENGAI LLM KO --> **** NI ISME SE TOKENS WASTE HONGAI --> YE KAR SHAKTE HAI KI SIRF UPDATED CODE CONTEXT PE DE DOUMENTATION SE --> ISME BHI DIKKAT AYEGI NA YR FIND KARNA PADEGA KI NEW CHIZ KYA HAI IN DOCUMENTATION PE THEN CONTENT PROVIDE KARO SO HUMAN REPLACE NI KAR SHAKTA SAMJHE BHAI BOHOT SARA WORK HOTA HAI

// -> ****** ADV OF LANGGRAPH -> **** HUMAN IN THE LOOP -> KI KISI KE STEP KE BAAD HUMAN CHECK KAR SHAKTA HAI KI SAB SAHI CHAL RA HAI KI NI  
