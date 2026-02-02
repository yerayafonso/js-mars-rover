const Direction = require("./direction.js");
const Instruction = require("./instruction");
const Position = require("./positionClass");
const PlateauSize = require("./plateauSize");
const InputParser = require("./inputLayer/inputParser");
const Rover = require("./logicLayer/roverClass");
const UserInterface = require("./ui/uiLayer.js");

const user = new UserInterface();

async function run() {
  await user.promptForPlateauSize();

  const rover = await user.promptForRoverLandingCoordinates();

  await user.promptForRoverInstructions(rover);

  await user.promptToEndProgram();
}

run();

module.exports = run;

// what if user wants multiple rovers?

// multiple sets of instructions?

// switch between rovers to control?

//allow user to end program?
