import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Embedded data
const survey = [
  {question: "don’t go out after dark", yes: 96},
  {question: "do no activities other than school", yes: 89},
  {question: "engage in political discussion and social movements, including online", yes: 10},
  {question: "would like to do activities but are prevented by safety concerns", yes: 73}
];

// Total number of respondents
const total = 120;

const chart = Plot.plot({
  axis: null,
  label: null,
  height: 260,
  marginTop: 20,
  marginBottom: 70,
  title: "Subdued",
  subtitle: "Of 120 surveyed Syrian teenagers:",
  marks: [
    // Bottom bar (baseline waffle grid)
    Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20}),
    Plot.waffleY({length: 1}, {
      y: total,
      fillOpacity: 0.2,
      rx: "100%"
    }),
    // Actual responses
    Plot.waffleY(survey, {
      fx: "question",
      y: "yes",
      fill: "orange",
      rx: "100%"
    }),
    // Percentage labels
    Plot.text(survey, {
      fx: "question",
      text: d => (d.yes / total).toLocaleString("en-US", {
        style: "percent"
      }),
      frameAnchor: "bottom",
      lineAnchor: "top",
      dy: 6,
      fill: "orange",
      fontSize: 24,
      fontWeight: "bold"
    })
  ]
});

document.getElementById("waffle-chart").appendChild(chart);
