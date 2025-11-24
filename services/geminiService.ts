import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDescription = async (title: string, type: 'product' | 'news' | 'design'): Promise<string> => {
  if (!apiKey) return "API Key not found. Please configure process.env.API_KEY.";
  
  try {
    const prompt = `Write a short, creative, and professional description (max 30 words) for a ${type} titled: "${title}".`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};