import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawLineChartWithLabels() {
  const raw = await d3.csv("data/processed/graph_2.csv", d3.autoType);

  // Create a time index (first month of each quarter)
  const quarterToMonth = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };
  raw.forEach(d => {
    d.date = new Date(d.Year, quarterToMonth[d.Quarter] - 1);
  });

  // Sort data chronologically
  raw.sort((a, b) => d3.ascending(a.date, b.date));

  // Pick first, last, and highest point
  const first = raw[0];
  const last = raw[raw.length - 1];
  const max = d3.max(raw, d => d["Fare Evasion_ridership"]);
  const highest = raw.find(d => d["Fare Evasion_ridership"] === max);

  const labeled = [first, last, highest];

  const chart = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 100,
    marginTop: 100,
    style: { background: "#fff" },
    x: {
      label: "Year / Quarter",
      tickRotate: -45,
      tickFormat: d3.timeFormat("%Y Q%q"),  // show "2021 Q1", "Q2", etc.
      ticks: Plot.timeInterval("6 months"), // tick every 2 quarters
      grid: false
    },
    y: {
      label: "Fare Evasion (% of Ridership)",
      tickFormat: d => (d * 100).toFixed(0) + "%",
      grid: true
    },
    marks: [
      Plot.line(raw, {
        x: "date",
        y: "Fare Evasion_ridership",
        stroke: "#3182bd",
        strokeWidth: 2,
        curve: "monotone-x"
      }),
      Plot.dot(labeled, {
        x: "date",
        y: "Fare Evasion_ridership",
        fill: "#3182bd",
        r: 5,
        title: d => `${d.Year} ${d.Quarter}: ${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`
      }),
      Plot.text(labeled, {
        x: "date",
        y: "Fare Evasion_ridership",
        text: d => `${(d["Fare Evasion_ridership"] * 100).toFixed(1)}%`,
        dy: 15,
        dx: -2,
        fontWeight: "bold",
        textAnchor: "start"
      }),
      Plot.ruleY([0])
    ]
  });

  document.getElementById("fare-evasion-bar").appendChild(chart);
}

drawLineChartWithLabels();
