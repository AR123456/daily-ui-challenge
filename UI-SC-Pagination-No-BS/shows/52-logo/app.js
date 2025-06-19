const start = document.getElementById("start");
const up = document.getElementById("up");
const startUp = document.getElementById("start-up");

window.onload = function () {
  // Initially hide all SVGs
  start.style.opacity = "0";
  up.style.opacity = "0";
  startUp.style.opacity = "0";
  start.style.display = "none";
  up.style.display = "none";
  startUp.style.display = "none";

  // Show the first SVG after 0.5s
  setTimeout(() => {
    start.style.display = "block";
    setTimeout(() => {
      start.style.opacity = "1"; // Fade in the first SVG
    }, 50);
    // start.setAttribute("fill", "red");
  }, 500);

  // Show the second SVG with overlap after 1.5s
  setTimeout(() => {
    up.style.display = "block"; // Make the second SVG visible
    setTimeout(() => {
      up.style.opacity = "1"; // Fade in the second SVG
    }, 50); // Small delay after displaying it

    setTimeout(() => {
      start.style.opacity = "0"; // Fade out the first SVG
      setTimeout(() => {
        start.style.display = "none"; // Hide it after fading out
      }, 500); // Delay long enough for the fade-out transition to complete
    }, 300); // Overlap the fade-in and fade-out by starting the fade-out after a short delay
  }, 1500);

  // Show the third SVG with overlap after 3s
  setTimeout(() => {
    startUp.style.display = "block"; // Make the third SVG visible
    setTimeout(() => {
      startUp.style.opacity = "1"; // Fade in the third SVG
    }, 50);

    setTimeout(() => {
      up.style.opacity = "0"; // Fade out the second SVG
      setTimeout(() => {
        up.style.display = "none"; // Hide it after fading out
      }, 500); // Delay long enough for the fade-out transition to complete
    }, 300); // Overlap the fade-in and fade-out
  }, 3000);
};
