const Direction = require("./direction.js");
const Instruction = require("./instruction");
const Position = require("./positionClass");
const PlateauSize = require("./plateauSize");
const InputParser = require("./inputLayer/inputParser");
const Rover = require("./logicLayer/roverClass");

let parse = new InputParser();

const plateau = parse.plateauParser("5 5");

const position1 = parse.positionParser("1 2 N");
const position2 = parse.positionParser("3 3 E");
const instructions1 = parse.instructionParser("LMLMLMLMM");
const instructions2 = parse.instructionParser("MMRMMRMRRM");

let rover1 = new Rover(position1);

console.log(rover1);

rover1.control(instructions1);

console.log(rover1);

let rover2 = new Rover(position2);

console.log(rover2);

rover2.control(instructions2);

console.log(rover2);
