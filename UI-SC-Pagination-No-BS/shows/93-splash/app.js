const width = 600,
  height = 600;
const canvas = d3.select("#globe").attr("width", width).attr("height", height);
const context = canvas.node().getContext("2d");

const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2])
  .rotate([0, 0, 23.5]); // Tilt Earth's axis by -23.5° (negative means tilting towards us)

const path = d3.geoPath(projection, context);

let rotation = [0, 0, 23.5]; // Initial rotation with tilt
let speed = 0.2; // Rotation speed

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
  .then((world) => {
    const land = topojson.feature(world, world.objects.land);
    const countries = topojson.feature(world, world.objects.countries);
    const graticule = d3.geoGraticule10(); // Graticule for lat/lon lines

    function render() {
      context.clearRect(0, 0, width, height);

      // Draw the water background (sphere)
      context.beginPath();
      context.fillStyle = "#000204"; // Dark background for water
      path({ type: "Sphere" });
      context.fill();

      // Draw graticule (latitude/longitude lines)
      context.beginPath();
      context.strokeStyle = "#444"; // Gray lat/lon lines
      path(graticule);
      context.stroke();

      // Draw the land
      context.beginPath();
      context.fillStyle = "#71B98A"; // Green land
      path(land);
      context.fill();

      // Draw country borders
      context.beginPath();
      context.strokeStyle = "#ffffff"; // White borders
      path(countries);
      context.stroke();
    }

    function rotate() {
      rotation[0] += speed; // Rotate along X-axis
      projection.rotate(rotation);
      render();
      requestAnimationFrame(rotate);
    }

    render();
    rotate();
  })
  .catch((error) => console.error("Error loading world data:", error));
