import axios from 'axios';

const API_KEY = "AIzaSyBhwR0g0PSH_DdNnSNlRo9T7uzeGnKaQIY";

const runChat = async (prompt) => {
    try {
        if (!prompt || prompt.trim().length === 0) {
            return "Please enter a valid question.";
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data?.candidates?.[0]?.content) {
            throw new Error("No response from API");
        }

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error:", error);
        if (error.response?.status === 401) {
            return "Error: Invalid API key.";
        } else if (error.response?.status === 429) {
            return "Error: API quota exceeded.";
        }
        return "I'm having trouble processing your question. Please try again.";
    }
};

export default runChat;