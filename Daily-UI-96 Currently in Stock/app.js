// https://www.w3schools.com/css/css3_variables_javascript.asp

let r = document.querySelector(":root");
const stock = document.querySelector(".num-stock").innerHTML;
const percentage = document.querySelector(".percentage").clientWidth;
const mask = document.querySelector(".mask").clientWidth;

console.log(stock);
console.log(percentage);
console.log(mask);

function gageVal_get() {
  let rs = getComputedStyle(r);
  // console.log(rs);
  console.log(rs.getPropertyValue("--rotation").slice(0, 2));
}
// gageVal_get();
function gageVal_set() {
  let rs = getComputedStyle(r);
  console.log(rs.getPropertyValue("--rotation").slice(0, 2));
  r.style.setProperty("--rotation", "stock");
}
gageVal_set();
