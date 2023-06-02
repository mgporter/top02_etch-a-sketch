const gridSizeInput = document.getElementById('grid-size');
const gridContainer = document.getElementById('grid-container');
const colorCircles = document.querySelectorAll('.color-circle');

let gridSize = 16;
let color = "red";

const submitGridSize = function () {
    gridSize = gridSizeInput.value;
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild)
    }
    createGrid(gridSize);
}

// create grid from the selected size
const createGrid = function (size) {

    const numOfCells = size**2;
    const gridColumns = '1fr '.repeat(size);

    gridContainer.style.setProperty('--number-of-columns', gridColumns)

    for (let i = 0; i < numOfCells; i++) {
        
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.style.backgroundColor = 'rgb(255, 255, 255)'; // set initial color of cells
        gridCell.addEventListener('mouseover', colorGridCell);
        gridContainer.appendChild(gridCell);
    }
}

// Set the color of the paintbrush and also add the drop-shadow to the selected color
const setColor = function (colorFromButton) {
    color = colorFromButton;        // set color from the button's function call
    let shadowColor;

    switch (colorFromButton) {
        case 'red':
            shadowColor = '#ffa37dff';
            break;
        case 'yellow':
            shadowColor = '#fdd117ff';
            break;
        case 'green':
            shadowColor = '#7ef725ff';
            break;
        case 'blue':
            shadowColor = '#62ddffff';
            break;
    }

    colorCircles.forEach((item) => {
        if (item.id != colorFromButton) {
            item.style.setProperty('filter', `hue-rotate(${item.dataset.hue}deg) drop-shadow(0 0 0 #ffffff)`)
        } else {
            item.style.setProperty('filter', `hue-rotate(${item.dataset.hue}deg) drop-shadow(0 0 12px ${shadowColor})`)
        }
    })
    
}


// calculate the new value for an individual color
const subtractFromColor = function (oldColor) {
    let colorWeight = 36;       // the weight tells us how much we want to color the cell on each mouseover
    let newColor = oldColor - colorWeight
    if (newColor < 0) {
        return 0;
    } else {
        return newColor;
    }
}

// calculate the cell's bg color based on the cell's current color and the current color setting
const colorGridCell = function(e) {
    let bgColor = this.style.backgroundColor.match(/rgb\((\d+), (\d+), (\d+)\)/i);
    let red = bgColor[1];
    let green = bgColor[2];
    let blue = bgColor[3];

    switch (color) {
        case 'red':
            green = subtractFromColor(green)
            blue = subtractFromColor(blue)
            break;
        case 'yellow':
            blue = subtractFromColor(blue)
            break;
        case 'green':
            red = subtractFromColor(red)
            blue = subtractFromColor(blue)
            break;
        case 'blue':
            green = subtractFromColor(green)
            red = subtractFromColor(red)
            break;
    }

    bgColor = `rgb(${red}, ${green}, ${blue})`

    this.style.backgroundColor = bgColor;
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