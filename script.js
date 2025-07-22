const slider = document.getElementById("slider");
const fill = document.getElementById("slider-fill");
const clearBtn = document.getElementById("clear-grid");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const blackBtn = document.getElementById("standard-colour");
const rainbowBtn = document.getElementById("rainbow-colour");
const shadingBtn = document.getElementById("shading-colour");
const rainbowBox = document.getElementById("rainbow-box");
const shadeBox = document.getElementById("shading-box");
const gridBox = document.getElementById("grid");
const val = parseFloat(slider.value);

let isPen = true;
let isEraser = false;
let isBlack = true;
let isRainbow = false;
let isShade = false;
let penColour = "black";
let clickCount = 1;

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
    const val = parseFloat(slider.value);
    for (let i = 0; i < val * val; i++) {
        let item = document.getElementById(`${i}`);
        item.style.backgroundColor = "white";
    }
}

function changeColour (item) {
    if (isPen) {
        if (isBlack) {
            item.style.backgroundColor = penColour;
        }
        else if (isRainbow) {
            penColour = generateRainbowColour();
            item.style.backgroundColor = penColour;
        }
        else {
            penColour = generateShadeColour ();
            item.style.backgroundColor = penColour;
            indicateShadeColour(penColour)
        }

        indicateRainbowColour(penColour);
    }
    else {
        item.style.backgroundColor = "white";
    }
}

function changeButtonColour () {
    if (isPen) {
        penBtn.style.backgroundColor = "#A31D1D";
        eraserBtn.style.backgroundColor = "#E5D0AC";
    }
    else {
        penBtn.style.backgroundColor = "#E5D0AC";
        eraserBtn.style.backgroundColor = "#A31D1D";
    }
    if (isBlack) {
        blackBtn.style.backgroundColor = "#A31D1D";
        rainbowBtn.style.backgroundColor = "#E5D0AC";
        shadingBtn.style.backgroundColor = "#E5D0AC";
    } else if (isRainbow) {
        blackBtn.style.backgroundColor = "#E5D0AC";
        rainbowBtn.style.backgroundColor = "#A31D1D";
        shadingBtn.style.backgroundColor = "#E5D0AC";
    } else if (isShade) {
        blackBtn.style.backgroundColor = "#E5D0AC";
        rainbowBtn.style.backgroundColor = "#E5D0AC";
        shadingBtn.style.backgroundColor = "#A31D1D";
    }
}

function indicateRainbowColour(colour) {
    if (isRainbow) {
        rainbowBox.textContent = "";
        rainbowBox.style.backgroundColor = colour;
    }
    else {
        rainbowBox.textContent = "❓";
        rainbowBox.style.backgroundColor = "darkgray";
    }
}

function indicateShadeColour(colour) {
    if (isShade) {
        shadeBox.style.backgroundColor = colour;
    }
    else {
        shadeBox.style.backgroundColor = "E6E6E6";
    }
}

function generateRainbowColour () {
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function generateShadeColour () {
    return `rgba(0, 0, 0, ${clickCount / 10})`;
}

slider.addEventListener("input", updateFillWidth);
slider.addEventListener("input", createGridItems);
slider.addEventListener("input", updateGridSizeIndicator);
clearBtn.addEventListener("click", clearScreen);
penBtn.addEventListener("click", function () {
    isPen = true;
    isEraser = false;
    changeButtonColour ();
});
eraserBtn.addEventListener("click", function () {
    isPen = false;
    isEraser = true;
    changeButtonColour ();
});
blackBtn.addEventListener("click", function () {
    isBlack = true;
    isRainbow = false;
    isShade = false;
    penColour = "black";
    changeButtonColour ();
    indicateRainbowColour(penColour);
});
rainbowBtn.addEventListener("click", function () {
    isBlack = false;
    isRainbow = true;
    isShade = false;
    changeButtonColour ();
});
shadingBtn.addEventListener("click", function () {
    isBlack = false;
    isRainbow = false;
    isShade = true;
    changeButtonColour ();
});
gridBox.addEventListener("click", function () {
    if (clickCount < 10) {
        clickCount++;
    }
    else {
        clickCount = 0;
    }
});

// Initial call
updateFillWidth(); 
createGridItems();
changeButtonColour();
