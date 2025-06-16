const toggle = document.querySelector(".toggle-prep");
const prep = document.querySelector(".prep");
const ingredients = document.querySelector(".ingredients");

toggle.addEventListener("click", () => {
  prep.classList.toggle("hide");
  ingredients.classList.toggle("hide");
});
