const slider = document.getElementById("slider");
const fill = document.getElementById("slider-fill");

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
    const val = parseFloat(slider.value);
    const grid = document.getElementById("grid")

    grid.innerHTML = '';

    const itemSize = 100 / val;

    
    for (let i = 0; i < val * val; i++) {
        let newGridItem = document.createElement("div");
        newGridItem.classList.add("grid-item");
        grid.appendChild(newGridItem);

        newGridItem.style.width = `${itemSize}%`;
        newGridItem.style.height = `${itemSize}%`;
    }
}

function updateGridSizeIndicator() {
    const val = parseFloat(slider.value);
    text = document.getElementById("grid-size-indicator");
    text.textContent = "Grid Size: " + val + " x " + val;
}

slider.addEventListener("input", updateFillWidth);
slider.addEventListener("input", createGridItems);
slider.addEventListener("input", updateGridSizeIndicator);

// Initial call
updateFillWidth(); 
createGridItems();
