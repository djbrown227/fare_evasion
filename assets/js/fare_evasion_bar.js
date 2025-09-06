import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Embedded data with custom colors
const survey = [
  { question: "Pre-Covid", yes: 22, color: "lightgray" },
  { question: "Post-Covid", yes: 37, color: "#FF9B00" }
];

const chart = Plot.plot({
  width: 600,
  height: 400,
  marginTop: 60,
  marginLeft: 100,
  marginRight: 100,
  marginBottom: 100,
  style: { background: "#fff", fontFamily: "Helvetica" },
  y: {
    domain: [0, 50],   // adjust as needed
    label: "Fare Evasion",
    tickFormat: d => d + "%"
  },
  x: {
    domain: survey.map(d => d.question) // ensures only your two labels
  },
  marks: [
    // Bars with per-bar colors
    Plot.barY(survey, {
      x: "question",
      y: "yes",
      fill: d => d.color
    }),
    
    // Percentage labels above bars
    Plot.text(survey, {
      x: "question",
      y: "yes",
      text: d => d.yes + "%",
      dy: -10,
      fontSize: 16,
      fontWeight: "bold",
      textAnchor: "middle",
      fill: "black"
    }),

    // Explicit X-axis
    Plot.axisX({
      scale: "x",
      label: null,
      fontSize: 16,
      labelFont: "Helvetica",
      labelFontSize: 14,
      tickRotate: 0
    }),

    // Explicit Y-axis
    Plot.axisY({
      scale: "y",
      label: "Fare Evasion",
      fontSize: 16,
      labelFont: "Helvetica",
      labelFontSize: 14,
      tickFormat: d => d + "%"
    })
  ]
});

document.getElementById("evasion-bar-chart").appendChild(chart);
