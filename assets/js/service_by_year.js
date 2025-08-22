import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawScheduleRatioLine() {
  const raw = await d3.csv("data/processed/service_ratio_by_year.csv", d3.autoType);

  // Ensure sorting by year
  raw.sort((a, b) => d3.ascending(a.year, b.year));

  const first = raw[0];
  const last = raw[raw.length - 1];
  const max = d3.max(raw, d => d.scheduled_to_actual_ratio);
  const min = d3.min(raw, d => d.scheduled_to_actual_ratio);
  const highest = raw.find(d => d.scheduled_to_actual_ratio === max);
  const lowest = raw.find(d => d.scheduled_to_actual_ratio === min);

  // 👉 Label first, last, 2019, and extremes
  const yr2019 = raw.find(d => d.year === 2019);
  const labeled = [first, last, highest, lowest, yr2019].filter(Boolean);

  const chart = Plot.plot({
    width: 1000,
    height: 600,
    marginLeft: 100,
    marginRight: 200,
    marginBottom: 100,
    marginTop: 100,
    style: { background: "#fff", fontFamily: "Helvetica" },
    y: {
      label: "Scheduled / Actual Ratio",
      domain: [0.9, 1.0], // adjust if needed
      tickFormat: d3.format(".2f")
    }, 
    x: {
      label: "Year",
      tickFormat: d3.format("d"),
      ticks: raw.map(d => d.year)
    },
    marks: [
      // Axes
      Plot.axisY({
        scale: "y",
        label: "Scheduled / Actual Ratio",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        tickFormat: d3.format(".2f"),
        ticks: 6
      }),
      Plot.axisX({
        scale: "x",
        label: "Year",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 18,
        tickFormat: d3.format("d"),
        ticks: raw.map(d => d.year),
        tickRotate: -45
      }),

      // Line
      Plot.line(raw, {
        x: "year",
        y: "scheduled_to_actual_ratio",
        stroke: "#1f77b4",
        strokeWidth: 4,
        curve: "monotone-x"
      }),

      // Labels
      Plot.text(labeled, {
        x: "year",
        y: "scheduled_to_actual_ratio",
        text: d => d3.format(".3f")(d.scheduled_to_actual_ratio),
        dy: -15,
        dx: 5,
        fontWeight: "bold",
        fontSize: 16,
        textAnchor: "start",
        fill: "#1f77b4"
      }),

      Plot.ruleY([1.0], {stroke: "gray", strokeDasharray: "4,4"})
    ]
  });

  document.getElementById("schedule-ratio-line").appendChild(chart);
}

drawScheduleRatioLine();
