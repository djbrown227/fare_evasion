import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawRevenueLineChart() {
  const data = await d3.csv("data/processed/revenue_df.csv", d3.autoType);

  // Create date object for x-axis
  const quarterToMonth = { Q1: 0, Q2: 3, Q3: 6, Q4: 9 };
  data.forEach(d => {
    d.date = new Date(d.Year, quarterToMonth[d.Quarter], 1);
  });

  // Sort chronologically
  data.sort((a, b) => d3.ascending(a.date, b.date));

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 60,
    style: { background: "#fff" },
    x: {
      label: "Quarter",
      type: "time",
      tickFormat: d3.timeFormat("%Y Q%q"),
      ticks: Plot.timeInterval("6 months"),
      tickRotate: -45
    },
    y: {
      label: "Revenue (USD)",
      tickFormat: d => `$${(d / 1e8).toFixed(1)}B`,
      grid: true,
      domain: [1.4e8, 2.1e8]
    },
    marks: [
      Plot.line(data, {
        x: "date",
        y: "Revenue",
        stroke: "#4E79A7",
        strokeWidth: 2,
        curve: "monotone-x",
        title: d => `${d.Year} ${d.Quarter}: $${(d.Revenue / 1e6).toFixed(1)}M`
      }),
      Plot.dot(data, {
        x: "date",
        y: "Revenue",
        fill: "#4E79A7",
        r: 3
      }),
      Plot.ruleY([0])
    ]
  });

  document.getElementById("revenue-line").appendChild(plot);
}

drawRevenueLineChart();
