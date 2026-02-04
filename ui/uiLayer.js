const Direction = require("../direction.js");
const Instruction = require("../instruction");
const Position = require("../positionClass");
const PlateauSize = require("../plateauSize");
const InputParser = require("../inputLayer/inputParser");
const Rover = require("../logicLayer/roverClass");
const { getPlateau } = require("../plateauStore.js");
const inquirer = require("inquirer");
const confirm = require("@inquirer/confirm");
const run = require("../main.js");
const chalk = require("chalk");

class UserInterface {
  constructor() {}

  formatGrid(grid) {
    grid.forEach((row) => {
      console.log(`[ ${row.join(", ")} ]`);
    });
  }

  printGrid(plateau) {
    let plateauGrid = [];
    for (let i = 0; i < plateau.maxY; i++) {
      let gridRow = [];
      for (let j = 0; j < plateau.maxX; j++) {
        gridRow.push(0);
      }
      plateauGrid.push(gridRow);
    }
    return plateauGrid;
  }

  placeRoverOnGrid(plateauGrid, rover) {
    for (let i = 0; i < plateauGrid; i++) {
      for (let j = 0; j < plateauGrid[i]; j++) {
        plateauGrid[i][j] = 0;
      }
    }
    const plateau = getPlateau();
    let roverFigure;

    switch (rover.facing) {
      case "N":
        roverFigure = "A";
        break;
      case "E":
        roverFigure = ">";
        break;
      case "W":
        roverFigure = "<";
        break;
      default:
        roverFigure = "V";
    }
    const coordY = plateau.maxY - rover.posY;
    plateauGrid[coordY][rover.posX - 1] = roverFigure;
    return plateauGrid;
  }

  async promptForPlateauSize() {
    const input = await inquirer.prompt([
      {
        type: "input",
        name: "plateauSize",
        message:
          "Enter coordinates for your plateau size, separated by a space, e.g. 6 6, 3 12:",
      },
    ]);

    const parser = new InputParser();
    parser.plateauParser(input.plateauSize);
    const plateau = getPlateau();
    if (/[^0-9]/.test(plateau.maxX) || /[^0-9]/.test(plateau.maxY)) {
      console.log("That is not a valid plateau size. Try again!");
      return this.promptForPlateauSize();
    }

    console.log(`Plateau Size: (0, 0) - (${plateau.maxX}, ${plateau.maxY})`);
  }

  async promptForRoverLandingCoordinates() {
    try {
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "roverCoordinates",
          message:
            "Enter coordinates for your rover landing site within the plateau, and a cardinal direction, separated by a space, e.g. 4 7 N",
        },
      ]);
      const parser = new InputParser();
      const roverPosition = parser.positionParser(input.roverCoordinates);
      // const plateau = getPlateau();
      const rover = new Rover(roverPosition);

      console.log(
        `Rover has landed at (${roverPosition.X}, ${roverPosition.Y}) facing ${roverPosition.facingDirection}`,
      );
      return rover;
    } catch (error) {
      console.log("Those are invalid landing coordinates, try again!");
      console.error(error);
      return this.promptForRoverLandingCoordinates();
    }
  }

  async promptForRoverInstructions(roverClass) {
    try {
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "instructions",
          message:
            "Enter isntructions for your rover to move within the plateau. Use 'L' and 'R' to turn 90 degrees and 'M' to move forward based on the direction e.g. LMLMMMRM:",
        },
      ]);

      const parser = new InputParser();
      const roverInstructions = parser.instructionParser(input.instructions);

      const updatedRover = roverClass.control(roverInstructions);
      console.log(
        `The rover is now at (${roverClass.posX}, ${roverClass.posY}) facing ${roverClass.facing}`,
      );

      return updatedRover;
    } catch (error) {
      console.log("These are invalid instructions. Try again!");
      return this.promptForRoverInstructions(roverClass);
    }
  }

  async promptToEndProgram() {
    try {
      const answer = await confirm([
        {
          message: "Do you wish to continue the program?",
        },
      ]);
      run();
    } catch {
      return;
    }
  }
}

module.exports = UserInterface;
