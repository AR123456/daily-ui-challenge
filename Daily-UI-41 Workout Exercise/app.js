const toggleBtn = document.querySelector(".toggle");
const brief = document.querySelector(".brief");
const more = document.querySelector(".more");

toggleBtn.addEventListener("click", () => {
  more.classList.toggle("hide");
  brief.classList.toggle("hide");
});
