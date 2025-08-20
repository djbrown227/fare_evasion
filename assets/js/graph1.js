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

  // Define event line date (e.g., "Lockdown Ends")
  const eventDate = new Date(2021, 6, 1); // July 1, 2021 (Q3)
  const eventLabel = "Lockdown Ends";

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 80,
    style: { background: "#fff" },
    marks: [
      Plot.line(filtered, {
        x: "date",
        y: "NoPay_Passengers",
        stroke: "#FF9B00",
        strokeWidth: 4,
        curve: "catmull-rom",
        title: d => `Non-Paying: ${(d.NoPay_Passengers / 1e6).toFixed(1)}M`
      }),
      Plot.line(filtered, {
        x: "date",
        y: "Paying Passengers",
        stroke: "#2D9CDB",
        strokeWidth: 4,
        curve: "catmull-rom",
        title: d => `Paying: ${(d["Paying Passengers"] / 1e6).toFixed(1)}M`
      }),
      // Add vertical rule for event
      Plot.ruleX([eventDate], {
        stroke: "black",
        strokeDasharray: "4 2",
        strokeWidth: 1.5,
        opacity: 0.8,
        title: eventLabel
      }),
      Plot.text(
        [
          {
            date: eventDate,
            y: d3.max(filtered, d => Math.max(d.NoPay_Passengers, d["Paying Passengers"])) * 1.05,
            label: eventLabel
          }
        ],
        {
          x: "date",
          y: "y",
          text: "label",
          textAnchor: "middle",
          dy: -5,
          fill: "black",
          style: { fontSize: "13px" }  // ✅ fix: fontSize moved into style
        }
      )
      ,
      Plot.ruleY([0])
    ],
    x: {
      label: "Quarter",
      type: "time",
      tickFormat: d3.timeFormat("%Y Q%q"),
      ticks: Plot.timeInterval("6 months"), // tick every 2 quarters
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
      range: ["#FF9B00", "#2D9CDB"],
      legend: true
    }
  });

  document.getElementById("fare-passenger-plot").appendChild(plot);
}

drawFareVsPassengersPlot();
