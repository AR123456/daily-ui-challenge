// toggle
// const expanded = document.querySelector(".nav-menu-expanded");
// const collapsed = document.querySelector(".nav-collapsed");

// collapsed.addEventListener("click", () => {
//   collapsed.classList.toggle("active");
//   expanded.classList.toggle("active");
// });
const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
});
