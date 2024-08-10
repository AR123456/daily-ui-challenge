const pineapple = document.querySelector(".pineapple");
const inputColor = document.querySelector("#colorpicker");
const inputSize = document.querySelector("#sizepicker");

inputColor.addEventListener("input", changeColor);
inputSize.addEventListener("input", changeSize);

function changeColor() {
  pineapple.setAttribute("fill", inputColor.value);
}
function changeSize() {
  if (inputSize.value === "Small") {
    pineapple.setAttribute("height", "100px");
  }
  if (inputSize.value === "Medium") {
    pineapple.setAttribute("height", "200px");
    pineapple.setAttribute("width", "200px");
  }
  if (inputSize.value === "Large") {
    pineapple.setAttribute("height", "300px");
    pineapple.setAttribute("width", "300px");
  }
}
