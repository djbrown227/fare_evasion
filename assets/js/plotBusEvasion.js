import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusEvasion() {
  // Load CSV with type parsing
  const data = await d3.csv("data/processed/bus_evasion_df.csv", d3.autoType);

  // Extract ordered unique time periods for x-axis ordering
  const timePeriodOrder = data.map(d => d["Time Period"]);

  const plot = Plot.plot({
    title: "For charts, an informative title",
    width: 600,
    height: 450,
    marginLeft: 0,
    marginBottom: 0,
    y: {
      label: "Fare Evasion Rate",
      grid: true,
      tickFormat: ".0%",
      domain: [0, d3.max(data, d => d["Fare Evasion"]) * 1.1],
    },
    x: {
      label: "Time Period (Quarterly)",
      tickRotate: -45,
      ticks: timePeriodOrder,
      tickFormat: d => d,
      domain: timePeriodOrder,
    },
    color: {
      legend: true,
      label: "Trip Type",
      scheme: "category10",
    },
    marks: [
      Plot.line(data, {
        x: "Time Period",
        y: "Fare Evasion",
        stroke: "Trip Type",
        strokeWidth: 3,
        curve: "catmull-rom",
      }),
      Plot.dot(data, {
        x: "Time Period",
        y: "Fare Evasion",
        fill: "Trip Type",
        r: 5,
        tip:true
      }),
    ],
  });

  document.getElementById("bus-evasion-plot").appendChild(plot);
}

drawBusEvasion();
