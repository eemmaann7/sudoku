let timerInterval
let seconds = 0
let mistakes = 0

const board = document.getElementById("grid-board")

window.onload = function () {
  setGame()
}

function setGame() {
  let boardEl = document.getElementById("grid-board")
  boardEl.innerHTML = ""
 
  // Reset
  seconds = 0
  mistakes = 0
  gameStarted = false
  gameOver = false

  document.getElementById("timer").innerText = "00:00"
  document.getElementById("mistakes").innerText = "0/3"
  clearInterval(timerInterval)
  
  // Load puzzle
  let difficulty = document.getElementById("difficulty").value

  // Create board tiles/cells
   for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div")
            // "row - colom"
            tile.id = r.toString() + "-" + c.toString()
            tile.addEventListener("click", selectTile)
            tile.classList.add("tile")
            document.getElementById("grid-board").append(tile)
        }
    }


  // Buttons
  document.getElementById("newBtn").onclick = setGame

  document.getElementById("pauseBtn").onclick = function () {
    if (gameOver) return 

    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
      this.innerText = "Resume"
    } else {
      startTimer();
      this.innerText = "Pause"
    }
  }
}

// Create loop for digits (1–9)
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div")
    number.classList.add("number")
    number.innerText = i
    document.getElementById("digits").appendChild(number);
  }

// TIMER
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++
    let mins = String(Math.floor(seconds / 60)).padStart(2, "0")
    let secs = String(seconds % 60).padStart(2, "0")
    document.getElementById("timer").innerText = `${mins}:${secs}`
  }, 1000)
}
function endGame() {
  gameOver = true
  clearInterval(timerInterval)
  alert("Game Over ! ")
}

