import { GoogleGenAI } from "@google/genai";

// Use lazy initialization to avoid crashing the app on load.
// The client will only be created when the first message is sent.
let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  // This check safely accesses process.env only if it exists.
  // It assumes the API_KEY is injected by a build tool or environment like Vercel.
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

  if (!apiKey) {
    // This specific error message will be caught and displayed in the UI.
    throw new Error("Lỗi cấu hình: API Key chưa được thiết lập. Vui lòng kiểm tra lại biến môi trường trên Vercel.");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
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
    const client = getAiClient(); // Initialize the client safely here
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
        throw new Error(error.message || "Không thể lấy phản hồi từ API.");
    }
    throw new Error("Đã xảy ra lỗi không xác định khi lấy phản hồi.");
  }
};
