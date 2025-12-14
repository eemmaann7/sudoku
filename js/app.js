
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
    number.id = i
    number.innerText = i
    //when number is selected call this function 
    number.addEventListener("click",selectNumber )
    number.classList.add("number")
    document.getElementById("digits").appendChild(number);
  }

  // Create board 9x9 tiles/cells
   for (let row = 0; row < 9; row++) {
        for (let colom = 0; colom < 9; colom++) {
            let tile = document.createElement("div")
            // "row - colom"
            tile.id = row.toString() + "-" + colom.toString()
            // puts the number selected in the tile
            tile.addEventListener("click", selectTile)
            tile.classList.add("tile")
            document.getElementById("grid-board").append(tile)
        }
    }
}

//click the tiles 
function selectNumber (){
    // highlight only one number
    if (numSelected != null){
        numSelected.classList.remove("selected-number")
    }
    numSelected = this
    //highlight the selected number 
    numSelected.classList.add("selected-number")
}

function selectTile (){
    // make sure the number is selected
    if (numSelected){
        this.innerText = numSelected.id
    }
}