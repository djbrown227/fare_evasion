import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusTimePlot() {
  // Hardcoded dataset
  const data = [
    {year: 2017, avg_additional_bus_stop_time: 2.078737, avg_additional_travel_time: 0.935338, avg_additional_time: 3.014076},
    {year: 2018, avg_additional_bus_stop_time: 1.974035, avg_additional_travel_time: 0.767853, avg_additional_time: 2.741888},
    {year: 2019, avg_additional_bus_stop_time: 2.407678, avg_additional_travel_time: 1.110827, avg_additional_time: 3.518505},
    {year: 2020, avg_additional_bus_stop_time: 2.257264, avg_additional_travel_time: 0.173992, avg_additional_time: 2.431256},
    {year: 2021, avg_additional_bus_stop_time: 2.873868, avg_additional_travel_time: 0.227701, avg_additional_time: 3.101569},
    {year: 2022, avg_additional_bus_stop_time: 2.790826, avg_additional_travel_time: 0.674259, avg_additional_time: 3.465084},
    {year: 2023, avg_additional_bus_stop_time: 2.695352, avg_additional_travel_time: 0.786603, avg_additional_time: 3.481955},
    {year: 2024, avg_additional_bus_stop_time: 3.081756, avg_additional_travel_time: 0.941573, avg_additional_time: 4.023328},
    {year: 2025, avg_additional_bus_stop_time: 2.779832, avg_additional_travel_time: 0.808098, avg_additional_time: 3.587930}
  ];

  // Reshape into long format
  const longData = data.flatMap(d => [
    {year: d.year, metric: "Avg Bus Stop Time", value: d.avg_additional_bus_stop_time},
    {year: d.year, metric: "Avg Travel Time", value: d.avg_additional_travel_time},
    {year: d.year, metric: "Avg Additional Time", value: d.avg_additional_time}
  ]);

  // Compute averages for each metric
  const averages = d3.rollups(
    longData,
    v => d3.mean(v, d => d.value),
    d => d.metric
  ).map(([metric, avg]) => ({metric, avg}));

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 80,
    style: { background: "#fff" },
    marks: [
      Plot.axisX({
        label: "Year",
        tickFormat: d3.format("d"),
        ticks: data.length,
        tickSize: 6,
        tickRotate: 0
      }),
      Plot.axisY({
        label: "Time (minutes)",
        grid: true,
        gridStroke: "#ccc",
        gridStrokeWidth: 0.5
      }),
      // Line series
      Plot.line(longData, {
        x: "year",
        y: "value",
        stroke: "metric",
        strokeWidth: 3,
        curve: "catmull-rom",
        title: d => `${d.metric}: ${d.value.toFixed(2)}`
      }),
      Plot.dot(longData, {
        x: "year",
        y: "value",
        stroke: "metric",
        fill: "white",
        r: 3
      }),
      // Average lines
      Plot.ruleY(averages, {
        y: "avg",
        stroke: d => d.metric,
        strokeDasharray: "4,2",
        strokeWidth: 2,
        title: d => `${d.metric} avg: ${d.avg.toFixed(2)}`
      }),
      Plot.ruleY([0])
    ],
    x: {domain: d3.extent(data, d => d.year)},
    y: {domain: [0, d3.max(longData, d => d.value) * 1.1]},
    color: {
      domain: ["Avg Travel Time"],
      range: ["#FF9B00", "#2D9CDB", "#27AE60"],
      legend: true
    }
  });

  document.getElementById("travel-time-plot").appendChild(plot);
}

drawBusTimePlot();
