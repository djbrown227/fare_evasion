import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawSpeedHeatmap() {
  const raw = await d3.csv("data/processed/result_bus_speeds.csv", d3.autoType);

  // Create combined y-axis label
  raw.forEach(d => {
    d.group = (d.day_type === 1 ? "Weekday" : "Weekend") + " – " + d.period;
  });

  const groups = Array.from(new Set(raw.map(d => d.group)));
  const years = Array.from(new Set(raw.map(d => d.year))).sort(d3.ascending);

  const chart = Plot.plot({
    marginLeft: 220,
    marginRight:200,
    marginBottom:100,
    padding: 0,
    width: 1000,
    height: 400,
    y: { domain: groups },
    x: { domain: years },
    color: { legend: true, scheme: "YlOrRd" },
    marks: [
      Plot.cell(raw, { x: "year", y: "group", fill: "avg_speed_weighted", inset: 1 }),
      // Add custom axes
      Plot.axisX({ 
        label: "Year", 
        tickFormat: d3.format("d"), 
        fontSize: 14, 
        fontFamily: "Helvetica", 
        tickRotate: 0
      }),
      Plot.axisY({ 
        label: "Day Type / Period", 
        fontSize: 14, 
        fontFamily: "Helvetica" 
      })
    ]
  });

  document.getElementById("speed-heatmap").appendChild(chart);
}

drawSpeedHeatmap();
