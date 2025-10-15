// Fix: Implemented lazy initialization for the Gemini client to prevent browser-side crashes.
// The GoogleGenAI instance is now created only when a message is sent, avoiding errors
// from `process.env` not being available on initial page load.
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

/**
 * Initializes and returns the GoogleGenAI client instance.
 * Throws an error if the API key is not configured.
 */
const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not configured. Please add it to your environment variables.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

/**
 * Calls the Gemini API to get a response from the bot.
 * @param prompt The user's message.
 * @returns The bot's response text.
 */
export const getBotResponse = async (prompt: string): Promise<string> => {
  try {
    const client = getAiClient(); // Lazily get the initialized client
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are PsyFriend, a friendly and helpful AI assistant designed to provide psychological support. Always respond in Vietnamese.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting bot response from Gemini:", error);
    // Re-throw the error to be handled by the UI component in App.tsx
    if (error instanceof Error) {
        throw new Error(error.message || "Failed to fetch response from Gemini API.");
    }
    throw new Error("An unknown error occurred while fetching the response.");
  }
};