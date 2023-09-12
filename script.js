const sketch_frame = document.querySelector("#sketch_frame");

function generateCells(column, row){
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
                console.log("a");
                const color = getRandomColor();
                cell.style.backgroundColor = '#' + color;
            });
        }
    }
}

generateCells(15, 15);

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}