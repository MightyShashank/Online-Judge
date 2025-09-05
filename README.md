# 🚀 CodeCollab
**CodeCollab** is a modern, feature-rich platform designed for developers to practice problem-solving, collaborate in real-time, and leverage the power of AI to enhance their coding skills. It combines a robust code execution engine with a suite of AI-powered tools, making it the ultimate training ground for technical interviews and competitive programming. Built with a **scalable microservices architecture**, CodeCollab provides a seamless and interactive experience—from solving problems to getting intelligent feedback on your solutions.

- ✨ **Key Features**
  - 👨‍💻 **Interactive Code Editor:** Full-featured Monaco-based editor with syntax highlighting and IntelliSense for a wide range of programming languages.  
  - 🤖 **AI Assistant Suite (Powered by Gemini):** *Get Hint* (contextual hints based on your code), *Explain Code* (line-by-line explanation with time/space complexity), *Debug Code* (analysis of logical errors and fix suggestions), *Refactor Code* (readability and performance improvements), *Generate Edge Cases* (extra tricky test cases to harden solutions).  
  - 🔒 **Secure Authentication:** Simple and secure user authentication using Google OAuth, managed via a dedicated auth service.  
  - 🧩 **Rich Problem Set:** Comprehensive library of problems across difficulty levels with boilerplate code in multiple languages.  
  - 📊 **Detailed Submission Tracking:** Full history per problem, including verdicts and granular test case results.  
  - 🤝 **Collaborative Features (Future):** Real-time collaborative coding sessions and group problem-solving.  
  - 🚀 **Scalable Architecture:** Microservices with an API Gateway so services are decoupled and scale independently.

- 🛠️ **Technology Stack**
  - **Frontend:** React, Vite, Recoil (State Management), Tailwind CSS, Framer Motion  
  - **Backend:** Node.js, Express.js  
  - **API Gateway:** Node.js, http-proxy-middleware  
  - **Database:** PostgreSQL (NeonDB)  
  - **Caching/Jobs:** Redis  
  - **AI Integration:** Google Gemini API  
  - **Code Execution:** Judge0  
  - **Authentication:** Passport.js (Google OAuth 2.0), JWT

- 🚀 **Getting Started**
  - **Prerequisites:** Node.js (v18.x or later), npm or yarn, PostgreSQL Database, Redis Instance, Google OAuth Credentials (`CLIENT_ID`, `CLIENT_SECRET`), Google Gemini API Key  
  - **Installation & Setup:**
    ```bash
    # Clone the repository
    git clone https://github.com/MightyShashank/Online-Judge.git
    cd Online-Judge

    # Setup Backend Services (example: auth-server)
    cd services/auth-server
    npm install
    cp .env.example .env
    # Fill in your DB, Redis, and Google credentials in .env

    # Setup Frontend
    cd ../../frontend
    npm install
    cp .env.example .env
    # Add your API Gateway URL to .env
    ```
  - **Run the application:**
    ```bash
    # Start each backend microservice (in separate terminal windows)
    npm start

    # Start the frontend development server
    npm run dev
    ```
    The application should now be running at **https://localhost:5175**.

- 🤝 **Contributing**
  Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. If you have a suggestion that would make this better, please fork the repo and create a pull request, or open an issue with the tag **enhancement**.  
  ```bash
  # Fork the Project

  # Create your Feature Branch
  git checkout -b feature/AmazingFeature

  # Commit your Changes
  git commit -m 'Add some AmazingFeature'

  # Push to the Branch
  git push origin feature/AmazingFeature

  # Open a Pull Request


- 📜 **License**  
Distributed under the MIT License. See LICENSE for more information.  

- 📧 **Contact**  
**Shashank Appu** — [LinkedIn](https://www.linkedin.com/in/shashank-appu/) — shashankvactech@gmail.com  

- 🔗 **Project Link**  
[Online Judge](https://github.com/MightyShashank/Online-Judge)  

