import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawSimpleBarChart() {
  const raw = await d3.csv("data/processed/graph_2.csv", d3.autoType);

  // Combine Year and Quarter into one label (e.g., "2023 Q2")
  raw.forEach(d => {
    d.label = `${d.Year} ${d.Quarter}`;
  });

  const chart = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 80,
    style: { background: "#fff" },
    x: {
      label: "Quarter",
      tickRotate: -45
    },
    y: {
      label: "Fare Evasion (% of Ridership)",
      tickFormat: d => (d * 100).toFixed(0) + "%",
      grid: true
    },
    marks: [
      Plot.barY(raw, {
        x: "label",  // ordinal label
        y: "Fare Evasion_ridership",  // FIXED: match the exact column name from CSV
        fill: "#3182bd",
        title: d => `${d.label}: ${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`
      }),
      Plot.ruleY([0])
    ]
  });

  document.getElementById("fare-evasion-bar").appendChild(chart);
}

drawSimpleBarChart();
