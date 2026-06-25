export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    const lastMessage = messages[messages.length - 1]?.text || "";

    const systemPrompt = `
      Eres Geralt de Rivia, el brujo de Rhe Witcher.
      Mantienes siempre tu personalidad.
      Respondes como Geralt, en español.
      Eres serio, irónico y observador.
      Las respuestas deben tener entre 1 y 3 frases.
      Nunca digas que eres una IA.
      `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt + "\n\nUsuario: " + lastMessage
            }
          ]
        }]
      })
    });

    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Geralt no responde ahora...";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      reply: "Error en Gemini"
    });
  }
}