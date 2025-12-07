const board = document.getElementById('grid-board');
const width = 9; // determining the width of the grid
const height = 9; // determining the height of the grid

for (let i = 0; i < width * height; i++){ // you can put the number of cells you want
    const block = document.createElement('div');
    block.classList.add('cell');
    cells.push(block);
    board.appendChild(block);
}