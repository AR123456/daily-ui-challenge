const width = 600,
  height = 600;
const canvas = d3.select("#globe").attr("width", width).attr("height", height);
const context = canvas.node().getContext("2d");

const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2]);

const path = d3.geoPath(projection, context);

let rotation = [0, 0]; // Initial rotation
let speed = 0.1; // Rotation speed

d3.json("https://unpkg.com/world-atlas@2.0.2/world/110m.json").then((world) => {
  const land = topojson.feature(world, world.objects.land);

  function render() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = "#4CAF50"; // Green land color
    path(land);
    context.fill();
    context.strokeStyle = "#ffffff"; // White stroke for land
    context.stroke();
  }

  function rotate() {
    rotation[0] += speed;
    projection.rotate(rotation);
    render();
    requestAnimationFrame(rotate);
  }

  render();
  rotate();
});
