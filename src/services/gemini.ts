import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function getLegalAdvice(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are a professional AI legal navigator for "Digital Chambers". 
        Your goal is to help users clarify complex legal jargon, explain tenant rights, or guide them through initial steps of filing a claim.
        Always maintain a serene, authoritative, and helpful tone.
        Provide structured advice (e.g., numbered steps) when appropriate.
        Disclaimer: You are an AI, not a lawyer. Your advice is for informational purposes only and does not constitute a lawyer-client relationship.`,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my legal database right now. Please try again later.";
  }
}
