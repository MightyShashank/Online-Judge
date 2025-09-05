// filename: server.js

const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// --- Initialization ---
const app = express();
app.use(express.json());

// Access your API key from environment variables
// Make sure to set GEMINI_API_KEY in your .env file or environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Note: While sending multi-line string dont use "" use ``, the axios lib will automatically add \n and convert it to a single line string
// --- API Endpoint ---
app.post('/generate-boilerplate', async (req, res) => {
    const { language, markdown } = req.body;

    // --- 1. Validate Input ---
    if (!language || !markdown) {
        return res.status(400).json({ error: 'Both "language" and "markdown" fields are required.' });
    }

    try {
        // --- 2. Select the Gemini Model ---
        // Using gemini-1.5-pro for its advanced instruction-following capabilities
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        // --- 3. Construct the Prompt ---
        // This prompt clearly defines the role, task, and expected output format for the LLM.
        const prompt = `
            You are an expert code generator specializing in creating boilerplate for competitive programming problems.
            You will be given a markdown text describing a programming problem and a target language.
            Your task is to parse the markdown to understand the function signature and execution details.
            Based on this, you must generate two separate code snippets in the specified language:
            1. The function boilerplate (the function signature with a placeholder for the user's code).
            2. The main function that handles reading input from stdin, calling the user's function, and printing the result to stdout.

            You MUST return the output as a single, valid JSON object with the following structure: {"function_boilerplate": "...", "main": "..."}.
            Do not include any other text, explanations, or markdown formatting in your response.

            Here is the problem markdown:
            ---
            ${markdown}
            ---

            Generate the code for the language: ${language}
        `;

        // --- 4. Define the Expected JSON Schema for the Response ---
        // This forces the model to return a valid JSON object in the specified format.
        const generationConfig = {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    function_boilerplate: { type: "STRING" },
                    main: { type: "STRING" },
                },
                required: ["function_boilerplate", "main"],
            },
        };

        // --- 5. Call the Gemini API ---
        console.log(`Generating boilerplate for ${language}...`);
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig,
        });
        
        const response = result.response;
        const responseText = response.text();
        
        // --- 6. Parse and Send the Response ---
        // The response from the model will be a string, so we parse it into a JSON object.
        const generatedCode = JSON.parse(responseText);
        
        console.log("Successfully generated boilerplate.");

        console.log("--- Function Boilerplate ----");
        console.log(generatedCode.function_boilerplate);

        console.log("--- Main Function ---");
        console.log(generatedCode.main);

        res.status(200).json(generatedCode);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to generate boilerplate code.' });
    }
});

app.get('/healthy', (req, res) => {
    res.status(200).send('healthy');
});

// --- Start the Server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Boilerplate generation server running on port ${PORT}`);
});
