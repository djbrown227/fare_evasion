import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const laneData = [
  {Year: 2024, New_Lane_Miles: 5.48, Miles_Upgraded: 13.5},
  {Year: 2023, New_Lane_Miles: 15.7, Miles_Upgraded: 5.2},
  {Year: 2022, New_Lane_Miles: 7.8, Miles_Upgraded: 4.4},
  {Year: 2021, New_Lane_Miles: 12.9, Miles_Upgraded: null},
  {Year: 2020, New_Lane_Miles: 16.3, Miles_Upgraded: null}
];

// Transform to long format and fill nulls with 0
const longData = [];
laneData.forEach(d => {
  longData.push({Year: d.Year, Type: "New Lane Miles", Miles: d.New_Lane_Miles ?? 0});
  longData.push({Year: d.Year, Type: "Miles Upgraded", Miles: d.Miles_Upgraded ?? 0});
});

const chart = Plot.plot({
  width: 700,
  height: 400,
  marginLeft: 100,
  marginBottom: 80,
  marginTop: 60,
  style: { background: "#fff" },

  y: {
    label: "Miles",
    fontSize: 14,
    fontFamily: "Helvetica",
    grid: true
  },

  x: {
    label: "Year",
    tickFormat: d3.format("d"),  // ensures integers show without commas
    fontSize: 14,
    fontFamily: "Helvetica"
  },

  marks: [
    Plot.barY(longData, {
      x: "Year",
      y: "Miles",
      fill: "Type",
      fx: "Type",
      inset: 0.1,
      title: d => `${d.Type} (${d3.format("d")(d.Year)}): ${d.Miles}` // format year here too
    }),
    Plot.ruleY([0]),

    Plot.axisX({
      fontSize: 14,
      fontFamily: "Helvetica",
      label: "Year",
      labelFontSize: 16,
      labelFontWeight: "bold",
      tickFormat: d3.format("d") // extra safety
    }),
    Plot.axisY({
      fontSize: 14,
      fontFamily: "Helvetica",
      label: "Miles",
      labelFontSize: 16,
      labelFontWeight: "bold"
    })
  ],

  color: {
    domain: ["New Lane Miles", "Miles Upgraded"],
    range: ["#FF9B00", "#2D9CDB"],
    legend: true,
    label: "Type"
  }
});

document.getElementById("lane-grouped-bar-chart").appendChild(chart);
