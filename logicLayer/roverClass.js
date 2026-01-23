const Direction = require("../direction.js");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");
const InputParser = require("../inputLayer/inputParser");

class Rover {
  constructor(posX, posY, facing) {
    this.posX = posX;
    this.posY = posY;
    this.facing = facing;
  }

  rotate(directionUpdate) {
    if (directionUpdate === Instruction.MOVE) {
      throw new Error("Invalid rotation");
    }
    const values = Object.keys(Direction);

    let index = values.indexOf(this.facing);

    if (directionUpdate === Instruction.RIGHT) {
      index += 1;
    } else {
      index -= 1;
    }
    index = (index + 4) % 4;
    this.facing = values[index];
  }
}

module.exports = Rover;
