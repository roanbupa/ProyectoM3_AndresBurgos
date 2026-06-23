import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {

  try {

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const { messages } = req.body;

    const systemPrompt = `
    Eres Geralt de Rivia.

    Hablas de forma breve.

    Eres serio.

    Respondes en máximo 3 frases.

    Nunca dices que eres una IA.
    `;

    const history = messages
      .map(m => `${m.role}: ${m.text}`)
      .join("\n");

    const prompt = `
      ${systemPrompt}

      ${history}
    `;

    const result =
      await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt
      });

    res.status(200).json({
      reply: result.text
    });

  } catch {

    res.status(500).json({
      error: "Error Gemini"
    });
  }
}