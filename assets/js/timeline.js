import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Fare timeline data
const fareData = [
  { start: "1975-09-02", end: "1980-06-27", fare: 0.50, color: "lightgray" },
  { start: "1980-06-28", end: "1981-07-02", fare: 0.60, color: "lightgray" },
  { start: "1981-07-03", end: "1984-01-01", fare: 0.75, color: "lightgray" },
  { start: "1984-01-02", end: "1985-12-31", fare: 0.90, color: "lightgray" },
  { start: "1986-01-01", end: "1989-12-31", fare: 1.00, color: "lightgray" },
  { start: "1990-01-01", end: "1991-12-31", fare: 1.15, color: "lightgray" },
  { start: "1992-01-01", end: "1995-11-11", fare: 1.25, color: "lightgray" },
  { start: "1995-11-12", end: "2003-05-03", fare: 1.50, color: "#FF9B00" },
  { start: "2003-05-04", end: "2009-06-27", fare: 2.00, color: "#FF9B00" },
  { start: "2009-06-28", end: "2010-12-29", fare: 2.25, color: "#FF9B00" },
  { start: "2010-12-30", end: "2013-03-02", fare: 2.25, color: "#2D9CDB" },
  { start: "2013-03-03", end: "2015-03-21", fare: 2.50, color: "#2D9CDB" },
  { start: "2015-03-22", end: "2023-08-19", fare: 2.75, color: "#2D9CDB" },
  { start: "2023-08-20", end: "2026-01-03", fare: 2.90, color: "#FF9B00" },
  { start: "2026-01-04", end: "2030-12-31", fare: 3.00, color: "#FF9B00" } // future placeholder
];

// Convert dates to JS Date objects
fareData.forEach(d => {
  d.start = new Date(d.start);
  d.end = new Date(d.end);
});

// Create timeline chart
const chart = Plot.plot({
  width: 900,
  height: 500,
  marginLeft: 80,
  marginBottom: 60,
  marginTop: 60,
  x: {
    label: "Year",
    tickFormat: d => d.getFullYear(),
    domain: [new Date("1975-01-01"), new Date("2030-01-01")]
  },
  y: {
    label: "Fare ($)",
    domain: [0, 4]
  },
  marks: [
    Plot.barX(fareData, {x1: "start", x2: "end", y: "fare", fill: d => d.color}),
    Plot.text(fareData, {
      x: d => new Date((d.start.getTime() + d.end.getTime())/2),
      y: "fare",
      text: d => `$${d.fare}`,
      dy: -5,
      fill: "black",
      textAnchor: "middle",
      fontWeight: "bold"
    }),
    Plot.ruleY([0], { stroke: "black", strokeWidth: 1 })
  ],
  style: { fontFamily: "Helvetica", background: "#fff" }
});

// Append to HTML
document.getElementById("fare-timeline").appendChild(chart);
