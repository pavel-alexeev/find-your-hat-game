const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this.x = 0;
    this.y = 0;
  }

  print() {
    return this._field.map((row) => row.join("")).join("\n");
  }

  charPossition() {
    this._field[this.y][this.x] = pathCharacter;
    // do {
    //   this.nextMove();
    // } while (pathCharacter !== hat);
  }

  hatPossition() {}

  endOfGame() {
    // if()
  }

  nextMove() {
    do {
      let move = prompt(
        "Your next move? 'u' for up, 'l' for left, 'd' for down, 'r' for right"
      );
      switch (move) {
        case "u":
          this.y--;
          console.log("Moving Up");
          break;
        case "r":
          this.x++;
          console.log("Moving Right");
          console.log(this.x);
          break;
        case "d":
          this.y++;
          console.log("Moving Down");
          console.log(this.y);
          break;
        case "l":
          this.x--;
          console.log("Moving Left");
          break;
        default:
          return "Please try right movement";
      }
    } while (!this.endOfGame());
  }
}

const myField = new Field([
  ["*", "░", "O", "░"],
  ["░", "O", "░", "░"],
  ["░", "^", "░", "O"],
  ["O", "░", "░", "░"],
]);

console.log(myField.charPossition());
console.log(myField.print());
console.log(myField.nextMove());

// const age = prompt("How old are you? ");
// console.log(`You are ${age} years old.`);
