// toggle
// const expanded = document.querySelector(".nav-menu-expanded");
// const collapsed = document.querySelector(".nav-collapsed");

// collapsed.addEventListener("click", () => {
//   collapsed.classList.toggle("active");
//   expanded.classList.toggle("active");
// });
const menuToggle = document.querySelector(".toggle");
const container = document.querySelector(".container");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  container.classList.toggle("active");
});
