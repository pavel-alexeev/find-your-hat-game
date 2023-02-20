const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
currentlyPlaying = true;

class Field {
  constructor(field) {
    this._field = field;
    this.y = 0;
    this.x = 0;
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

  static generateField(width, height) {
    for (i = 0; i < width; i++) {
      this._field.push(hole);
    }
    for (i = 0; i < height; i++) {
      this._field.push(hole);
    }
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
          console.log(this.y);
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
          console.log(this.x);
          break;
        default:
          return "Please try right movement";
      }
      this._field[this.y][this.x] = pathCharacter;
      // console.log(this._field);
    } while (!this.endOfGame());
  }
}

function game() {
  while (currentlyPlaying) {
    console.log(myField.print());
    // console.log(myField._field);
    // console.log(myField.charPossition());
    myField.nextMove();
  }
  return "game over";
}

// const myField = new Field([
//   ["*", "░", "O", "░"],
//   ["░", "O", "░", "░"],
//   ["░", "^", "░", "O"],
//   ["O", "░", "░", "░"],
// ]);

const myField = new Field(Field.generateField(6, 6));

game();
