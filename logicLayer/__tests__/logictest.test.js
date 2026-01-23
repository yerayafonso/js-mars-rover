const Direction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/direction.js");
const Instruction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/instruction.js");
const Position = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/positionClass.js");
const PlateauSize = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/plateauSize.js");
const Rover = require("../roverClass");
const InputParser = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/inputLayer/inputParser.js");

describe("Rover Class", () => {
  describe("Rover Rotation", () => {
    test("Rover rotate right when facing north", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 n");
      let rover = new Rover(position);
      rover.rotate(Instruction.RIGHT);
      expect(rover.facing === Direction.E).toBe(true);
    });
    test("rover can rotate left when facing east", () => {
      let parse = new InputParser();
      const position = parse.positionParser("0 0 e");
      let rover = new Rover(position);
      rover.rotate(Instruction.LEFT);
      expect(rover.facing === Direction.N).toBe(true);
    });
    test("throws error for invalid rotation", () => {
      let parse = new InputParser();
      const position = parse.positionParser("0 0 e");
      let rover = new Rover(position);
      expect(() => rover.rotate(Instruction.MOVE)).toThrow();
    });
  });
  describe("Rover Movement", () => {
    test("Rover moves when facing north", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 n");
      let rover = new Rover(position);
      rover.move(Instruction.MOVE);
      expect(rover.posY).toBe(3);
    });
    test("rover moves when facing east", () => {
      let parse = new InputParser();
      const position = parse.positionParser("0 0 E");
      let rover = new Rover(position);
      rover.move(Instruction.MOVE);
      expect(rover.posX).toBe(1);
    });
    test("rover moves when facing south", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 s");
      let rover = new Rover(position);
      rover.move(Instruction.MOVE);
      expect(rover.posY).toBe(1);
    });
    test("rover moves when facing east", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 w");
      let rover = new Rover(position);
      rover.move(Instruction.MOVE);
      expect(rover.posX).toBe(1);
    });
    test("throws error for invalid movement", () => {
      let parse = new InputParser();
      const position = parse.positionParser("0 0 E");
      let rover = new Rover(position);
      expect(() => rover.move(Instruction.RIGHT)).toThrow();
    });
  });

  describe("Rover Control", () => {
    test("Rover position updates with multiple movement instructions", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 n");
      let rover = new Rover(position);
      const instructions = parse.instructionParser("MmM");

      rover.control(instructions);

      expect(rover).toEqual({ posX: 2, posY: 5, facing: "N" });
    });
    test("Rover direction updates with multiple rotation instructions", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 n");
      let rover = new Rover(position);
      const instructions = parse.instructionParser("RRlr");

      rover.control(instructions);

      expect(rover).toEqual({ posX: 2, posY: 2, facing: "S" });
    });

    test("Rover position updates with single movement and rotation instructions", () => {
      let parse = new InputParser();
      const position = parse.positionParser("2 2 n");
      let rover = new Rover(position);
      const instructions = parse.instructionParser("mR");

      rover.control(instructions);

      expect(rover).toEqual({ posX: 2, posY: 3, facing: "E" });
    });
  });
});
