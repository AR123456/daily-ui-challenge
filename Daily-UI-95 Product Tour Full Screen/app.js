const width = 600,
  height = 600;
const canvas = d3.select("#globe").attr("width", width).attr("height", height);
const context = canvas.node().getContext("2d");

const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2])
  // Tilt Earth's axis by -23.5° (negative means tilting towards us)
  .rotate([0, 0, 23.5]);

const path = d3.geoPath(projection, context);
// Initial rotation with tilt
let rotation = [0, 0, 23.5];
// Rotation speed
let speed = 0.2;

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
  .then((world) => {
    const land = topojson.feature(world, world.objects.land);
    const countries = topojson.feature(world, world.objects.countries);
    // Graticule for lat/lon lines
    const graticule = d3.geoGraticule10();

    function render() {
      context.clearRect(0, 0, width, height);

      // Draw the water background (sphere)
      context.beginPath();
      // Dark background for water
      context.fillStyle = "#000204";
      path({ type: "Sphere" });
      context.fill();

      // Draw graticule (latitude/longitude lines)
      context.beginPath();
      // Gray lat/lon lines
      context.strokeStyle = "#444";
      path(graticule);
      context.stroke();

      // Draw the land
      context.beginPath();
      // Green land
      context.fillStyle = "#71B98A";
      path(land);
      context.fill();

      // Draw country borders
      context.beginPath();
      // White borders
      context.strokeStyle = "#ffffff";
      path(countries);
      context.stroke();
    }

    function rotate() {
      // Rotate along X-axis
      rotation[0] += speed;
      projection.rotate(rotation);
      render();
      requestAnimationFrame(rotate);
    }

    render();
    rotate();
  })
  .catch((error) => console.error("Error loading world data:", error));
