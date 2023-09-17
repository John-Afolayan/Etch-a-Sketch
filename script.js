'use strict';

const sketch_frame = document.querySelector("#sketch_frame");
let isMouseDown = false;
let timeoutId; // For debouncing the slider input

const mouseButton = document.querySelector(".mouse-sensitive-button");
const clickButton = document.querySelector(".click-sensitive-button");

document.addEventListener("DOMContentLoaded", function () {
  const pickColorRadio = document.querySelector('input[value="pickColor"]');
  const randomColorRadio = document.querySelector('input[value="randomColor"]');
  const colorPicker = document.getElementById("colorPicker");

  // Function to handle radio button selection
  function handleColorOptionChange() {
    if (pickColorRadio.checked) {
      colorPicker.disabled = false;
    } else {
      colorPicker.disabled = true;
    }
  }

  pickColorRadio.addEventListener("change", handleColorOptionChange);
  randomColorRadio.addEventListener("change", handleColorOptionChange);
});

function generateCells(column, row) {
  sketch_frame.innerHTML = ""; // Clear old cells

  try {
    const sketchFrameSize = sketch_frame.getBoundingClientRect().width;
    const cellSize = sketchFrameSize / column;

    document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
    document.documentElement.style.setProperty("--grid-col", column);
    document.documentElement.style.setProperty("--grid-row", row);

    for (let i = 1; i <= column; i++) {
      for (let j = 1; j <= row; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        sketch_frame.appendChild(cell);
      }
    }
  } catch (error) {
    console.error("Error generating cells:", error);
  }
}


function assignEventListeners() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    try {
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);

      if (mouseButton.classList.contains("active")) {
        newCell.addEventListener("mouseover", changeColor);
      } else if (clickButton.classList.contains("active")) {
        newCell.addEventListener("click", changeColor);
        newCell.addEventListener("mouseover", () => {
          if (isMouseDown) {
            changeColor.call(newCell);
          }
        });
      }
    } catch (error) {
      console.error("Error assigning event listeners:", error);
    }
  });
}

function changeColor() {
  const pickColorRadio = document.querySelector('input[value="pickColor"]');
  const color = pickColorRadio.checked ? colorPicker.value : getRandomColor();
  this.style.backgroundColor = color;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", function () {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("frame_text_size");
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = this.value;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      generateCells(this.value, this.value);
      assignEventListeners();
    }, 200);
  };

  mouseButton.addEventListener("click", function () {
    this.classList.add("active");
    clickButton.classList.remove("active");
    assignEventListeners();
  });
  
  clickButton.addEventListener("click", function () {
    this.classList.add("active");
    mouseButton.classList.remove("active");
    assignEventListeners();
  });

  window.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  window.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  generateCells(5, 5);
  assignEventListeners();
});
