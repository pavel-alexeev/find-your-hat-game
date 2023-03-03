const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let currentlyPlaying = true;
let ground = [];

let indexH = 0;
let indexW = 0;

class Field {
  constructor(field) {
    this._field = field;
  }

  static resetGame() {
    ground = [];
    console.clear();
  }

  // Prints 2d array
  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  // startOfGame() {
  //   let ask = prompt("Do you want to start new game?");
  //   if (ask === "y") {
  //     this.game();
  //   } else if (ask === "n") {
  //     prompt("See you next time");
  //   } else {
  //     prompt("Pleast type right input");
  //   }
  // }

  // Generating new field with provided width, height and percentage of holes on the field
  static generateField(width, height, percentage) {
    // Initialize array
    prompt(
      "Welcome to the 'Find Your Hat' game. Press 'Enter' to start the game."
    );

    while (!/^[0-9]+$/.test(width)) {
      width = prompt("Type field width(number): ");
    }
    while (!/^[0-9]+$/.test(height)) {
      height = prompt("Type field height(number): ");
    }
    while (!/^[0-9]+$/.test(percentage)) {
      percentage = prompt("How many percent of field will be holes: ");
    }
    for (let i = 0; i < height; i++) {
      ground[i] = []; // Initialize inner array
      for (let j = 0; j < width; j++) {
        // i++ needs to be j++
        const holeOrField = (percentage) => {
          if (percentage >= 0 && percentage <= 100) {
            const ranNum = Math.random() * 100;
            if (ranNum < percentage) {
              return hole;
            } else {
              return fieldCharacter;
            }
          }
        };
        // pathCharacter starting position
        ground[0][0] = pathCharacter;
        ground[i][j] = holeOrField(percentage);
      }
    }
    do {
      ground[Math.floor(Math.random() * (width - 1))][
        Math.floor(Math.random() * (height - 1))
      ] = hat;
    } while (ground[0][0] == hat);
    return ground;
  }

  // Programm asking for next move
  nextMove() {
    let move = prompt(
      "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right: "
    );
    if (move === "u") {
      if (indexH <= 0) {
        console.log("You lose! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexH--;
      }
    }
    if (move === "r") {
      if (indexW >= this._field[0].length - 1) {
        console.log("You lose! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexW++;
      }
    }
    if (move === "d") {
      if (indexH >= this._field[indexH].length - 1) {
        console.log("You lose! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexH++;
      }
    }
    if (move === "l") {
      if (indexW <= 0) {
        console.log("You lose! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexW--;
      }
    }
  }

  indexOfItem(array2d, item) {
    let index = [].concat.apply([], [].concat.apply([], array2d)).indexOf(item);

    // return "false" if the item is not found
    if (index === -1) {
      return false;
    }

    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    let numColumns = array2d[0].length;

    // row = the index in the 1d array divided by the row length (number of columns)
    let row = parseInt(index / numColumns);

    // col = index modulus the number of columns
    let col = index % numColumns;
    return [row, col];
  }

  // Check current position of pathCahracter and returns value depending on position on the field
  ifWin() {
    switch (this._field[indexH][indexW]) {
      case hole:
        console.log("You lose! Fell into a hole.");
        currentlyPlaying = false;
        break;
      case hat:
        console.log("Congratulations! You win!");
        currentlyPlaying = false;
        break;
      case fieldCharacter:
        this._field[indexH][indexW] = pathCharacter;
        break;
      default:
        break;
    }
  }

  // Function to start the game
  game() {
    indexH = 0;
    indexW = 0;
    while (currentlyPlaying) {
      console.log(this.print());
      if (currentlyPlaying) {
        this.nextMove();
        this.ifWin();
      }
    }
    let playAgain = prompt("Would you like to play again? Press 'y' for yes or any other key to quit.");
    if(playAgain === "y") {
      currentlyPlaying = true;
      indexH = 0
      indexW = 0
      ground = Field.generateField(ground[0].length, ground.length, 20);
      this.game();
    } else 
    console.log("Thanks for playing!");
  }
}

const myField = new Field(Field.generateField());

myField.game();
