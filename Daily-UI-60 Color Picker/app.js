const colorPicker = document.getElementById("color");
const opacityPicker = document.getElementById("opacity");

document.addEventListener("readystatechange", () => {
  document.querySelector("dialog").show();
  createColor();
});

function createColor() {
  const currentColor = colorPicker.value;
  const currentOpacity = Number(opacityPicker.value);
  setBackgroundColor(currentColor, currentOpacity);
  createHex(currentColor, currentOpacity);
  createRGB(currentColor, currentOpacity);
}

function setBackgroundColor(color, opacity) {
  console.log(color, opacity);
}
function createHex(color, opacity) {
  console.log(color, opacity);
}
function createRGB(color, opacity) {
  console.log(color, opacity);
}

function createColorFunc(r, g, b, opacity) {
  console.log(r, g, b, opacity);
}
function createHSL(r, g, b, opacity) {
  console.log(r, g, b, opacity);
}
function createHWB(h, s, l, opacity) {
  console.log(h, s, l, opacity);
}
function setBackgroundColor(color, opacity) {
  console.log(color, opacity);
}
function hexOpacity(color, opacity) {
  console.log(color, opacity);
}
