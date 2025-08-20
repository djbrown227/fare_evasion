import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Embedded data
const survey = [
  {question: "Pre-Covid Median Fare Evasion", yes: 22},
  {question: "Post-Covid Median Fare Evasion", yes: 37}
];

// Total number of respondents
const total = 100;

const chart = Plot.plot({
  axis: null,
  label: null,
  height: 160,
  marginTop: 20,
  marginLeft:100,
  marginRight:100,
  marginBottom: 70,
  title: "Bus Fare Evasion",
  subtitle: "Pre vs Post Covid",
  fx: {
    domain: ["Pre-Covid Median Fare Evasion", "Post-Covid Median Fare Evasion"]
  },
  marks: [
    // Bottom bar (baseline waffle grid) — force 10×10
    Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20, fontSize: 14,}),
    Plot.waffleY({length: 1}, {
      y: total,
      multiple: 10,        // <-- 10 cells per row
      fillOpacity: 0.6,
      rx: "100%"
    }),
    // Actual responses — also force 10×10
    Plot.waffleY(survey, {
      fx: "question",
      y: "yes",
      multiple: 10,        // <-- 10 cells per row
      fill: "orange",
      rx: "100%"
    }),
    // Percentage labels
    Plot.text(survey, {
      fx: "question",
      text: d => (d.yes / total).toLocaleString("en-US", { style: "percent" }),
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
