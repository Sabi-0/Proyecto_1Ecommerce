# Proyecto_1Ecommerce.
Created with CodeSandbox, React, Nose.js & Vite

https://drive.google.com/file/d/18nDP9nWadEufkNcXlmf6Y30lpzmJAVR8/view?usp=sharing (Sample video)
https://codesandbox.io/p/sandbox/inspiring-david-yhklzq (link code sandbox)

Local Development Setup
Prerequisites
Node.js v16+ (Download)
npm v9+ (comes with Node.js)

Firebase project setup (for authentication/database)
Installation

Clone the repository:
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install dependencies:
npm install
Set up Firebase:
Create .env.local file in root directory:

env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
Running the App
bash
npm run dev
App will launch at:
🔗 http://localhost:5173

Troubleshooting guide:

for this case because I use code sandbox as the main develop, Only Node.js is needed , U can migrate tu vibe though, with some changes in the files and uninstalling and re-installing some others, 
Main problems: usually Node.js cant be used with the codesandbox code for the version incompatibility, u need to use some force with the terminal commands
put in the powershell Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned for the first step in case Node.js dindt have the permission 

If you encounter:

Firebase errors: Verify your .env.local credentials

Dependency issues: Run:
rm -rf node_modules package-lock.json
npm install
Image loading: Check Unsplash URL formats in products.js

If latter than that, the npm install give U lot of error’s , force the installation trhough 
npm install --legacy-peer-deps

IF u achive migration with Vibe
u just need ro put npm run dev
and the display is going to be like this 
![image](https://github.com/user-attachments/assets/99215edf-3bf9-4d7b-b201-8ab38ee6c2fd)
thats it, Just open your local host and run the app.

 Project Documentation
🔥 Firebase Configuration
Setup Guide:

Create a Firebase project at console.firebase.google.com
Enable these services:
Authentication (Email/Google)
Firestore Database
Storage
Environment Variables (.env.local):


VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
Security Rules:
The most useful ones 4ya 

🪟 Modal Component
Features:
Dynamic content injection
Keyboard accessible (ESC to close)
Click outside to close
Animation-ready
Props API:

Prop	| Type	| Default| 	Description
isOpen |	Boolean	 | false	| Controls | visibility
onClose |	Function	| Required	| Close handler
ariaLabel	| String	| "Modal"	| Accessibility | label
closeOnOverlayClick	| Boolean	| true	| Close when clicking outside

Best Practices:
Always include ARIA attributes
Manage focus trapping
Use CSS transitions for animations
Support mobile viewport

Atomic Design Implementation
Project Structure:

src/
├── atoms/           # Basic UI elements
│   ├── Button/
│   ├── Input/
│   └── Icon/
├── molecules/       # Simple components
│   ├── ProductCard/
│   └── SearchBar/
├── organisms/       # Complex components
│   ├── Header/
│   └── ProductGrid/
├── templates/       # Page layouts
│   ├── MainLayout/
│   └── AuthLayout/
└── pages/           # Final pages
Rules:

Atoms should be stateless
Molecules can manage their own state
Organisms may connect to data stores
Templates define layout structure
Pages are route-specific compositions

References
Core Technologies:
React Best Practices
Firebase Web SDK

Design Systems:
Atomic Design Methodology
Material UI Guidelines

Dribbble E-commerce
Awwwards Stores

Performance:
Web Vitals Metrics
Firebase Performance Monitoring
