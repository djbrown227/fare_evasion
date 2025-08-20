import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawLineChartWithLabels() {
  const raw = await d3.csv("data/processed/graph_2.csv", d3.autoType);

  const quarterToMonth = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };
  raw.forEach(d => {
    d.date = new Date(d.Year, quarterToMonth[d.Quarter] - 1);
  });

  raw.sort((a, b) => d3.ascending(a.date, b.date));

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
    style: { background: "#fff", fontFamily: "Helvetica" }, // optional: set font for all text
    marks: [
      // Explicit axes with fontSize
      Plot.axisY({
        scale: "y",
        label: "Fare Evasion (% of Ridership)",
        fontSize: 12,      // tick labels
        labelFont: "Helvetica", // font for the axis label
        labelFontSize: 18,          // size for the axis label
        tickFormat: d => (d * 100).toFixed(0) + "%"
      }),
      
      Plot.axisX({
        scale: "x",
        label: "Year / Quarter",
        tickRotate: -45,
        fontSize: 12,       // tick labels
        labelFont: "Helvetica", // font for the axis label
        labelFontSize: 18,          // size for the axis label
        tickFormat: d3.timeFormat("%Y Q%q"),
        ticks: Plot.timeInterval("6 months")
      }),
      
      // Line and dots
      Plot.line(raw, {
        x: "date",
        y: "Fare Evasion_ridership",
        stroke: "#FF9B00",
        strokeWidth: 4,
        curve: "monotone-x"
      }),
      Plot.dot(labeled, {
        x: "date",
        y: "Fare Evasion_ridership",
        fill: "#FF9B00",
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
        fontSize: 14, // <-- font size for data labels
        textAnchor: "start"
      }),
      Plot.ruleY([0])
    ]
  });

  document.getElementById("fare-evasion-bar").appendChild(chart);
}

drawLineChartWithLabels();
