const slider = document.getElementById("slider");
const fill = document.getElementById("slider-fill");
const clearBtn = document.getElementById("clear-grid");
const val = parseFloat(slider.value);

let isPen = true;
let isEraser = false;
let isBlack = true;
let isRainbow = false;
let isShade = false;
let penColour = "black";

function updateFillWidth() {
  getOffset(slider);
  slider.style.top = getOffset(slider).top;
  slider.style.left = getOffset(slider).left;
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const percent = ((val - min) / (max - min));
  const sliderWidth = slider.offsetWidth;
  fill.style.width = percent * 135 + "px";
}

function getOffset(slider) {
  const rect = slider.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function createGridItems() {
    const grid = document.getElementById("grid");
    const val = parseFloat(slider.value);

    grid.innerHTML = '';

    const itemSize = 100 / val;

    
    for (let i = 0; i < val * val; i++) {
        let newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");
        newGridItem.id = `${i}`;
        grid.appendChild(newGridItem);
        newGridItem.addEventListener("mousedown", function () {changeColour(newGridItem);});

        newGridItem.style.width = `${itemSize}%`;
        newGridItem.style.height = `${itemSize}%`;
    }
}

function updateGridSizeIndicator() {
    const val = parseFloat(slider.value);
    text = document.getElementById("grid-size-indicator");
    text.textContent = "Grid Size: " + val + " x " + val;
}

function clearScreen() {
    for (let i = 0; i < val * val; i++) {
        let item = document.getElementById(`${i}`);
        item.style.backgroundColor = "white";
    }
}

function changeColour (item) {
    if (isPen) {
        item.style.backgroundColor = penColour;
    }
    else {
        item.style.backgroundColor = "white";
    }
}

slider.addEventListener("input", updateFillWidth);
slider.addEventListener("input", createGridItems);
slider.addEventListener("input", updateGridSizeIndicator);
clearBtn.addEventListener("click", clearScreen);

// Initial call
updateFillWidth(); 
createGridItems();
