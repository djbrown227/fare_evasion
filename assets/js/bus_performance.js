import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusTimesLines() {
  const raw = await d3.csv("data/processed/df_times.csv", d3.autoType);

  // Melt the dataset: create one row per metric
  const melted = [];
  raw.forEach(d => {
    melted.push({ year: d.year, period: d.period, metric: "Bus Stop Time", value: d.additional_bus_stop_time });
    melted.push({ year: d.year, period: d.period, metric: "Travel Time", value: d.additional_travel_time });
  });

  // Combine period and metric for line grouping
  melted.forEach(d => d.line_group = `${d.period} ${d.metric}`);

  // Define color mapping
  const colorMap = {
    "Off-Peak Bus Stop Time": "#FF9B00",
    "Peak Bus Stop Time": "#FF0000",
   // "Off-Peak Travel Time": "#2D9CDB",
    //"Peak Travel Time": "#0000FF"
  };

  // Convert years to strings for x-axis ticks
  melted.forEach(d => d.year_str = String(d.year));
  const uniqueYears = [...new Set(melted.map(d => d.year))];
  const tickYears = uniqueYears.map(String);

  // Years to label: first year, 2019, 2025
  const labelYears = [uniqueYears[0], 2019, 2025];
  const labelData = melted.filter(d => labelYears.includes(d.year));

  // Add vertical offset for labels based on metric & period
  labelData.forEach(d => {
    if (d.metric === "Bus Stop Time" && d.period === "Off-Peak") d.dy = -20;
    if (d.metric === "Bus Stop Time" && d.period === "Peak") d.dy = -40;
    if (d.metric === "Travel Time" && d.period === "Off-Peak") d.dy = 10;
    if (d.metric === "Travel Time" && d.period === "Peak") d.dy = 30;
  });

  const chart = Plot.plot({
    width: 1000,
    height: 600,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 80,
    marginTop: 50,
    style: { background: "#fff", fontFamily: "Helvetica" },
    x: {
      label: "Year",
      tickFormat: d => d,
      ticks: tickYears
    },
    y: {
      label: "Minutes",
      domain: [0, d3.max(melted, d => d.value) * 1.1]
    },
    color: {
      domain: Object.keys(colorMap),
      range: Object.values(colorMap),
      legend: true
    },
    marks: [
      // Lines
      Plot.line(melted, {
        x: "year_str",
        y: "value",
        stroke: "line_group",
        strokeWidth: 3,
        curve: "monotone-x"
      }),

      // Dots
      Plot.dot(melted, {
        x: "year_str",
        y: "value",
        fill: "line_group",
        r: 4,
        title: d => `${d.year} ${d.line_group}: ${d.value.toFixed(2)} min`
      }),

      // Labels for first year, 2019, 2025 with offsets
      Plot.text(labelData, {
        x: "year_str",
        y: "value",
        text: d => `${d.value.toFixed(2)} min`,
        dy: d => d.dy,
        fontSize: 14,
        fontWeight: "bold",
        fill: d => colorMap[d.line_group],
        textAnchor: "middle"
      }),

      Plot.ruleY([0])
    ]
  });

  document.getElementById("bus-times-line").appendChild(chart);
}

drawBusTimesLines();
