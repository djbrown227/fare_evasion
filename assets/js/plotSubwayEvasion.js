import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawSubwayEvasion() {
  const data = await d3.csv("data/processed/subway_evasion_df.csv", d3.autoType);

  const chart = Plot.plot({
    width: 1000,
    height: 600,
    marginLeft: 100,
    marginBottom: 100,
    marginTop:100,
    grid:true,
    x: {
      label: "Time Period",
      type: "band",
      tickRotate: 45
    },
    y: {
      label: "Fare Evasion Rate",
      grid: true,
      tickFormat: ".0%",
    },
    marks: [
      Plot.ruleY(data, {
        x: "Time Period",
        y1: d => d["Fare Evasion"] - d["Margin of Error"],
        y2: d => d["Fare Evasion"] + d["Margin of Error"],
        stroke: "gray",
        opacity: 0.6
      }),
      Plot.line(data, {
        x: "Time Period",
        y: "Fare Evasion",
        stroke: "steelblue"
      }),
      Plot.dot(data, {
        x: "Time Period",
        y: "Fare Evasion",
        fill: "steelblue",
        tip:true
      }),
      Plot.barY(data, {
        x: "Time Period",
        y: "Fare Evasion",
        fill: "red",
        opacity:0.5
      })
    ]
  });

  document.getElementById("subway-evasion-plot").append(chart);
}

drawSubwayEvasion();
