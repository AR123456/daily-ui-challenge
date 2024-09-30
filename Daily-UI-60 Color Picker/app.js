const colorPicker = document.getElementById("color");
const opacityPicker = document.getElementById("opacity");

document.addEventListener("readystatechange", () => {
  // The show() method of the HTMLDialogElement interface displays the dialog modelessly, i.e. still allowing interaction with content outside of the dialog.
  document.querySelector("dialog").show();
  createColor();
});
colorPicker.addEventListener("change", () => {
  createColor();
});
opacityPicker.addEventListener("change", () => {
  createColor();
});

function createColor() {
  const currentColor = colorPicker.value;
  const currentOpacity = Number(opacityPicker.value);
  setBackgroundColor(currentColor, currentOpacity);
  createHex(currentColor, currentOpacity);
  createRGB(currentColor, currentOpacity);
}

function createHex(color, opacity) {
  // get cell is the text in the td  of TR#HEX
  const cell = document.querySelector("#HEX td");
  if (opacity === 1) {
    cell.textContent = color;
  } else {
    console.log("run the hexOpacity function");
  }
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
