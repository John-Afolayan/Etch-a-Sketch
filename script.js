const sketch_frame = document.querySelector("#sketch_frame");
let isMouseDown = false;
let timeoutId; //For debouncing the slider input

function generateCells(column, row){
    sketch_frame.innerHTML = ''; // Clear old cells

    const sketchFrameSize = sketch_frame.getBoundingClientRect().width;
    const cellSize = sketchFrameSize / column;

    document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);

    document.documentElement.style.setProperty('--grid-col', column);
    document.documentElement.style.setProperty('--grid-row', row);
    for(let i=1; i <= column; i++) {
        for(let j=1; j <= row; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            sketch_frame.appendChild(cell);
        }
    }
}

function assignEventListeners() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        // Remove old event listeners
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);

        //Assign new event listener based on active button (mouse/hover or click)
        if (mouseButton.classList.contains('active')) {
            newCell.addEventListener('mouseover', changeColor);
        } else if (clickButton.classList.contains('active')) {
            newCell.addEventListener('click', changeColor);
            newCell.addEventListener('mouseover', () => {
                if (isMouseDown) {
                    changeColor.call(newCell);
                }
            });
        }
    });
}

function changeColor() {
    const color = getRandomColor();
    this.style.backgroundColor = '#' + color
}

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

var slider = document.getElementById("myRange");
var output = document.getElementById("frame_text_size");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;

  clearTimeout(timeoutId); //Clear existing timeout

  timeoutId = setTimeout(() => {
    generateCells(this.value, this.value);
    assignEventListeners();
  }, 200); // Set a delay of 500ms before updating cells
};

const mouseButton = document.querySelector(".mouse-sensitive-button");
const clickButton = document.querySelector(".click-sensitive-button");

mouseButton.addEventListener('click', function() {
  this.classList.add('active');
  clickButton.classList.remove('active');
  assignEventListeners();
});

clickButton.addEventListener('click', function() {
  this.classList.add('active');
  mouseButton.classList.remove('active');
  assignEventListeners();
});

window.addEventListener('mousedown', () => {
    isMouseDown = true;
  });
  
  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });
  

generateCells(5, 5);
assignEventListeners();
