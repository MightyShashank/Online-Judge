🚀 About CodeCollab
CodeCollab is a modern, feature-rich platform designed for developers to practice problem-solving, collaborate in real-time, and leverage the power of AI to enhance their coding skills. It combines a robust code execution engine with a suite of AI-powered tools, making it the ultimate training ground for technical interviews and competitive programming.

Built with a scalable microservices architecture, CodeCollab provides a seamless and interactive experience, from solving problems to getting intelligent feedback on your solutions.

✨ Key Features
👨‍💻 Interactive Code Editor: A full-featured Monaco-based editor with syntax highlighting and Intellisense for a wide range of programming languages.

🤖 AI Assistant Suite (Powered by Gemini):

Get Hint: Receive a contextual hint for the current problem based on your code.

Explain Code: Get a detailed, line-by-line explanation of your successful solution, including time and space complexity analysis.

Debug Code: For failed test cases, the AI provides an analysis of the logical error and suggests a path to a fix.

Refactor Code: Improve your code's readability and performance with AI-powered refactoring suggestions.

Generate Edge Cases: After solving a problem, generate additional tricky test cases to ensure your solution is robust.

🔒 Secure Authentication: Simple and secure user authentication using Google OAuth, managed through a dedicated auth service.

🧩 Rich Problem Set: A comprehensive library of coding problems with varying difficulty levels, complete with boilerplate code in multiple languages.

📊 Detailed Submission Tracking: Users can view a history of their submissions for each problem, including verdicts and detailed test case results.

🤝 Collaborative Features: (Future) Real-time collaborative coding sessions and group problem-solving.

🚀 Scalable Architecture: Built on a microservices architecture with an API Gateway, ensuring services are decoupled and can be scaled independently.

🛠️ Technology Stack
Area

Technologies

Frontend

React, Vite, Recoil (State Management), Tailwind CSS, Framer Motion

Backend

Node.js, Express.js

API Gateway

Node.js, http-proxy-middleware

Database

PostgreSQL (NeonDB)

Caching/Jobs

Redis

AI Integration

Google Gemini API

Code Execution

Judge0

Authentication

Passport.js (Google OAuth 2.0), JWT

🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18.x or later)

npm or yarn

PostgreSQL Database

Redis Instance

Google OAuth Credentials (CLIENT_ID, CLIENT_SECRET)

Google Gemini API Key

Installation & Setup
Clone the repository:

git clone [https://github.com/MightyShashank/Online-Judge.git](https://github.com/MightyShashank/Online-Judge.git)
cd Online-Judge

Setup Backend Services: For each service (api-gateway, auth-server, webhook-server, etc.), navigate into its directory, install dependencies, and set up the .env file.

cd services/auth-server
npm install
cp .env.example .env 
# Fill in your DB, Redis, and Google credentials in .env

Setup Frontend:

cd frontend
npm install
cp .env.example .env
# Add your API Gateway URL to .env

Run the application:

Start each backend microservice (in separate terminal windows): npm start

Start the frontend development server: npm run dev

The application should now be running on https://localhost:5175.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

📧 Contact
Shashank Appu - LinkedIn - shashankvactech@gmail.com

Project Link: https://github.com/MightyShashank/Online-Judge
