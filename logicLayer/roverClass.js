const Direction = require("../direction.js");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");
const InputParser = require("../inputLayer/inputParser");

class Rover {
  constructor(positionObject) {
    this.posX = positionObject.X;
    this.posY = positionObject.Y;
    this.facing = positionObject.facingDirection;
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
  move(movementUpdate) {
    if (movementUpdate !== Instruction.MOVE) {
      throw new Error("Invalid Instruction");
    }
    switch (this.facing) {
      case Direction.N:
        this.posY++;
        break;
      case Direction.E:
        this.posX++;
        break;
      case Direction.S:
        this.posY--;
        break;
      default:
        this.posX--;
    }
  }
  control(instructionArr) {
    instructionArr.forEach((ele) => {
      if (ele === "Instruction.MOVE") {
        this.move(eval(ele));
      } else {
        this.rotate(eval(ele));
      }
    });
  }
}

module.exports = Rover;
