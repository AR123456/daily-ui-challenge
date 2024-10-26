// Set up the SVG canvas size
const width = 50;
const height = 50;
const margin = { top: 5, right: 5, bottom: 5, left: 5 };

// Data for the line chart (simple linear data points)
const data = [
  { x: 0, y: 0 },
  { x: 10, y: 15 },
  { x: 20, y: 10 },
  { x: 30, y: 20 },
  { x: 40, y: 25 },
  { x: 50, y: 35 },
];

// Create SVG element
const svg = d3
  .select("#chart")
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
  .curve(d3.curveMonotoneX); // Smooth the line

// Append path (line)
svg
  .append("path")
  .datum(data)
  .attr("d", line)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1);
