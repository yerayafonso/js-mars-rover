const Direction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/direction.js");
const Instruction = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/instruction.js");
const Rover = require("../roverClass");
const InputParser = require("/home/yerayafonso/Northcoders/fundamentals/js-mars-rover/inputLayer/inputParser.js");

describe("Logic Integration", () => {
  test("rover position updates following integration of logic and input layers", () => {
    let parse = new InputParser();

    const plateau = parse.plateauParser("5 5");

    const position1 = parse.positionParser("1 2 N");
    const position2 = parse.positionParser("3 3 E");
    const instructions1 = parse.instructionParser("LMLMLMLMM");
    const instructions2 = parse.instructionParser("MMRMMRMRRM");

    let rover1 = new Rover(position1);
    const rover2 = new Rover(position2);

    expect(rover1).toEqual({ posX: 1, posY: 2, facing: "N" });
    expect(rover2).toEqual({ posX: 3, posY: 3, facing: "E" });
    rover1.control(instructions1);
    rover2.control(instructions2);

    expect(rover1).toEqual({ posX: 1, posY: 3, facing: "N" });
    expect(rover2).toEqual({ posX: 5, posY: 1, facing: "E" });
  });
});
