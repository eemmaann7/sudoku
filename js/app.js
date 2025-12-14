
let timerInterval
let seconds = 0
let mistakes = 0

var numSelected = null
var tileSelected = null

const board = document.getElementById("grid-board")

window.onload = function () {
  setGame()
}

function setGame() {
  // Create loop for digits (1–9)
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div")
    number.classList.add("number")
    number.innerText = i
    document.getElementById("digits").appendChild(number);
  }

  // Create board 9x9 tiles/cells
   for (let row = 0; row < 9; row++) {
        for (let colom = 0; colom < 9; colom++) {
            let tile = document.createElement("div")
            // "row - colom"
            tile.id = row.toString() + "-" + colom.toString()
            tile.classList.add("tile")
            document.getElementById("grid-board").append(tile)
        }
    }
}