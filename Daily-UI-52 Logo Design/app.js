const start = document.getElementById("start");
const up = document.getElementById("up");
const startUp = document.getElementById("start-up");

start.addEventListener("click", function () {
  // Initially hide all SVGs
  start.style.opacity = "0";
  up.style.opacity = "0";
  startUp.style.opacity = "0";
  start.style.display = "none";
  up.style.display = "none";
  startUp.style.display = "none";

  // Show the first SVG after 0.5s
  setTimeout(() => {
    start.style.display = "block"; // Ensure it's visible
    setTimeout(() => {
      start.style.opacity = "1"; // Then fade it in
    }, 50); // Small delay to allow the display change to take effect
    start.setAttribute("fill", "red");
  }, 500);

  // Show the second SVG after 2s
  setTimeout(() => {
    start.style.opacity = "0"; // Fade out the first
    setTimeout(() => {
      start.style.display = "none"; // Hide the first after the fade-out
    }, 500);

    up.style.display = "block"; // Make the second visible
    setTimeout(() => {
      up.style.opacity = "1"; // Fade in the second SVG
      up.setAttribute("fill", "blue");
    }, 50);
  }, 2000);

  // Hide both and show the third SVG after 4s
  setTimeout(() => {
    up.style.opacity = "0"; // Fade out the second
    setTimeout(() => {
      up.style.display = "none"; // Hide the second after the fade-out
    }, 500);

    startUp.style.display = "block"; // Make the third visible
    setTimeout(() => {
      startUp.style.opacity = "1"; // Fade in the third SVG
      startUp.setAttribute("fill", "purple");
    }, 50);
  }, 4000);
});
