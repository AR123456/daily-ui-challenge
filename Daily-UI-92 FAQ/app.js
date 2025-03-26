const expand = document.querySelector(".col-expander");
const contract = document.querySelector(".col-contractor");
const short = document.querySelector(".short");
const long = document.querySelector(".long");

expand.addEventListener("click", () => {
  console.log("click");
  short.classList.add("hidden");
  long.classList.remove("hidden");
});
contract.addEventListener("click", () => {
  console.log("click");
  long.classList.add("hidden");
  short.classList.remove("hidden");
});
