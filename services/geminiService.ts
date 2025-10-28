import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDescription = async (
  productName: string,
  category: string
): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject(new Error("API key is not configured."));
  }

  const prompt = `Generate a compelling and concise product description for a used '${productName}' in the '${category}' category for the Sri Lankan marketplace "IT.exe". The target audience is the Sri Lankan PC building community. Highlight its potential use cases and value. Keep it professional but friendly. The description must be under 120 words. Do not use markdown or formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description from AI.");
  }
};