const colorPicker = document.getElementById("color");
const opacityPicker = document.getElementById("opacity");
const red = document.querySelector("#red img");
const green = document.querySelector("#green img");
const blue = document.querySelector("#blue img");

colorPicker.addEventListener("input", () => {
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
function createHex(color, opacity) {
  const cell = document.querySelector("#HEX td");
  if (opacity === 1) {
    cell.textContent = color;
  } else {
    cell.textContent = hexOpacity(color, opacity);
  }
}
// get RGB write to page method mdn uses -MDM method
function createRGB(color, opacity) {
  const cell = document.querySelector("#RGB td");
  //strip the #
  color = color.substring(1, 7);
  // The regex /.{1,2}/g  to split string into array of pairs of two characters.
  const hexArray = color.match(/.{1,2}/g);
  // pass the array to fillDrops to display colors r,g,b parts
  fillDrops(hexArray);
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
}
function fillDrops(arr) {
  const red = document.querySelector("#red svg");
  const green = document.querySelector("#green svg");
  const blue = document.querySelector("#blue svg");
  // fill the drops with just the hex for red green or blue
  red.style.fill = `#${arr[0]}0000`;
  green.style.fill = `#00${arr[1]}00`;
  blue.style.fill = `#0000${arr[2]}`;
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
}

function createHSL(r, g, b, opacity) {
  const cell = document.querySelector("#HSL td");
  // Let's have r, g, b in the range [0, 1]
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // We want an angle between 0 and 360°
  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Number((s * 100).toFixed(1));
  l = Number((l * 100).toFixed(1));

  if (opacity === 1) {
    cell.textContent = `hsl(${h} ${s}% ${l}%)`;
  } else {
    cell.textContent = `hsl(${h} ${s}% ${l}% / ${opacity})`;
  }
  createHWB(h, s, l, opacity);
}
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb
function createHWB(h, s, l, opacity) {
  const cell = document.querySelector("#HWB td");
  const chroma = s * (1 - Math.abs(l / 50 - 1));
  let W = l - chroma / 2;
  let B = 100 - l - chroma / 2;
  W = W.toFixed(1);
  B = B.toFixed(1);
  if (opacity === 1) {
    cell.textContent = `hwb(${h} ${W}% ${B}%)`;
  } else {
    cell.textContent = `hwb(${h} ${W}% ${B}% / ${opacity})`;
  }
}
function setBackgroundColor(color, opacity) {
  const bod = document.querySelector("body");
  if (opacity !== 1) {
    color = hexOpacity(color, opacity);
  }
  bod.style.backgroundColor = color;
  //css accent color for color and range input
  opacityPicker.style.accentColor = color;
  colorPicker.style.accentColor = color;
}
function hexOpacity(color, opacity) {
  let char = "00";
  if (opacity > 0) {
    char = Math.floor(opacity * 255).toString(16);
  }

  return `${color}${char}`;
}
