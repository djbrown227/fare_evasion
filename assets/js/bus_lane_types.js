import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const laneData = [
  {Lane_Type: "Curbside", Mileage: 77.33},
  {Lane_Type: "Offset", Mileage: 66.60},
  {Lane_Type: "Median/Center-Running", Mileage: 6.84},
  {Lane_Type: "Busway", Mileage: 5.72},
  {Lane_Type: "Other", Mileage: 4.71},
  {Lane_Type: "Uncategorized", Mileage: 1.68}
];

const chart = Plot.plot({
  width: 700,
  height: 400,
  marginLeft: 100,
  marginBottom: 80,
  marginTop: 60,
  style: { background: "#fff" },

  x: {
    label: "Lane Type",
    tickRotate: -30,
    fontSize: 14,
    fontFamily: "Helvetica"
  },

  y: {
    label: "Mileage",
    fontSize: 14,
    fontFamily: "Helvetica",
    grid: true,
    domain:[0,100]
  },

  marks: [
    Plot.barY(laneData, {
      x: "Lane_Type",
      y: "Mileage",
      fill: "#2D9CDB",
      title: d => `${d.Lane_Type}: ${d.Mileage} miles`
    }),
    Plot.ruleY([0]),

    // Explicit axes
    Plot.axisX({
      fontSize: 14,
      fontFamily: "Helvetica",
      label: "Lane Type",
      labelFontSize: 16,
      labelFontWeight: "bold"
    }),
    Plot.axisY({
      fontSize: 14,
      fontFamily: "Helvetica",
      label: "Mileage",
      labelFontSize: 16,
      labelFontWeight: "bold"
    })
  ]
});

document.getElementById("lane-bar-chart").appendChild(chart);
