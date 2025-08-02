import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawFareVsPassengersPlot() {
  const data = await d3.csv("data/processed/graph_1.csv", d3.autoType);

  // Filter out 2025 and later
  const filtered = data.filter(d => d.Year < 2025);

  // Convert Year + Quarter → date object for time axis
  const quarterToMonth = { Q1: 0, Q2: 3, Q3: 6, Q4: 9 };
  filtered.forEach(d => {
    const month = quarterToMonth[d.Quarter];
    d.date = new Date(d.Year, month, 1); // First day of quarter
  });

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    style: { background: "#fff" },
    marks: [
      Plot.line(filtered, {
        x: "date",
        y: "NoPay_Passengers",
        stroke: "#4E79A7",
        strokeWidth: 2,
        curve: "catmull-rom",
        title: d => `Non-Paying: ${(d.NoPay_Passengers / 1e6).toFixed(1)}M`
      }),
      Plot.line(filtered, {
        x: "date",
        y: "Paying Passengers",
        stroke: "#F28E2B",
        strokeWidth: 2,
        curve: "catmull-rom",
        title: d => `Paying: ${(d["Paying Passengers"] / 1e6).toFixed(1)}M`
      }),
      Plot.ruleY([0])
    ],
    x: {
      label: "Quarter",
      type: "time",
      tickFormat: d3.timeFormat("%Y Q%q"),
      ticks: Plot.timeInterval("6 months"), // 1 tick per year
      tickRotate: -45
    },
    y: {
      label: "Passengers (Millions)",
      domain: [0, d3.max(filtered, d => Math.max(d.NoPay_Passengers, d["Paying Passengers"]))],
      tickFormat: d => d / 1e6 + "M",
      ticks: 6,
      grid: true,
      gridStroke: "#ccc",
      gridStrokeWidth: 0.5
    },
    color: {
        domain: ["Non-Paying", "Paying"],
        range: ["#1E79A7", "#FF0000"],
        legend: true
      }
  });

  document.getElementById("fare-passenger-plot").appendChild(plot);
}

drawFareVsPassengersPlot();
