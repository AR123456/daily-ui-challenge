// changing colors
const start = document.getElementById("start");
const up = document.getElementById("up");
const startUp = document.getElementById("start-up");

start.addEventListener("click", function () {
  console.log("you clicked the start svg");
  start.setAttribute("fill", "red");
  up.setAttribute("fill", "blue");

  startUp.style.fill = "purple";
});
