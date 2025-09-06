import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Data with custom colors per bar
const ridershipData = [
  { Year: "2014", AvgDaily: 2.171596e+06, color: "lightgray" },
  { Year: "2015", AvgDaily: 2.126250e+06, color: "lightgray" },
  { Year: "2016", AvgDaily: 2.093234e+06, color: "lightgray" },
  { Year: "2017", AvgDaily: 1.985848e+06, color: "lightgray" },
  { Year: "2018", AvgDaily: 1.892629e+06, color: "lightgray" },
  { Year: "2019", AvgDaily: 1.856406e+06, color: "lightgray" },
  { Year: "2020", AvgDaily: 4.038019e+05, color: "#2D9CDB" },
  { Year: "2021", AvgDaily: 1.045583e+06, color: "#2D9CDB" },
  { Year: "2022", AvgDaily: 1.161498e+06, color: "#2D9CDB" },
  { Year: "2023", AvgDaily: 1.165862e+06, color: "#2D9CDB" },
  { Year: "2024", AvgDaily: 1.120198e+06, color: "#2D9CDB" },
  { Year: "2025*", AvgDaily: 1.080813e+06, color: "#FF9B00", Projected: true }
];

// Compute average
const avgDaily = d3.mean(ridershipData, d => d.AvgDaily);

// Compute divergence from average
ridershipData.forEach(d => {
  d.divergence = d.AvgDaily - avgDaily;
});

// Create diverging horizontal bar chart with light vertical grid marks
const chart = Plot.plot({
  width: 700,
  height: 700,
  marginLeft: 80,
  marginBottom: 80,
  marginTop: 100,
  style: { background: "#fff", fontFamily: "Helvetica" },
  x: {
    label: "Deviation from Average Daily Ridership",
    domain: [-1500000, 1000000],
    tickFormat: d3.format(".2s")
  },
  y: {
    domain: ["2025*", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"],
    label: "Year"
  },
  marks: [
    // Light vertical grid marks
    Plot.ruleX(d3.range(-1500000, 1000001, 200000), {
      stroke: "#999",
      strokeOpacity: 0.2,
      strokeWidth: 1
    }),
    // Bars with per-bar colors
    Plot.barX(ridershipData, {
      y: "Year",
      x: "divergence",
      fill: d => d.color
    }),
    // Zero line
    Plot.ruleX([0], { stroke: "black", strokeWidth: 1 }),
    // Explicit axes
    Plot.axisX({
      scale: "x",
      label: "Deviation from Average Daily Ridership",
      fontSize: 16,
      labelFont: "Helvetica",
      tickFormat: d3.format(".2s")
    }),
    Plot.axisY({
      scale: "y",
      label: "Year",
      fontSize: 16,
      labelFont: "Helvetica"
    }),
    // Annotation text for 2025*
    Plot.text(
      [
        {
          Year: "2025*",
          divergence: ridershipData.find(d => d.Year === "2025*").divergence,
          label: "Projected: 1.08M riders\n(Down from 2.17M in 2014)"
        }
      ],
      {
        x: d => d.divergence + 100000, // push text to right of bar
        y: "Year",
        text: "label",
        dx: 100,
        dy: -5,
        fontSize: 16,
        fill: "Black",
        textAnchor: "start"
      }
    )
  ]
});

// Append chart to HTML
document.getElementById("diverging-bar-chart").appendChild(chart);
