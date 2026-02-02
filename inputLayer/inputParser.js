const Direction = require("../direction");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");
const {
  setPlateau,
  getPlateau,
} = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/plateauStore.js");

class InputParser {
  constructor(userInput) {
    this.input = userInput;
  }

  plateauParser(rawInput) {
    const parts = rawInput.trim().split(/\s+/);

    if (parts.length > 2) {
      throw new Error("Invalid input");
    }

    const maxX = Number(parts[0]);
    const maxY = Number(parts[1]);

    const plateau = new PlateauSize(maxX, maxY);
    setPlateau(plateau);

    return plateau;
  }
  positionParser(rawInput) {
    const plateau = getPlateau();
    const parts = rawInput.trim().split(/\s+/);

    const X = Number(parts[0]);
    const Y = Number(parts[1]);
    if (X > plateau.maxX || Y > plateau.maxY || X < 0 || Y < 0) {
      const err = new Error("Invalid input");
      err.name = "InputError";
      throw err;
    }
    const facingDirection = parts[2].toUpperCase();
    if (!/[NEWS]/.test(facingDirection)) {
      const err = new Error("Invalid input");
      err.name = "InputError";
      throw err;
    }

    const position = new Position(X, Y, facingDirection);

    return position;
  }
  instructionParser(rawInput) {
    const parts = rawInput.trim().toUpperCase().split("");

    const keys = Object.keys(Instruction);
    const values = Object.values(Instruction);

    const validInstructions = parts
      .map((ele) =>
        values.indexOf(ele) >= 0 && values.indexOf(ele) <= 2
          ? `Instruction.${keys[values.indexOf(ele)]}`
          : null,
      )
      .filter((ele) => ele);
    // if (validInstructions.length !== parts.length) {
    //   throw new Error("Invalid instructions");
    // }

    return validInstructions;
  }
}

module.exports = InputParser;
