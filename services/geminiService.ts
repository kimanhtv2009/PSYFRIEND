// Fix: Replaced placeholder content with a valid implementation for the Gemini service.
// This resolves the module and syntax errors in this file and allows App.tsx to import getBotResponse.
import { GoogleGenAI } from "@google/genai";

// The API key is sourced from the environment variable `process.env.API_KEY` as per guidelines.
// It's assumed to be set in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Generates a response from the Gemini model.
 * @param prompt The user's input text.
 * @returns The model's response text.
 */
export const getBotResponse = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash', // Using gemini-2.5-flash for basic text tasks as per guidelines.
    contents: prompt,
    config: {
      // Provide a system instruction to define the bot's persona and language.
      systemInstruction: 'You are PsyFriend, a friendly and helpful AI assistant who communicates in Vietnamese. Your goal is to provide supportive and empathetic conversations.',
    }
  });
  // Extract the text from the response as per guidelines.
  return response.text;
};
