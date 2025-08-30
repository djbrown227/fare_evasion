import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusStopTimeHistogram() {
  const data = [
    {year: 2017, avg_additional_bus_stop_time: 2.078737},
    {year: 2018, avg_additional_bus_stop_time: 1.974035},
    {year: 2019, avg_additional_bus_stop_time: 2.407678},
    {year: 2020, avg_additional_bus_stop_time: 2.257264},
    {year: 2021, avg_additional_bus_stop_time: 2.873868},
    {year: 2022, avg_additional_bus_stop_time: 2.790826},
    {year: 2023, avg_additional_bus_stop_time: 2.695352},
    {year: 2024, avg_additional_bus_stop_time: 3.081756},
    {year: 2025, avg_additional_bus_stop_time: 2.779832}
  ];

  const values = data.map(d => d.avg_additional_bus_stop_time);

  // Compute average
  const avg = d3.mean(values);

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 80,
    style: { background: "#fff" },
    marks: [
      Plot.axisX({ label: "Avg Bus Stop Time (minutes)", tickSize: 6 }),
      Plot.axisY({ label: "Count", grid: true, gridStroke: "#ccc", gridStrokeWidth: 0.5 }),
      // Histogram for single column
      Plot.rectY(values, Plot.binX({ thresholds: 10 }), { fill: "#FF9B00", fillOpacity: 0.7 }),
      // Average line
      Plot.ruleY([avg], { stroke: "red", strokeWidth: 2, strokeDasharray: "4,2", title: `Average: ${avg.toFixed(2)}` }),
      Plot.ruleY([0])
    ],
    x: { domain: [0, d3.max(values) * 1.1] },
    y: { grid: true }
  });

  document.getElementById("bus-time-plot").appendChild(plot);
}

drawBusStopTimeHistogram();
