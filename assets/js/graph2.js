import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBarChartWithLabels() {
  const raw = await d3.csv("data/processed/graph_2.csv", d3.autoType);

  // Create a combined Year + Quarter label
  raw.forEach(d => {
    d.label = `${d.Year} ${d.Quarter}`;
  });

  // Pick bars to label
  const labeled = raw.filter(d =>
    d.label === "2024 Q2" || d.label === "2021 Q4" || d.label === "2022 Q4"
  );

  const chart = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 80,
    style: { background: "#fff" },
    x: {
      label: "Quarter",
      tickRotate: -45,
      tickFormat: (d) => {
        const [year, quarter] = d.split(" ");
        return quarter === "Q1" ? `${year} ${quarter}` : quarter;
      }
    },
    y: {
      label: "Fare Evasion (% of Ridership)",
      tickFormat: d => (d * 100).toFixed(0) + "%",
      grid: true
    },
    marks: [
      Plot.barY(raw, {
        x: "label",
        y: "Fare Evasion_ridership",
        fill: "#3182bd",
        title: d => `${d.label}: ${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`
      }),
      Plot.text(labeled, {
        x: "label",
        y: "Fare Evasion_ridership",
        text: d => `${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`,
        dy: -6,
        fontWeight: "bold",
        textAnchor: "middle"
      }),
      Plot.ruleY([0])
    ]
  });

  document.getElementById("fare-evasion-bar").appendChild(chart);
}

drawBarChartWithLabels();

