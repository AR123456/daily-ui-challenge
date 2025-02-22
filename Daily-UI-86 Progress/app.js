document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector(".progress-bar");
  let progress = 0;
  let startTime;

  function animateProgressBar(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (elapsed < 3000) {
      progress = Math.min(100, elapsed / 30);
      progressBar.style.setProperty("--width", progress);
      requestAnimationFrame(animateProgressBar);
    } else {
      console.log("Animation completed");
    }
  }

  requestAnimationFrame(animateProgressBar);
});
