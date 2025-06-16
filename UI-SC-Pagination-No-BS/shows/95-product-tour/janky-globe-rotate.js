const size = 20 * 16; // 20rem in pixels
const canvas = d3.select("#globe").attr("width", size).attr("height", size);
const context = canvas.node().getContext("2d");

const projection = d3
  .geoOrthographic()
  .scale(size / 2.5)
  .translate([size / 2, size / 2])
  .rotate([100, -23.5, 0]); // US is visible initially

const path = d3.geoPath(projection, context);

let rotation = [100, -23.5, 0]; // Initial rotation
let dragging = false;
let lastX, lastY;
let autoRotate = true; // Flag to control auto-rotation

Promise.all([
  d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json"),
  d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
])
  .then(([world, usStates]) => {
    const land = topojson.feature(world, world.objects.land);
    const countries = topojson.feature(world, world.objects.countries);
    const states = topojson.feature(usStates, usStates.objects.states);
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
      context.lineWidth = 1;
      path(countries);
      context.stroke();

      // Draw U.S. state borders in a slightly different color
      context.beginPath();
      context.strokeStyle = "#bbbbbb";
      context.lineWidth = 0.8;
      path(states);
      context.stroke();
    }

    render(); // Initial render

    // 🔄 Auto-Rotation
    setInterval(() => {
      if (autoRotate) {
        rotation[0] -= 0.2; // Slowly rotate left
        projection.rotate(rotation);
        render();
      }
    }, 50); // Adjust speed (lower = faster)

    // 🎯 Mouse Drag Interaction
    canvas
      .on("mousedown", (event) => {
        dragging = true;
        autoRotate = false; // Stop auto-rotation when dragging
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
      .on("mouseup", () => {
        dragging = false;
        autoRotate = true; // Resume auto-rotation after dragging
      })
      .on("mouseleave", () => {
        dragging = false;
        autoRotate = true; // Resume auto-rotation if the mouse leaves
      });
  })
  .catch((error) => console.error("Error loading world data:", error));
