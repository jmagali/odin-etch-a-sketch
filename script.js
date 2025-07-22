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

slider.addEventListener("input", updateFillWidth);

// Initial call
updateFillWidth(); 
