export function formatMessage(role, text) {
  return {
    role, // usuario o asistente
    text, // contenido
    timestamp: new Date().toLocaleTimeString() // hora
  };
}

export function parseGeminiResponse(data) {
  return data.reply || "No hubo respuesta"; // fallback
}