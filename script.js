const container = document.querySelector("#container");

function generateCells(column, row){
    document.documentElement.style.setProperty('--grid-col', column);
    document.documentElement.style.setProperty('--grid-row', row);
    for(let i=1; i <= column; i++) {
        for(let j=1; j <= row; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            container.appendChild(cell);

            
            cell.addEventListener('mouseover', ()=> {
                console.log("a");
                const color = getRandomColor();
                cell.style.backgroundColor = '#' + color;
            });
        }
    }
}

generateCells(3, 5);

function getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}