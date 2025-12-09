import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// In a real app, ensure process.env.API_KEY is available. 
// For this template, we gracefully handle missing keys in the UI.
const apiKey = process.env.API_KEY || ''; 
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSkinAdvice = async (userQuery: string): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is configured
    return "I apologize, but I am currently in demonstration mode. To activate my full dermatological analysis capabilities, please configure a valid Google Gemini API Key in the application settings.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: "You are a world-class dermatologist assistant for 'Lumière Dermatology'. Your tone is professional, empathetic, and luxurious. Provide concise, high-end skincare advice. Do not provide medical diagnoses, but suggest general care routines or recommend booking a consultation.",
        thinkingConfig: { thinkingBudget: 0 } // Low latency
      }
    });
    
    return response.text || "I'm having trouble connecting to the skin analysis database. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try your query again in a moment.";
  }
};