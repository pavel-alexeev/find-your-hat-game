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

  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  startOfGame() {
    let ask = prompt("Do you want to start new game?");
    if (ask === "y") {
      this.game();
    } else if (ask === "n") {
      prompt("See you next time");
    } else {
      prompt("Pleast type right input");
    }
  }

  static generateField(width, height, percentage) {
    // Initialize array
    while (!/^[0-9]+$/.test(width)) {
      width = prompt("Type width(number): ");
    }
    while (!/^[0-9]+$/.test(height)) {
      height = prompt("Type height(number): ");
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
    // Sets the hat position
    // ground[Math.floor(Math.random() * (width - 1))][
    //   Math.floor(Math.random() * (height - 1))
    // ] = hat;
    do {
      ground[Math.floor(Math.random() * (width - 1))][
        Math.floor(Math.random() * (height - 1))
      ] = hat;
    } while (ground[0][0] == hat);
    // if (!(ground[0][0] = pathCharacter)) {
    //   ground[Math.floor(Math.random() * width)][
    //     Math.floor(Math.random() * height)
    //   ] = hat;
    // }

    return ground;
  }

  nextMove() {
    let move = prompt(
      "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right"
    );
    if (move === "u") {
      if (indexH <= 0) {
        console.log("You lost! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexH--;
      }
    }
    if (move === "r") {
      if (indexW >= this._field[0].length - 1) {
        console.log("You lost! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexW++;
      }
    }
    if (move === "d") {
      if (indexH >= this._field[indexH].length - 1) {
        console.log("You lost! Out of boundary.");
        currentlyPlaying = false;
      } else {
        indexH++;
      }
    }
    if (move === "l") {
      if (indexW <= 0) {
        console.log("You lost! Out of boundary.");
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
    // console.log([row, col]);
    return [row, col];
  }

  checkIfWin(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {}
    }
    if (this.indexOfItem(this._field, hat) === false) {
      console.log("Congratulations! You found the hat.");
      currentlyPlaying = false;
    }
  }

  ifWin() {
    switch (this._field[indexH][indexW]) {
      case hole:
        console.log("You lost! Fell into a hole.");
        currentlyPlaying = false;
        break;
      case hat:
        console.log("You win!");
        currentlyPlaying = false;
        break;
      case fieldCharacter:
        this._field[indexH][indexW] = pathCharacter;
        break;
      default:
        break;
    }
  }

  game() {
    while (currentlyPlaying) {
      console.log(this.print());
      if (currentlyPlaying) {
        this.nextMove();
        this.ifWin();
      }
    }
    console.log("Game Over");
  }
}

const myField = new Field(Field.generateField());

myField.game();
