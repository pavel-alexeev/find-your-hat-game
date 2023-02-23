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
    // do {
    //   this.nextMove();
    // } while (pathCharacter !== hat);
  }

  hatPossition() {
    var cubes = [
      ["string", "string"],
      ["string", "string"],
    ];

    for (var i = 0; i < cubes.length; i++) {
      for (var j = 0; j < cubes[i].length; j++) {
        console.log(cubes[i][j]);
      }
    }
  }

  endOfGame() {
    // if(pathCharacter[this.y][this.x])
  }

  static generateField() {
    // let arr = []; // Initialize array
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i] = []; // Initialize inner array
    //   for (var j = 0; j < arr[i].length; j++) {
    //     // i++ needs to be j++
    //     arr[i][j] = "bye";
    //   }
    //   console.log(arr);
    // }
    // return field;
  }

  // nextMove() {
  //   do {
  //     let move = prompt(
  //       "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right"
  //     );
  //     switch (move) {
  //       case "u":
  //         indexH--;
  //         console.log("Moving Up");
  //         console.log(indexH);
  //         break;
  //       case "r":
  //         indexW++;
  //         console.log("Moving Right");
  //         console.log(indexW);
  //         break;
  //       case "d":
  //         indexH++;
  //         console.log("Moving Down");
  //         console.log(indexH);
  //         break;
  //       case "l":
  //         indexW--;
  //         console.log("Moving Left");
  //         console.log(indexW);
  //         break;
  //       default:
  //         console.log("Wrong letter!");
  //         break;
  //     }
  //     this.checkIfWin();
  //     this._field[indexH][indexW] = pathCharacter;

  //     console.log(this._field[0].length);
  //     console.log(myField.print());
  //   } while (currentlyPlaying);
  // }

  nextMove() {
    let move = prompt(
      "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right"
    );
    // console.log(indexH);
    // console.log(indexW);
    if (move === "u") {
      if (indexH <= 0) {
        // console.log(indexH);
        move = prompt("Not allowed. Out of boundary.");
        // this.startOfGame();
      } else {
        indexH--;
      }
    }
    if (move === "r") {
      if (indexW >= 3) {
        move = prompt("Not allowed. Out of boundary.");
        // console.log(indexW);
      } else {
        indexW++;
      }
    }
    if (move === "d") {
      if (indexH >= this._field[indexH].length - 1) {
        move = prompt("Not allowed. Out of boundary.");
        // console.log(indexW);
      } else {
        indexH++;
      }
    }
    if (move === "l") {
      if (indexW <= 0) {
        // console.log(indexW);
        move = prompt("Not allowed. Out of boundary.");
      } else {
        indexW--;
      }
    }
    // this._field[indexH][indexW] = pathCharacter;
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
    // if (indexW < 0) {
    //   console.log("You lost! Out of boundary");
    //   return currentlyPlaying === false;
    // } else if (indexW >= this._field[0].length) {
    //   console.log("You lost! Out of boundary");
    //   return currentlyPlaying === false;
    // }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        // console.log(arr[i][j]);
      }
    }
    if (this.indexOfItem(this._field, hat) === false) {
      console.log("Congratulations! You found the hat.");
      currentlyPlaying = false;
    }
  }

  ifWin() {
    switch (this._field[indexH][indexW]) {
      case hole:
        console.log("You lost!!!");
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
      // Field.generateField(this._field);
      // this.indexOfItem(this._field, hat);
      // this.checkIfWin(this._field);
      // console.log([indexH], [indexW]);
      if (currentlyPlaying) {
        this.nextMove();
        this.ifWin();
      }

      // console.log([indexH, indexW]);
      // console.log(this.indexOfItem(this._field, hat));
    }
    console.log("Game Over");
  }

  startOfGame() {
    // console.log(this._field[indexH][indexW]);
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

const myField = new Field([
  ["*", "░", "O", "░"],
  ["░", "O", "░", "░"],
  ["░", "^", "░", "O"],
  ["O", "░", "░", "░"],
]);

// const myField = new Field(Field.generateField(6, 6));
// game();
// console.log(this._field.generateField());
// console.log(myField.generateField());

myField.startOfGame();
