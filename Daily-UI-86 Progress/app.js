document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");
  const grid = document.querySelector(".grid");
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < 6; i++) {
    grid.append(cardTemplate.content.cloneNode(true));
  }

  progressBar.addEventListener("mouseenter", () => {
    progressBar.style.setProperty("--width", "100");
  });
  progressBar.addEventListener("mouseleave", () => {
    progressBar.style.setProperty("--width", "0");
  });
});
