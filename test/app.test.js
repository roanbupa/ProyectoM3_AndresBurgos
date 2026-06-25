import { describe, it, expect } from "vitest";

describe("API chat mock", () => {

  it("simula respuesta de Gemini", async () => {
    const fakeResponse = {
      candidates: [
        {
          content: {
            parts: [{ text: "respuesta de prueba" }]
          }
        }
      ]
    };

    const reply =
      fakeResponse?.candidates?.[0]?.content?.parts?.[0]?.text;

    expect(reply).toBe("respuesta de prueba");
  });

});