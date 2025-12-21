var numSelected = null
var tileSelected = null
var mistakes = 0
// ===== TIMER =====
var seconds = 0
var timer = null
var paused = false

// ===== LEVELS =====
var boards = {
    easy: [
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ],
       medium: [
        "53--7----",
        "6--195---",
        "-98----6-",
        "8---6---3",
        "4--8-3--1",
        "7---2---6",
        "-6----28-",
        "---419--5",
        "----8--79"
    ],
    hard: [
        "-----6---",
        "---3--5--",
        "--8---9--",
        "-4--1----",
        "---8-6---",
        "----2--7-",
        "--1---4--",
        "--7--9---",
        "---5-----"
    ]
}

var solutions = {
    easy: [
        "387491625",
        "241568379",
        "569327418",
        "758619234",
        "123784596",
        "496253187",
        "934176852",
        "675832941",
        "812945763"
    ],
    medium: [
        "534678912",
        "672195348",
        "198342567",
        "859761423",
        "426853791",
        "713924856",
        "961537284",
        "287419635",
        "345286179"
    ],
    hard: [
        "913846752",
        "746352198",
        "258197364",
        "349718625",
        "127865439",
        "865423971",
        "691234587",
        "582679143",
        "473591286"
    ]
}

// ===== TIME PER LEVEL =====
var levelTime = {
    easy: 420,   // 7 minutes
    medium: 300, // 5 minutes
    hard: 240    // 4 minutes
}

// ===== ON LOAD =====
window.onload = function () {
    let pauseButton = document.getElementById("pauseBtn")
    if (pauseButton) pauseButton.addEventListener("click", pauseGame)
    newGame()
}

// ===== GAME SETUP =====
function setGame() {
  // Create loop for digits (1–9)
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div")
        number.innerText = i
        number.id = i
        number.classList.add("number")
        //when number is selected call this function
        number.addEventListener("click", selectNumber)
        document.getElementById("digits").append(number)
    }

    // Create board 9x9 tiles/cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.createElement("div")
            // "row - colom"
            tile.id = row + "-" + col
            let val = board[row][col]
            if (val != "-") {
                tile.innerText = val
                tile.classList.add("tile-start")
            }
            // 3x3 box lines
            if (row == 2 || row == 5) tile.classList.add("horizontal-line")
            if (col == 2 || col == 5) tile.classList.add("vertical-line")

            // puts the number selected in the tile
            tile.classList.add("tile")
            tile.addEventListener("click", selectTile)
            document.getElementById("board").append(tile)
        }
    }
}

// ===== SELECT NUMBER =====
//click on the tiles 
function selectNumber() {
    if (numSelected) numSelected.classList.remove("selected-number")
    numSelected = this
    numSelected.classList.add("selected-number")
}

// ===== SELECT TILE =====
function selectTile() {
    if (paused) return
    if (!numSelected) return
    if (this.innerText != "") return

    tileSelected = this
    clearHighlights()
    tileSelected.classList.add("selected-tile")
    highlightTile(tileSelected)

    let coords = this.id.split("-")
    let row = parseInt(coords[0])
    let col = parseInt(coords[1])

    this.innerText = numSelected.id

    if (solutions[level][row][col] == numSelected.id) {
        this.style.color = "green"
    } else {
        this.style.color = "red"
        mistakes++
        document.getElementById("mistakes").innerText = mistakes + "/3"
        if (mistakes >= 3) {
            alert("LOOSER! Game Over")
            newGame()
        }
    }
}

// ===== HIGHLIGHT (ROW + COLUMN + 3x3) =====
function highlightTile(tile) {
    let coords = tile.id.split("-")
    let row = parseInt(coords[0])
    let col = parseInt(coords[1])
    let boxRow = Math.floor(row / 3) * 3
    let boxCol = Math.floor(col / 3) * 3

    let allTiles = document.getElementsByClassName("tile")
    for (let t of allTiles) {
        let c = t.id.split("-")
        let r = parseInt(c[0])
        let co = parseInt(c[1])
        if (r == row || co == col || (r >= boxRow && r < boxRow + 3 && co >= boxCol && co < boxCol + 3)) {
            if (t != tile) t.classList.add("highlight")
        }
    }
}

function clearHighlights() {
    let allTiles = document.getElementsByClassName("tile")
    for (let t of allTiles) {
        t.classList.remove("highlight")
        t.classList.remove("selected-tile")
    }
}

// ===== TIMER =====
function updateTimerDisplay() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    document.getElementById("timer").innerText =
        (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s
}

function startTimer() {
    clearInterval(timer)
    timer = setInterval(function() {
        if (!paused) {
            seconds--
            updateTimerDisplay()
            if (seconds <= 0) {
                clearInterval(timer)
                alert("Time's up! Game Over")
                newGame()
            }
        }
    }, 1000)
}

// ===== PAUSE =====
function pauseGame() {
    paused = !paused
}

// ===== NEW GAME =====
var level = "easy"
var board = boards[level]
var solution = solutions[level]

function newGame() {
    clearInterval(timer)
    paused = false
    mistakes = 0
    
    document.getElementById("mistakes").innerText = "0/3"
    document.getElementById("board").innerHTML = ""
    document.getElementById("digits").innerHTML = ""

    numSelected = null
    tileSelected = null

    let diffSelect = document.getElementById("difficulty")
    level = diffSelect ? diffSelect.value : "easy"

    board = boards[level]
    solution = solutions[level]

    // Set time based on level
    seconds = levelTime[level] || 420
    updateTimerDisplay()

    setGame()
    startTimer()
}