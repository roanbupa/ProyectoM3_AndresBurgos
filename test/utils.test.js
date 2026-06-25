import { describe, it, expect } from "vitest";
import { formatMessage, getLastMessage } from "../public/utils.js";

describe("utils", () => {

  it("formatea un mensaje correctamente", () => {
    const msg = formatMessage("user", "hola");

    expect(msg.role).toBe("user");
    expect(msg.text).toBe("hola");
    expect(msg.timestamp).toBeDefined();
  });

  it("obtiene el último mensaje", () => {
    const messages = [
      { text: "1" },
      { text: "2" }
    ];

    const last = getLastMessage(messages);

    expect(last.text).toBe("2");
  });

});