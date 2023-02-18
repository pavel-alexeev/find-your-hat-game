const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {}
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
