import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawFareVsPassengersPlot() {
  const data = await d3.csv("data/processed/graph_1.csv", d3.autoType);

  // Create "Year-Quarter" composite key
  data.forEach(d => {
    d["Year-Quarter"] = `${d.Year}-${d.Quarter}`;
  });

  const plot = Plot.plot({
    width: 800,
    height: 400,
    marginLeft: 60,
    marginBottom: 60,
    grid: true,
    marks: [
      // Dot plots
      Plot.dot(data, {
        x: "Year-Quarter",
        y: "Sum_Value",
        stroke: "steelblue",
        fill: "steelblue",
        r: 3
      }),
      Plot.dot(data, {
        x: "Year-Quarter",
        y: "Paying Passengers",
        stroke: "darkorange",
        fill: "darkorange",
        r: 3
      }),

      // Trend lines
      Plot.linearRegressionY(data, {
        x: "Year-Quarter",
        y: "Sum_Value",
        stroke: "steelblue",
        strokeDasharray: "4 2",
        ci: 0.9
      }),
      Plot.linearRegressionY(data, {
        x: "Year-Quarter",
        y: "Paying Passengers",
        stroke: "darkorange",
        strokeDasharray: "4 2",
        ci: 0.9
      })
    ],
    x: {
      label: "Year-Quarter",
      tickRotate: -45
    },
    y: {
      label: "Value"
    },
    color: {
      legend: true,
      domain: ["Sum_Value", "Paying Passengers"],
      range: ["steelblue", "darkorange"],
      label: "Metric"
    }
  });

  document.getElementById("fare-passenger-plot-1").appendChild(plot);
}

drawFareVsPassengersPlot();
