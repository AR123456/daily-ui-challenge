const width = 600,
  height = 600;
const canvas = d3.select("#globe").attr("width", width).attr("height", height);
const content = canvas.node().getContent("2d");
const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2])
  .rotate([0, 0, 23.5]);
const path = d3.geoPath(projection, context);

let rotation = [0, 0, 23.5];
let speed = 0.2;

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
  .then((world) => {
    const land = topojson.feature(world, world.objects.land);
    const countries = topojson.feature(world, world.objects.countries);
    const graticlue = d3.geoGraticlude10();
    function render() {
      context.clearRect(0, 0, width, height);
      // draw water background sphere
    }
    // rotation function
    function rotate() {
      rotation[0] += speed;
      projection.rotate(rotation);
      render();
      requestAnimationFrame(rotate);
    }
    render();
    rotate();
  })
  .catch((error) => console.error("Error loading world data: ", error));
