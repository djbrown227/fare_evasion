import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawLineChartWithLabels() {
  const raw = await d3.csv("data/processed/graph_2.csv", d3.autoType);

  // Create a combined Year + Quarter label
  raw.forEach(d => {
    d.label = `${d.Year} ${d.Quarter}`;
  });

  // Create a time index for sorting (optional but ensures line continuity)
  const quarterToMonth = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };
  raw.forEach(d => {
    d.date = new Date(d.Year, quarterToMonth[d.Quarter] - 1);
  });

  // Sort data chronologically
  raw.sort((a, b) => d3.ascending(a.date, b.date));

  // Labeled points for annotations
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
      tickFormat: (d, i, ticks) => {
        const label = raw[d];
        if (!label) return "";
        const [year, quarter] = label.label.split(" ");
        return quarter === "Q1" ? `${year} ${quarter}` : quarter;
      },
      tickValues: d3.range(raw.length),
      tickSize: 0
    },
    y: {
      label: "Fare Evasion (% of Ridership)",
      tickFormat: d => (d * 100).toFixed(0) + "%",
      grid: true
    },
    marks: [
      Plot.line(raw, {
        x: (d, i) => i,
        y: "Fare Evasion_ridership",
        stroke: "#3182bd",
        strokeWidth: 2,
        curve: "monotone-x"
      }),
      Plot.dot(labeled, {
        x: d => raw.findIndex(r => r.label === d.label),
        y: "Fare Evasion_ridership",
        fill: "#3182bd",
        r: 4,
        title: d => `${d.label}: ${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`
      }),
      Plot.text(labeled, {
        x: d => raw.findIndex(r => r.label === d.label),
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

drawLineChartWithLabels();
