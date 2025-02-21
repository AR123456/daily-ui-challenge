// getting first ele of this array - why not just get it since there is only one  in this case?

const progressBar = document.getElementsByClassName("progress-bar")[0];
// call the function within at particular interval
setInterval(() => {
  const computedStyle = getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  progressBar.style.setProperty("--width", width + 0.1);
}, 5);
