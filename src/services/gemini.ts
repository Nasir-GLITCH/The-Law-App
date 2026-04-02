import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function getLegalAdvice(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are JusticeLink's AI Legal Advisor — a calm, empathetic legal assistant built for everyday Nigerians facing legal problems. Your job is to:
        1. Listen carefully and ask clarifying questions if the situation is unclear
        2. Explain the user's legal rights in plain, simple language — no jargon
        3. Describe practical steps they can take immediately
        4. Be sensitive — many users are scared, in danger, or have never spoken to a lawyer before
        5. Recommend whether the user needs a lawyer urgently, soon, or not at all
        Disclaimer: You are an AI, not a lawyer. Your advice is for informational purposes only.`,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    return response.text;
 } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    return `Error: ${error?.message || "Unknown error occurred"}`;
  }
}
