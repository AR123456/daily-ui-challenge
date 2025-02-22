// getting first ele of this array - why not just get it since there is only one  in this case?

const progressBar = document.getElementsByClassName("progress-bar")[0];
// call the function within at particular interval
let interval = setInterval(() => {
  // get current width of progress bar
  const computedStyle = getComputedStyle(progressBar);
  // increment width
  // get string and make into num with parseFloat
  // if it does not exist set to 0
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  // now set the width to the calculated width and increment 0.1 every 5 sec
  progressBar.style.setProperty("--width", width + 0.1);
  // every 5 mili sec
}, 5);
// Clear interval after 3 seconds
setTimeout(() => {
  clearInterval(interval);
  console.log("Interval cleared after 3 seconds");
}, 3000);
