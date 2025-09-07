import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawAvgSpeedLines() {
  const raw = await d3.csv("data/processed/result_bus_speeds.csv", d3.autoType);

  // Round avg_speed_weighted to 2 decimals
  raw.forEach(d => d.avg_speed_weighted = +d.avg_speed_weighted.toFixed(2));

  // Map day_type to Weekday/Weekend
  raw.forEach(d => d.day_label = d.day_type === 1 ? "Weekday" : "Weekend");

  // Combine day_label and period for line grouping
  raw.forEach(d => d.line_group = `${d.day_label} ${d.period}`);

  // Define color mapping
  const colorMap = {
    "Weekday Off-Peak": "#FF9B00",
    "Weekday Peak": "#FF0000",
    "Weekend Off-Peak": "#2D9CDB",
    "Weekend Peak": "#0000FF"
  };

  // Convert years to strings for proper tick labels
  raw.forEach(d => d.year_str = String(d.year));

  const uniqueYears = [...new Set(raw.map(d => d.year))];
  const tickYears = uniqueYears.map(String); // show all years on x-axis

  // Years to label: first year, 2019, 2025
  const labelYears = [uniqueYears[0], 2018, 2025];

  // Prepare label data
  const labelData = raw.filter(d => labelYears.includes(d.year));

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
      domain: [7, 9],
      label: "Weighted Average Speed (mph)"
    },
    color: {
      domain: Object.keys(colorMap),
      range: Object.values(colorMap),
      legend: true
    },
    marks: [
      Plot.axisY({
        scale: "y",
        label: "Weighted Average Speed (mph)",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        ticks: 7
      }),
      Plot.axisX({
        scale: "x",
        label: "Year",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 18,
        tickRotate: -45
      }),
      
      // Lines
      Plot.line(raw, {
        x: "year_str",
        y: "avg_speed_weighted",
        stroke: "line_group",
        strokeWidth: 3,
        curve: "monotone-x"
      }),

      // Dots
      Plot.dot(raw, {
        x: "year_str",
        y: "avg_speed_weighted",
        fill: "line_group",
        r: 4,
        title: d => `${d.year} ${d.line_group}: ${d.avg_speed_weighted} mph`
      }),

      // **Labels for first year, 2019, 2025**
      Plot.text(labelData, {
        x: "year_str",
        y: "avg_speed_weighted",
        text: d => `${d.avg_speed_weighted} mph`,
        dx: -0,
        dy: -15,
        fontSize: 14,
        fontWeight: "bold",
        fill: d => colorMap[d.line_group],
        textAnchor: "middle"
      }),

      Plot.ruleY([0])
    ]
  });

  document.getElementById("avg-speed-line").appendChild(chart);
}

drawAvgSpeedLines();
