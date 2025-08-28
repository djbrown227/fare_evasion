import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
// Data
const ridershipData = [
  { period: "Pre-Covid", ridership: 2355801, color: "lightgray" },
  { period: "Post-Covid", ridership: 1314135, color: "#FF9B00" }
];

// Optional: define your axis domains
const xDomain = ["Pre-Covid", "Post-Covid"]; // For categorical x-axis
const yDomain = [0, 3000000];                // min/max for y-axis

// Create the chart
const chart = Plot.plot({
  width: 600,
  height: 400,
  marginLeft: 80,
  marginTop:50,
  marginBottom: 80,
  style: { background: "#fff", fontFamily: "Helvetica" },
  x: {
    label: "Period",
    domain: xDomain
  },
  y: {
    label: "Average Weekday Ridership",
    domain: yDomain,       // set the min/max
    tickFormat: d => d.toLocaleString()
  },
  marks: [
    // Bars with custom colors
    Plot.barY(ridershipData, {
      x: "period",
      y: "ridership",
      fill: d => d.color
    }),
    // Labels above bars
    Plot.text(ridershipData, {
      x: "period",
      y: "ridership",
      text: d => d.ridership.toLocaleString(),
      dy: -10,
      fontWeight: "bold",
      fontSize: 14,
      textAnchor: "middle"
    }),
    // Explicit axes for control
    Plot.axisX({
      scale: "x",
      fontSize: 14,
      labelFont: "Helvetica",
      labelFontSize: 16,
      tickFontSize: 12
    }),
    Plot.axisY({
      scale: "y",
      fontSize: 14,
      labelFont: "Helvetica",
      labelFontSize: 16,
      tickFormat: d => d.toLocaleString()
    })
  ]
});

// Append chart to page
document.getElementById("bar-chart").appendChild(chart);
