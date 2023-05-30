const gridSizeInput = document.getElementById('grid-size');
const gridContainer = document.getElementById('grid-container');

let gridSize = 16;

const submitGridSize = function () {
    gridSize = gridSizeInput.value;
    createGrid(gridSize);
}

// create grid from the selected size
const createGrid = function (size) {

    const numOfCells = size**2;
    const gridColumns = '1fr '; 

    gridContainer.style.setProperty('--number-of-columns', '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr')

    for (let i = 0; i < numOfCells; i++) {
        
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.addEventListener('mouseover', modifyGridCell);
        gridContainer.appendChild(gridCell);
    }
}

const modifyGridCell = function(e) {
    console.log(e);
    this.style.backgroundColor = 'black';
}

// const createGrid = function (size) {
//     for (let i = 0; i < size; i++) {

//         const gridRow = document.createElement('div');
//         gridRow.classList.add('grid-row');

//         for (let j = 0; j < size; j++) {
//             const gridCell = document.createElement('div');
//             gridCell.classList.add('grid-cell');
//             gridRow.appendChild(gridCell);
//         }

//         gridContainer.appendChild(gridRow);
//     }
// }

createGrid(gridSize);