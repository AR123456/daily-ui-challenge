let r = document.querySelector(":root");
const stock = document.querySelector(".num-stock").innerHTML;
const percentage = document.querySelector(".percentage").clientWidth;
const mask = document.querySelector(".mask").clientWidth;

console.log(stock);
console.log(percentage);
console.log(mask);

function gageVal_get() {
  let gagePercent = stock;
}
function gageVal_set() {
  r.style.setProperty("-- --rotation", stock);
}
gageVal_set();
