
import { GoogleGenAI } from "@google/genai";

// Fix: Simplified Gemini client initialization to align with coding guidelines.
// The GoogleGenAI instance is now created at the module level, assuming `process.env.API_KEY`
// is available in the execution environment as per project requirements.
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
    // Re-throw the error to be handled by the UI component in App.tsx
    if (error instanceof Error) {
        throw new Error(error.message || "Failed to fetch response from Gemini API.");
    }
    throw new Error("An unknown error occurred while fetching the response.");
  }
};
