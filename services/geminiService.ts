// Fix: Implemented the Gemini service to handle bot responses. This file was previously malformed,
// causing module resolution errors and "Cannot find name" errors. The new implementation
// correctly uses the @google/genai SDK to generate content based on user prompts.
import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// It is assumed to be pre-configured and accessible in the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Calls the Gemini API to get a response from the bot.
 * @param prompt The user's message.
 * @returns The bot's response text.
 */
export const getBotResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are PsyFriend, a friendly and helpful AI assistant designed to provide psychological support. Always respond in Vietnamese.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting bot response from Gemini:", error);
    // Re-throw the error to be handled by the UI component
    throw new Error("Failed to fetch response from Gemini API.");
  }
};
