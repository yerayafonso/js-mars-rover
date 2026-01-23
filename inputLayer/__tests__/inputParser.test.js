const InputParser = require("../inputParser");

describe("InputParser", () => {
  let parse;
  beforeEach(() => {
    parse = new InputParser();
  });

  describe("PLateauParser()", () => {
    test("converts '5 5' into correct format for plateau size", () => {
      const plateau = parse.plateauParser("5 5");
      expect(plateau.maxX).toBe(5);
      expect(plateau.maxY).toBe(5);
    });
    test("throws error for invalid input of plateau size", () => {
      expect(() => parse.plateauParser("5 6 5")).toThrow("Invalid input");

      expect(() => parse.plateauParser("5 6 5")).toThrow();
    });
  });
  describe("PositionParser()", () => {
    test("converts '5 5 N' into correct format for plateau size", () => {
      const position = parse.positionParser("5 5 N");
      expect(position.X).toBe(5);
      expect(position.Y).toBe(5);
      expect(position.facingDirection).toBe("N");
    });
  });
  describe("instructionParser()", () => {
    test("converts 'lmRLMM' into correct format for instructions", () => {
      const instructions = parse.instructionParser("lmRLMM");
      expect(instructions).toEqual(["L", "M", "R", "L", "M", "M"]);
    });
    test("throws error for invalid input for instructions", () => {
      expect(() => parse.instructionParser("lmRLXMM")).toThrow(
        "Invalid instructions",
      );
    });
  });
});
