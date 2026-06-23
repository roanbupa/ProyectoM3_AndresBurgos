import { describe, test, expect } from "vitest";

describe("app", () => {

  test("ruta home", () => {

    expect("/home")
      .toContain("home");
  });

});