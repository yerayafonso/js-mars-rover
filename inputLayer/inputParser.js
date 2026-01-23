const Direction = require("../direction");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");

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

    return new PlateauSize(maxX, maxY);
  }
  positionParser(rawInput) {
    const parts = rawInput.trim().split(/\s+/);

    const X = Number(parts[0]);
    const Y = Number(parts[1]);
    const facingDirection = parts[2].toUpperCase();

    return new Position(X, Y, facingDirection);
  }
  instructionParser(rawInput) {
    const parts = rawInput.trim().toUpperCase().split("");

    const keys = Object.keys(Instruction);
    const values = Object.values(Instruction);

    const validInstructions = parts
      .map(
        (ele) =>
          values.indexOf(ele) >= 0 && values.indexOf(ele) <= 2
            ? `Instruction.${keys[values.indexOf(ele)]}`
            : null,
        // ele === Instruction.LEFT
        //   ? Instruction.LEFT
        //   : ele === Instruction.RIGHT
        //     ? Instruction.RIGHT
        //     : ele === Instruction.MOVE
        //       ? Instruction.MOVE
        //       : null,
      )
      .filter((ele) => ele);
    if (validInstructions.length !== parts.length) {
      throw new Error("Invalid instructions");
    }

    return validInstructions;
  }
}

module.exports = InputParser;
