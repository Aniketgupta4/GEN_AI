// BUILD YOUR OWN CODE REVIEWER 

// ----> **** Another LLM jo review karega code ko folder pe ya folder ke ander folder ke code ko 
// -> hm sirf bolegai ki code review karna hai aur wo apne aap code ko read karke review kar dega 
// -> isme hmko khud code nahi dena padega 
// -> ye pura ka pura folder ko read karke review karega
// ----> and jo bhi galti hogi and bugs hongai and security issue hoga unko ----> solve karega and code ko better banayega optimize karega and last mai summary bhi dega ki kya kya kara hai llm hamara 

// -> mai sirf ise ye boluga ki is folder ke code ko read karke review karna hai
// -> hmko batana padega pehle ki ye ye folders hai system pe tab na llm usko read karke review kar payega
// -> so we have to make a tool jo files dega llm ko jo folder ke ander hai
// -> fir llm us tool ka use karke folder ke ander ke files ko read karke (code lane ke liye (read) bhi 1 or tool banna padega and modify in code (write) so make more tool) review karega and modify karega 

// --> 3 tools (functions banana simple and apne hisab se function pe logic likho)
//             ----> 1 for list of files
//                   2 for content of file
//                   3 for modification make in file

// -> ******** aj apan ne LLM ko kyu NI bola like cursor ki llm cmds de and we execute only and work autmatically done --> **** itna big path why we choose why 3 tools extra we make ?
// -> **** LLM khatarnak hai bohot jo cmd diya wo terminal execute karta hai and LLM ne kuch system related cmd de toh sab delete ho jayega isi liye we not use that approch of cursor wali ----> ki llm se cmds leke execute karaye
 
// -> **** so correct + safe way ki ----> tools bana lo sabse acha 
// -> ******* so agar llm ne kuch system related faltu cmd di toh ni execute hogi sirf jo tools hai wahi execute hongai samjhe 


// ----> ******** so prefered method is tools banao na ki direct llm se cmd se execute karo ----> so llm se cmds ni lo direct ----> llm sirf bataye ki is took ko call karna hai and ye parameter pass karna hai thik -> control apne pass hai 

// -> **** but important files jaise (.env node_modules) pe changes allow ni karna hai ---> beacuse .env is imp and node_modules heavy hote hai token waste hongai toh --> koi mtlab ni hai inko review karwane ka ---> only loss hi hai inko check karne mai [make restrctions in tools (functions)]


// questions how ? --> 1) file read 2) file write 3) folder ke ander ke saare files kaise laaoga
// ----> 1 & 2 ) solution  **** by fs module -> node js special power deta hai by fs --> fs.read("file_location,utf-8") , fs.write("file_location",content) and all 
// ----> all files stores in harddisk so store in binary form in hdd and we want to get it in normal form so use "utf-8" format 
// ----> 3) solution -> fs module hi file folder info de dega but location chaiye if specific folder ki toh **** path chaiye na location us folder ka so ye bhi hmko mil jayega easily and macos use thisfile structure (/../../..)  and in windows use this file system (..\..\..\..\) so use path module for safe play for all system
// -> and hmko kuch bhi read write karwana hai so hmko file ka path (realtive path ekdam correct path) dena hoga file tab na wo read write karega in file and fs give array [f1,f2,f3,f4....] and ye hamara work hoga inko convert karna in address form do join by -> path.join()


// -----------------------------------------------------


import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import path from 'path';

// npm i fs for fs module
// npm i path for padh module

const ai = new GoogleGenAI({apiKey:process.env.API_KEY});

// ============================================
// TOOL FUNCTIONS
// ============================================

async function listFiles({ directory }) {  // LLM ko files ka path dena hai ex -> op/ops/opss 
  const files = [];
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css'];
  
  function scan(dir) {
    const items = fs.readdirSync(dir); // folder(dir) sirf apne folder ya files (only childs) ko dikhayega or inner walo ko ni dikhayega(grandchilds ko ni dikhayega)
    
    for (const item of items) {
      const fullPath = path.join(dir, item); // ye join karta hai folders files ko
      
      // Skip node_modules, dist, build
      if (fullPath.includes('node_modules') || 
          fullPath.includes('dist') || 
          fullPath.includes('build')) continue;
      
      const stat = fs.statSync(fullPath); // bar bar check karega for each file and folder ke liye full path correct hai ki ni -> OP/ANI , OP/ANU and all
      
      if (stat.isDirectory()) { // if dir then again call scan() for internal files and folders
        scan(fullPath);
      } else if (stat.isFile()) {  // if file hai normal 
        const ext = path.extname(item); // so check extension correct hai ki ni
        if (extensions.includes(ext)) {
          files.push(fullPath);  // [] array of files and folders mil jayega ab
        }
      }
    }
  }
  
  scan(directory);
  console.log(`Found ${files.length} files`);
  return { files };
}


async function readFile({ file_path }) {
  const content = fs.readFileSync(file_path, 'utf-8');
  console.log(`Reading: ${file_path}`);
  return { content };
}

async function writeFile({ file_path, content }) {
  fs.writeFileSync(file_path, content, 'utf-8');
  console.log(`✍️  Fixed: ${file_path}`);
  return { success: true };
}

// ============================================
// TOOL REGISTRY
// ============================================

const tools = {  // 3 tools  
  'list_files': listFiles,
  'read_file': readFile,
  'write_file': writeFile
};

// ============================================
// TOOL DECLARATIONS
// ============================================

const listFilesTool = {
  name: "list_files",
  description: "Get all JavaScript files in a directory",
  parameters: {
    type: Type.OBJECT,
    properties: {
      directory: {
        type: Type.STRING,
        description: "Directory path to scan"
      }
    },
    required: ["directory"]
  }
};

const readFileTool = {
  name: "read_file",
  description: "Read a file's content",
  parameters: {
    type: Type.OBJECT,
    properties: {
      file_path: {
        type: Type.STRING,
        description: "Path to the file"
      }
    },
    required: ["file_path"]
  }
};

const writeFileTool = {
  name: "write_file",
  description: "Write fixed content back to a file",
  parameters: {
    type: Type.OBJECT,
    properties: {
      file_path: {
        type: Type.STRING,
        description: "Path to the file to write"
      },
      content: {
        type: Type.STRING,
        description: "The fixed/corrected content"
      }
    },
    required: ["file_path", "content"]
  }
};

// ============================================
// MAIN FUNCTION
// ============================================

export async function runAgent(directoryPath) {
  console.log(`🔍 Reviewing: ${directoryPath}\n`);

  const History = [{
    role: 'user',
    parts: [{ text: `Review and fix all JavaScript code in: ${directoryPath}` }]
  }];

  while (true) {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: History,
      config: {
        systemInstruction: `You are an expert JavaScript code reviewer and fixer.

**Your Job:**
1. Use list_files to get all HTML, CSS, JavaScript, and TypeScript files in the directory
2. Use read_file to read each file's content
3. Analyze for:
   
   **HTML Issues:**
   - Missing doctype, meta tags, semantic HTML
   - Broken links, missing alt attributes
   - Accessibility issues (ARIA, roles)
   - Inline styles that should be in CSS
   
   **CSS Issues:**
   - Syntax errors, invalid properties
   - Browser compatibility issues
   - Inefficient selectors
   - Missing vendor prefixes
   - Unused or duplicate styles
   
   **JavaScript Issues:**
   - BUGS: null/undefined errors, missing returns, type issues, async problems
   - SECURITY: hardcoded secrets, eval(), XSS risks, injection vulnerabilities
   - CODE QUALITY: console.logs, unused code, bad naming, complex logic

4. Use write_file to FIX the issues you found (write corrected code back)
5. After fixing all files, respond with a summary report in TEXT format

**Summary Report Format:**
📊 CODE REVIEW COMPLETE

Total Files Analyzed: X
Files Fixed: Y

🔴 SECURITY FIXES:
- file.js:line - Fixed hardcoded API key
- auth.js:line - Removed eval() usage

🟠 BUG FIXES:
- app.js:line - Added null check for user object
- index.html:line - Added missing alt attribute

🟡 CODE QUALITY IMPROVEMENTS:
- styles.css:line - Removed duplicate styles
- script.js:line - Removed console.log statements

Be practical and focus on real issues. Actually FIX the code, don't just report.`,
        
    tools: [{
          functionDeclarations: [listFilesTool, readFileTool, writeFileTool]
        }]
      }
    });

    // Process ALL function calls at once
    if (result.functionCalls?.length > 0) {
      
      // Execute all function calls
      for (const functionCall of result.functionCalls) { // use loop why -> as result.functioncalls return array and ab hmko bohot sare chize ek sath execute karni hai so use loop 
        const { name, args } = functionCall;
        
        console.log(`📌 ${name}`);
        const toolResponse = await tools[name](args);

        // Add function call to history
        History.push({
          role: "model",
          parts: [{ functionCall }]
        });

        // Add function response to history
        History.push({
          role: "user",
          parts: [{
            functionResponse: {
              name,
              response: { result: toolResponse }
            }
          }]
        });
      }
      
    } else {
      console.log('\n' + result.text);
      break;
    }
  }
}

// node script.js ../MiniProject3.1
// 0       1           2        <- index
// run script and is MiniProject folder ko check karna hai (give relative path of file)

const directory = process.argv[2] || '.'; // iska mtlab 2nd index wale ko utha lo for folder

await runAgent(directory);