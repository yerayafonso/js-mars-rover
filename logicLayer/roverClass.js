const Direction = require("../direction.js");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");
const InputParser = require("../inputLayer/inputParser");
const { setPlateau, getPlateau } = require("../plateauStore.js");

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
      const err = new Error("Invalid Instruction");
      err.name = "InputError";
      throw err;
    }
    switch (this.facing) {
      case Direction.N:
        this.posY += 1;
        break;
      case Direction.E:
        this.posX += 1;
        break;
      case Direction.S:
        this.posY -= 1;
        break;
      default:
        this.posX -= 1;
    }
  }
  control(instructionArr) {
    const plateau = getPlateau();
    const storeX = this.posX;
    const storeY = this.posY;
    const storeDir = this.facing;
    instructionArr.forEach((ele) => {
      if (ele === "Instruction.MOVE") {
        this.move(eval(ele));
      } else {
        this.rotate(eval(ele));
      }
    });

    if (
      this.posX > plateau.maxX ||
      this.posY > plateau.maxY ||
      this.posX < 0 ||
      this.posY < 0
    ) {
      this.posX = storeX;
      this.posY = storeY;
      this.facing = storeDir;
      const err2 = new Error();
      err2.name = "InstructionError";
      throw err2;
    }
  }
}

module.exports = Rover;
