const sketch_frame = document.querySelector("#sketch_frame");

function generateCells(column, row){
    // Clear old cells
    while (sketch_frame.firstChild) {
        sketch_frame.firstChild.remove();
    }
    
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

            
            cell.addEventListener('mouseover', ()=> {
                const color = getRandomColor();
                cell.style.backgroundColor = '#' + color;
            });
        }
    }
}

generateCells(5, 5);

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

var slider = document.getElementById("myRange");
var output = document.getElementById("frame_text_size");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  generateCells(this.value, this.value);
}