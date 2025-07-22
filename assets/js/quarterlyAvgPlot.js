// assets/js/quarterlyAvgPlot.js
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawQuarterlyAvgPlot() {
  const data = await d3.csv("data/processed/quarterly_stats.csv", d3.autoType);

  data.forEach(d => {
    d["Year-Quarter"] = `${d.Year}-${d.Quarter}`;
  });

  // Example filter for a specific Metric or Mode, adjust as needed
  const filtered = data.filter(d =>
    d.Metric === "% of Comparable Pre-Pandemic Day" && d.Mode === "Subways"
  );

  const plot = Plot.plot({
    width: 800,
    height: 400,
    marginLeft: 60,
    marginBottom: 80,
    marks: [
      Plot.line(filtered, {
        x: "Year-Quarter",
        y: "Avg_Value",
        stroke: "steelblue",
        strokeWidth: 2,
      }),
      Plot.dot(filtered, {
        x: "Year-Quarter",
        y: "Avg_Value",
        fill: "steelblue",
        r: 4,
      })
    ],
    x: {
      label: "Year-Quarter",
      tickRotate: -45
    },
    y: {
      label: "Average Value",
      grid: true
    },
    color: {
      legend: true
    }
  });

  document.getElementById("quarterly-plot").appendChild(plot);
}

drawQuarterlyAvgPlot();
