// changing colors
const start = document.getElementById("start");
const up = document.getElementById("up");
const startUp = document.getElementById("start-up");

start.addEventListener("click", function () {
  //   console.log("you clicked the start svg");
  //   start.setAttribute("fill", "red");
  //   up.setAttribute("fill", "blue");
  //   startUp.style.fill = "purple";
  // Initially hide all SVGs
  start.style.display = "none";
  up.style.display = "none";
  startUp.style.display = "none";

  // Show the first SVG after 0.5s
  setTimeout(() => {
    start.style.display = "block";
    start.setAttribute("fill", "red");
  }, 500);

  // Show the second SVG after 2s
  setTimeout(() => {
    start.style.display = "none";
    uo.style.display = "block";
    up.setAttribute("fill", "blue");
  }, 2000);

  // Hide both and show the third SVG after 4s
  setTimeout(() => {
    document.getElementById("up").style.display = "none";
    document.getElementById("start-up").style.display = "block";
  }, 4000);
});
