const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
let currentlyPlaying = true;

let indexH = 0;
let indexW = 0;

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  charPossition() {
    this._field[indexH][indexW] = pathCharacter;
  }

  hatPossition() {
    let cubes = [
      ["string", "string"],
      ["string", "string"],
    ];

    for (let i = 0; i < cubes.length; i++) {
      for (let j = 0; j < cubes[i].length; j++) {
        console.log(cubes[i][j]);
      }
    }
  }

  static generateField() {
    let ground = []; // Initialize array
    let width = parseInt(prompt("Type width: "));
    let height = parseInt(prompt("Type height: "));
    while (!/^[0-9]+$/.test(width, height)) {
      width = prompt("Type width: ");
      height = prompt("Type height: ");
    }
    for (let i = 0; i < height; i++) {
      ground[i] = []; // Initialize inner array
      for (let j = 0; j < width; j++) {
        // i++ needs to be j++
        ground[i][j] = Math.floor(Math.random() * 5);
      }
    }
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
      // console.log(this.print(Field.generateField()));
      console.log(this.print());
      // console.log(Field.generateField());
      if (currentlyPlaying) {
        this.nextMove();
        this.ifWin();
      }
    }
    console.log("Game Over");
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
}

const myField = new Field(Field.generateField());

myField.startOfGame();
