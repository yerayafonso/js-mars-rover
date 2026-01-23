const Direction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/direction.js");
const Instruction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/instruction.js");
const Position = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/positionClass.js");
const PlateauSize = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/plateauSize.js");
const Rover = require("../roverClass");

describe("Rover Class", () => {
  describe("Rover Rotation", () => {
    test("Rover rotate right when facing north", () => {
      let rover = new Rover(2, 2, "N");
      rover.rotate(Instruction.RIGHT);
      expect(rover.facing === Direction.E).toBe(true);
    });
    test("rover can rotate left when facing east", () => {
      let rover = new Rover(0, 0, Direction.E);
      rover.rotate(Instruction.LEFT);
      expect(rover.facing === Direction.N).toBe(true);
    });
    test("throws error for invalid rotation", () => {
      let rover = new Rover(0, 0, Direction.E);
      expect(() => rover.rotate(Instruction.MOVE)).toThrow();
    });
  });
  describe("Rover Movement", () => {
    test("Rover moves when facing north", () => {
      let rover = new Rover(2, 2, "N");
      rover.move(Instruction.MOVE);
      expect(rover.posX).toBe(3);
    });
    test("rover moves when facing east", () => {
      let rover = new Rover(0, 0, Direction.E);
      rover.move(Instruction.MOVE);
      expect(rover.posY).toBe(1);
    });
    test("rover moves when facing south", () => {
      let rover = new Rover(2, 2, Direction.S);
      rover.move(Instruction.MOVE);
      expect(rover.posX).toBe(1);
    });
    test("rover moves when facing east", () => {
      let rover = new Rover(2, 2, Direction.W);
      rover.move(Instruction.MOVE);
      expect(rover.posY).toBe(1);
    });
    test("throws error for invalid movement", () => {
      let rover = new Rover(0, 0, Direction.E);
      expect(() => rover.move(Instruction.RIGHT)).toThrow();
    });
  });
});
