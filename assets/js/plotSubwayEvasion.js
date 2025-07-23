import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawSubwayEvasion() {
  // Load CSV and auto-parse types
  const data = await d3.csv("data/processed/subway_evasion_df.csv", d3.autoType);

  // Keep Time Period as categorical in the CSV order
  const timePeriodOrder = data.map(d => d["Time Period"]);
  
  // Create Plot with error bars
  const plot = Plot.plot({
    width:500,
    height: 500,
    marginLeft: 0,
    marginBottom: 0,
    y: {
      label: "Subway Fare Evasion Rate",
      grid: true,
      tickFormat: ".0%",
      domain: [0, d3.max(data, d => d["Fare Evasion"] + d["Margin of Error"]) * 1.1],
    },
    x: {
      label: "Time Period (Quarterly)",
      tickRotate: -45,
      ticks: timePeriodOrder,
      tickFormat: d => d,
      domain: timePeriodOrder
    },
    marks: [
      // Error bars: vertical lines from (Fare Evasion - MOE) to (Fare Evasion + MOE)
      Plot.ruleY(data, {
        x: "Time Period",
        y1: d => d["Fare Evasion"] - d["Margin of Error"],
        y2: d => d["Fare Evasion"] + d["Margin of Error"],
        stroke: "gray",
        strokeWidth: 2,
        strokeOpacity: 0.6,
      }),
      // Caps at ends of error bars
      Plot.ruleX(data, {
        x: d => d["Time Period"],
        y: d => d["Fare Evasion"] - d["Margin of Error"],
        stroke: "gray",
        strokeWidth: 2,
        strokeOpacity: 0.6,
        x1: d => d["Time Period"],
        x2: d => d["Time Period"],
        dy1: -5,
        dy2: 5,
      }),
      Plot.ruleX(data, {
        x: d => d["Time Period"],
        y: d => d["Fare Evasion"] + d["Margin of Error"],
        stroke: "gray",
        strokeWidth: 2,
        strokeOpacity: 0.6,
        x1: d => d["Time Period"],
        x2: d => d["Time Period"],
        dy1: -5,
        dy2: 5,
      }),
      // Main line with dots
      Plot.line(data, {
        x: "Time Period",
        y: "Fare Evasion",
        stroke: "dodgerblue",
        strokeWidth: 3,
        curve: "catmull-rom",
      }),
      Plot.dot(data, {
        x: "Time Period",
        y: "Fare Evasion",
        fill: "dodgerblue",
        r: 5,
      }),
    ],
  });

  document.getElementById("subway-evasion-plot").appendChild(plot);
}

drawSubwayEvasion();
