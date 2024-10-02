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
  // note that the HTML color picker uses hexadecimal notation
  const currentColor = colorPicker.value;
  const currentOpacity = Number(opacityPicker.value);
  setBackgroundColor(currentColor, currentOpacity);
  createHex(currentColor, currentOpacity);
  createRGB(currentColor, currentOpacity);
}
// get HEX color write to page
function createHex(color, opacity) {
  // get cell is the text in the td  of TR#HEX
  const cell = document.querySelector("#HEX td");
  if (opacity === 1) {
    cell.textContent = color;
  } else {
    cell.textContent = hexOpacity(color, opacity);
  }
}
// get RGB write to page
// convert hex to rgb Method 1
// https://stackoverflow.com/questions/75218925/i-want-to-convert-hex-color-to-rgb-color-with-input-type-color-in-react-js
// function createRGB(color, opacity) {
//   const cell = document.querySelector("#RGB td");
//   if (opacity === 1) {
//     numericValue = parseInt(color.slice(1), 16);
//     const r = (numericValue >> 16) & 0xff;
//     const g = (numericValue >> 8) & 0xff;
//     const b = numericValue & 0xff;
//     console.log(r, g, b);
//     return `[${r}, ${g}, ${b}]`;
//   } else {

//   }
// }
// get RGB write to page method mdn uses -MDM method
function createRGB(color, opacity) {
  const cell = document.querySelector("#RGB td");
  //strip the #
  color = color.substring(1, 7);
  // The regex /.{1,2}/g  to split string into array of pairs of two characters.
  const hexArray = color.match(/.{1,2}/g);
  // console.log(hexArray);
  // parseInt the values in each of the indexes
  const R = parseInt(hexArray[0], 16);
  const G = parseInt(hexArray[1], 16);
  const B = parseInt(hexArray[2], 16);

  if (opacity === 1) {
    cell.textContent = `rgb(${R} ${G} ${B})`;
  } else {
    cell.textContent = `rgb(${R} ${G} ${B} / ${opacity})`;
  }
  createHSL(R, G, B, opacity);
  createColorFunc(R, G, B, opacity);
  // console.log(R, G, B);
}
// to create sRGB is a standard RGB (red, green, blue) color space
function createColorFunc(r, g, b, opacity) {
  const cell = document.querySelector("#colorfunc td");

  const R = Number((r / 255).toFixed(2));
  const G = Number((g / 255).toFixed(2));
  const B = Number((b / 255).toFixed(2));
  if (opacity === 1) {
    cell.textContent = `color(srgb ${R} ${G} ${B})`;
  } else {
    cell.textContent = `color(srgb ${R} ${G} ${B} / ${opacity})`;
  }
  console.log(`color(srgb ${R} ${G} ${B} / ${opacity})`);
}
function createHSL(r, g, b, opacity) {
  // console.log(r, g, b, opacity);
}
function createHWB(h, s, l, opacity) {
  // console.log(h, s, l, opacity);
}
function setBackgroundColor(color, opacity) {
  //set the background color of the card div
  const card = document.querySelector(".card");
  if (opacity !== 1) {
    // run the hexOpacity function on the input
    color = hexOpacity(color, opacity);
  }
  card.style.backgroundColor = color;

  //css accent color for color and range input
  opacityPicker.style.accentColor = color;
  colorPicker.style.accentColor = color;
}
function hexOpacity(color, opacity) {
  // 0.0 - 1.0 range is just a percentage format of the 0-255 range. So multiply your value (e.g. 0.5 * 255) then convert to hex yourNum = yourNum.toString(16)
  // https://stackoverflow.com/questions/2877322/convert-opacity-to-hex-in-javascript
  // char holder for converting decimal to hex
  let char = "00";
  if (opacity > 0) {
    // .toString(16)-Base 16: Hexadecimal, 16 symbols: [0, 9] and [A, F]
    char = Math.floor(opacity * 255).toString(16);
  }
  // return the original hex color append to it the hex opacity of char
  return `${color}${char}`;
}
