const pineapple = document.querySelector(".pineapple");
const input = document.querySelector("#colorpicker");

input.addEventListener("input", changeColor);

function changeColor() {
  pineapple.setAttribute("fill", input.value);
}
