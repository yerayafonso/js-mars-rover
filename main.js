const Direction = require("./direction.js");
const Instruction = require("./instruction");
const Position = require("./positionClass");
const PlateauSize = require("./plateauSize");
const InputParser = require("./inputLayer/inputParser");
const Rover = require("./logicLayer/roverClass");

let parse = new InputParser();

console.log(parse.plateauParser("5 5"));

console.log(parse.positionParser("5 5 N"));

console.log(parse.instructionParser("lmrrlmmr"));
