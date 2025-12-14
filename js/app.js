var numSelected = null
var tileSelected = null
var mistakes = 0

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

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
            if (board[row][colom] != "-") {
                tile.innerText = board[row][colom]
                tile.classList.add("tile-start")
            }
            if (row == 2 || row == 5) {
                tile.classList.add("horizontal-line")
            }
            if (colom == 2 || colom == 5) {
                tile.classList.add("vertical-line")
            }
            // puts the number selected in the tile
            tile.addEventListener("click", selectTile)
            tile.classList.add("tile")
            document.getElementById("board").append(tile)
        }
    }

}


//click on the tiles 
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
        // puts one number only in a tile no change
        if (this.innerText != "" ){
            return
        }
        // 0-0 0-1 ...
        let cells = this.id.split("-")
        let row = parseInt(cells[0])
        let colom = parseInt (cells[1])

        this.innerText = numSelected.id
        
        if (solution[row][colom] == numSelected.id){
            tile.id.style.color = "green"
        }
        else {
            this.style.color = "red"
            mistakes++
            document.getElementById("mistakes").innerText = mistakes + "/3"

            if (mistakes == 3){
                alert ("LOOSER , GAME OVER")
                newGame()
            }
        }
    }
}


function newGame(){
    mistakes = 0 
    document.getElementById("mistakes").innerText = "0/3"
    document.getElementById("board").innerHTML = ""
    document.getElementById("digits").innerHTML = ""


    numSelected = null 
    tileSelected = null 

    setGame() 
}