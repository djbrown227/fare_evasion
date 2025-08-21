import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Embedded data
const ridership = [
  {period: "Pre-Covid", avg: 2355801},
  {period: "Post-Covid", avg: 1314135}
];

const chart = Plot.plot({
  width: 800,
  height: 360,
  marginTop: 60,
  marginLeft: 100,
  marginRight: 100,
  marginBottom: 100,
  style: { background: "#fff", fontFamily: "Helvetica" },
  y: {
    domain: [0, 2500000],   // 👈 adjust to fit your data
    tickFormat: d => (d / 1000000).toFixed(2) + "M" // e.g., 2.36M
  },
  marks: [
    // Explicit axes with font settings
    Plot.axisY({
      scale: "y",
      label: "Average Weekday Ridership",
      fontSize: 16,        
      labelFont: "Helvetica",
      labelFontSize: 14,   
      tickFormat: d => (d / 1000000).toFixed(2) + "M"
    }),

    Plot.axisX({
      scale: "x",
      label: null,
      fontSize: 16,        
      labelFont: "Helvetica",
      labelFontSize: 14,
      tickRotate: 0,       
      ticks: ridership.map(d => d.period) // Pre-Covid, Post-Covid
    }),

    // Bars
    Plot.barY(ridership, {
      x: "period",
      y: "avg",
      fill: "orange"
    }),

    // Labels above bars
    Plot.text(ridership, {
      x: "period",
      y: "avg",
      text: d => (d.avg / 1000000).toFixed(2) + "M",
      dy: -10,
      fontSize: 16,
      fontWeight: "bold",
      textAnchor: "middle",
      fill: "orange"
    })
  ]
});

document.getElementById("weekday-ridership-bar").appendChild(chart);
