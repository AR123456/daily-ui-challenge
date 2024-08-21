const toggleBtn = document.querySelector(".toggle");
const brief = document.querySelector(".brief");
const more = document.querySelector(".more");

toggleBtn.addEventListener("click", () => {
  more.classList.toggle("hide");
  // change button to "see steps "
  brief.classList.toggle("hide");
});
