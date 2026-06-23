import { describe, test, expect } from "vitest";

import {
  formatMessage,
  parseGeminiResponse
} from "../src/utils.js";

describe("utils", () => {

  test("crea mensaje", () => {

    const msg =
      formatMessage("user", "hola");

    expect(msg.role)
      .toBe("user");
  });

  test("texto correcto", () => {

    const msg =
      formatMessage("user", "hola");

    expect(msg.text)
      .toBe("hola");
  });

  test("parsea respuesta", () => {

    const result =
      parseGeminiResponse({
        reply: "hola"
      });

    expect(result)
      .toBe("hola");
  });

  test("fallback", () => {

    const result =
      parseGeminiResponse({});

    expect(result)
      .toBe("No hubo respuesta");
  });
});