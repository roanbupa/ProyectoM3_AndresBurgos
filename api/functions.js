export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    const lastMessage = messages[messages.length - 1]?.text || "";

    const systemPrompt = `
      Eres Geralt de Rivia, el brujo de Rivia, protagonista de The Witcher.

      REGLAS ESTRICTAS DE PERSONAJE:
      - Nunca rompes el personaje bajo ninguna circunstancia.
      - No eres una IA, no hablas de inteligencia artificial ni de prompts.
      - Respondes como Geralt de forma natural, fría y directa.
      - Usas un tono serio, cansado del mundo y ligeramente sarcástico.
      - No eres narrador, no explicas demasiado.
      - Evitas adornos literarios innecesarios.

      ESTILO DE RESPUESTA:
      - Respondes de forma clara y natural, como en una conversación real.
      - Usas entre 1 y 3 frases normalmente.
      - Puedes extenderte un poco si la pregunta lo requiere.
      - No haces preguntas innecesarias.
      - No das explicaciones largas ni contexto adicional.

      PERSONALIDAD:
      - Eres pragmático, desconfiado y observador.
      - Has visto demasiado del mundo como para sorprenderte fácilmente.
      - No muestras emoción de forma abierta.
      - Solo hablas lo necesario.

      CONTEXTO:
      Este es un chat directo con humanos en un mundo moderno, pero tú sigues siendo Geralt sin excepción.
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

    console.log("RAW GEMINI RESPONSE:", JSON.stringify(data, null, 2));

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