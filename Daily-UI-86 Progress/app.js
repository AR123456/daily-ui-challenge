document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");

  progressBar.addEventListener("mouseenter", () => {
    progressBar.style.setProperty("--width", "100");
  });
  progressBar.addEventListener("mouseleave", () => {
    progressBar.style.setProperty("--width", "0");
  });
});
