// Set up the SVG canvas size
const width = 50;
const height = 50;
const margin = { top: 5, right: 5, bottom: 5, left: 5 };

// Data for the first line chart
const data1 = [
  { x: 0, y: 0 },
  { x: 10, y: 15 },
  { x: 20, y: 10 },
  { x: 30, y: 20 },
  { x: 40, y: 25 },
  { x: 50, y: 35 },
  { x: 60, y: 20 },
  { x: 70, y: 10 },
  { x: 80, y: 5 },
];

// Data for the second line chart
const data2 = [
  { x: 0, y: 30 },
  { x: 10, y: 25 },
  { x: 20, y: 20 },
  { x: 30, y: 15 },
  { x: 40, y: 10 },
  { x: 50, y: 5 },
  { x: 60, y: 15 },
  { x: 70, y: 25 },
  { x: 80, y: 30 },
];
// Data for the second line chart
const data3 = [
  { x: 0, y: 5 },
  { x: 10, y: 10 },
  { x: 20, y: 15 },
  { x: 30, y: 10 },
  { x: 40, y: 5 },
  { x: 50, y: 10 },
  { x: 60, y: 15 },
  { x: 70, y: 20 },
  { x: 80, y: 25 },
];
const data4 = [
  { x: 0, y: 0 },
  { x: 10, y: 15 },
  { x: 20, y: 10 },
  { x: 30, y: 20 },
  { x: 40, y: 25 },
  { x: 50, y: 35 },
];
const data5 = [
  { x: 0, y: 0 },
  { x: 10, y: 15 },
  { x: 20, y: 10 },
  { x: 30, y: 20 },
  { x: 40, y: 25 },
  { x: 50, y: 35 },
];
// Function to create the graph
function createGraph(container, data, strokeColor) {
  // Create SVG element
  const svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Set up scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.x)])
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.y)])
    .range([height - margin.top - margin.bottom, 0]);

  // Line generator
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);

  // Append path (line)
  svg
    .append("path")
    .datum(data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", strokeColor)
    .attr("stroke-width", 1);
}

// Create the graphs with different color lines
createGraph("#chart1", data1, "blue");
// Create the second graph (with red line)
createGraph("#chart2", data2, "red");
// Create the second graph (with red line)
createGraph("#chart3", data3, "green");
// Create the second graph (with red line)
createGraph("#chart4", data4, "purple");
// Create the second graph (with red line)
createGraph("#chart5", data5, "brown");
