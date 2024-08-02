// toggle
const expanded = document.querySelector(".nav-menu-expanded");
const collapsed = document.querySelector(".nav-collapsed");

collapsed.addEventListener("click", () => {
  collapsed.classList.toggle("active");
  expanded.classList.toggle("active");
});
