import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Embedded data
const survey = [
  {question: "Pre-Covid Median Fare Evasion", yes: 22},
  {question: "Post-Covid Median Fare Evasion", yes: 37}
];

const chart = Plot.plot({
  width: 800,
  height: 360,
  marginTop: 60,
  marginLeft: 100,
  marginRight: 100,
  marginBottom: 100,
  style: { background: "#fff", fontFamily: "Helvetica" },
  y: {
    domain: [0, 50],   // 👈 adjust this as needed
    tickFormat: d => d + "%"
  },
  marks: [
    // Explicit axes with font settings
    Plot.axisY({
      scale: "y",
      label: "Percent of Respondents",
      fontSize: 14,        // tick labels
      labelFont: "Helvetica",
      labelFontSize: 14,   // axis label
      tickFormat: d => d + "%"

    }),

    Plot.axisX({
      scale: "x",
      label: null,
      fontSize: 16,        // tick labels
      labelFont: "Helvetica",
      labelFontSize: 14,
      tickRotate: 0,       // keep labels horizontal
      ticks: survey.map(d => d.question) // ensures only your two labels
    }),

    // Bars
    Plot.barY(survey, {
      x: "question",
      y: "yes",
      fill: "orange"
    }),

    // Percentage labels above bars
    Plot.text(survey, {
      x: "question",
      y: "yes",
      text: d => d.yes + "%",
      dy: -10,
      fontSize: 20,
      fontWeight: "bold",
      textAnchor: "middle",
      fill: "orange"
    })
  ]
});

document.getElementById("evasion-bar-chart").appendChild(chart);
