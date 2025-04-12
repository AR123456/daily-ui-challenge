const size = 18 * 16; // 18rem in pixels
const canvas = d3.select("#globe").attr("width", size).attr("height", size);
const context = canvas.node().getContext("2d");

const projection = d3
  .geoOrthographic()
  .scale(size / 2.5)
  .translate([size / 2, size / 2])
  .rotate([0, -23.5, 0]); // Maintain Earth's axial tilt

const path = d3.geoPath(projection, context);

let rotation = [0, -23.5, 0]; // Initial rotation with tilt
let dragging = false;
let lastX, lastY;

d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
  .then((world) => {
    const land = topojson.feature(world, world.objects.land);
    const countries = topojson.feature(world, world.objects.countries);
    const graticule = d3.geoGraticule10();

    function render() {
      context.clearRect(0, 0, size, size);

      // Draw water background
      context.beginPath();
      context.fillStyle = "#000204";
      path({ type: "Sphere" });
      context.fill();

      // Draw latitude/longitude lines
      context.beginPath();
      context.strokeStyle = "#444";
      path(graticule);
      context.stroke();

      // Draw land
      context.beginPath();
      context.fillStyle = "#71B98A";
      path(land);
      context.fill();

      // Draw country borders
      context.beginPath();
      context.strokeStyle = "#ffffff";
      context.lineWidth = 0.5;
      path(countries);
      context.stroke();
    }

    render(); // Initial render

    // Mouse drag interaction for rotation
    canvas
      .on("mousedown", (event) => {
        dragging = true;
        [lastX, lastY] = d3.pointer(event);
      })
      .on("mousemove", (event) => {
        if (!dragging) return;
        const [x, y] = d3.pointer(event);
        const dx = x - lastX;
        const dy = y - lastY;
        lastX = x;
        lastY = y;

        rotation[0] += dx * 0.5; // Rotate horizontally
        rotation[1] = Math.max(-90, Math.min(90, rotation[1] - dy * 0.5)); // Tilt within realistic range
        projection.rotate(rotation);
        render();
      })
      .on("mouseup", () => (dragging = false))
      .on("mouseleave", () => (dragging = false));
  })
  .catch((error) => console.error("Error loading world data:", error));
