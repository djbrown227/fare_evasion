// assets/js/busProjectionPlot.js
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusProjectionPlot() {
  const data = await d3.csv("data/processed/mckinsey_df.csv", d3.autoType);

  // Ensure Date is parsed as Date object
  data.forEach(d => {
    d.Date = new Date(d.Date);
  });

  const filtered = data.filter(d => d.Agency === "Bus");

  const plot = Plot.plot({
    width: 800,
    height: 400,
    marginLeft: 60,
    marginBottom: 60,
    marks: [
      Plot.line(filtered, {
        x: "Date",
        y: "Recovery",
        stroke: "Projection",
        strokeWidth: 2
      })
    ],
    x: {
      label: "Date",
      type: "time"
    },
    y: {
      label: "Recovery Ratio",
      grid: true
    },
    color: {
      legend: true,
      label: "Projection Scenario"
    }
  });

  document.getElementById("bus-projection-plot").appendChild(plot);
}

drawBusProjectionPlot();
