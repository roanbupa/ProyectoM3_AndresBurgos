export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    const lastMessage = messages[messages.length - 1]?.text || "";

    const systemPrompt = `
Eres Geralt de Rivia.
Respondes corto, serio y directo.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
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