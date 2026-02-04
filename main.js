const Direction = require("./direction.js");
const Instruction = require("./instruction");
const Position = require("./positionClass");
const PlateauSize = require("./plateauSize");
const InputParser = require("./inputLayer/inputParser");
const Rover = require("./logicLayer/roverClass");
const UserInterface = require("./ui/uiLayer.js");
const { getPlateau } = require("./plateauStore.js");

const user = new UserInterface();

async function run() {
  await user.promptForPlateauSize();

  let plateauGrid = user.printGrid(getPlateau());

  user.formatGrid(plateauGrid);

  const rover = await user.promptForRoverLandingCoordinates();

  user.placeRoverOnGrid(plateauGrid, rover);

  user.formatGrid(plateauGrid);

  let plateauGrid2 = user.printGrid(getPlateau());

  await user.promptForRoverInstructions(rover);

  user.placeRoverOnGrid(plateauGrid2, rover);

  user.formatGrid(plateauGrid2);

  let plateauGrid3 = user.printGrid(getPlateau());

  await user.promptForRoverInstructions(rover);

  user.placeRoverOnGrid(plateauGrid3, rover);

  user.formatGrid(plateauGrid3);

  // await user.promptToEndProgram();
}

run();

module.exports = run;

// what if user wants multiple rovers?

// multiple sets of instructions?

// switch between rovers to control?

//allow user to end program?
