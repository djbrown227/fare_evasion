// assets/js/busProjectionPlot.js
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawBusProjectionPlot() {
  const [projectionData, actualData] = await Promise.all([
    d3.csv("data/processed/mckinsey_df.csv", d3.autoType),
    d3.csv("data/processed/monthly_summary.csv", d3.autoType)
  ]);

  projectionData.forEach(d => {
    d.Date = new Date(d.Date);
  });
  actualData.forEach(d => {
    d.Date = new Date(d.Date);
  });

  const filtered = projectionData.filter(d => d.Agency === "Bus");

  const areaData = d3.rollups(
    filtered,
    v => {
      const map = Object.fromEntries(v.map(d => [d.Projection, d.Recovery]));
      return {
        Date: v[0].Date,
        Best: map["Best Case"],
        Mid: map["Midpoint"],
        Worst: map["Worst Case"]
      };
    },
    d => +d.Date
  ).map(([, d]) => d);

  // Get latest date for labels
  const latestDate = d3.max(filtered, d => d.Date);

  const labels = [
    {
      Date: latestDate,
      y: filtered.find(d => d.Date.getTime() === latestDate.getTime() && d.Projection === "Best Case")?.Recovery,
      label: "Best Case",
      color: "#aaaaaa"
    },
    {
      Date: latestDate,
      y: filtered.find(d => d.Date.getTime() === latestDate.getTime() && d.Projection === "Midpoint")?.Recovery,
      label: "Midpoint",
      color: "#888888"
    },
    {
      Date: latestDate,
      y: filtered.find(d => d.Date.getTime() === latestDate.getTime() && d.Projection === "Worst Case")?.Recovery,
      label: "Worst Case",
      color: "#bbbbbb"
    },
    {
      Date: d3.max(actualData, d => d.Date),
      y: actualData.find(d => d.Date.getTime() === d3.max(actualData, d => d.Date).getTime())?.Recovery,
      label: "Actual",
      color: "#ff7f0e"
    }
  ];

  const plot = Plot.plot({
    width: 1000,
    height: 500,
    marginLeft: 100,
    marginRight:100,
    marginBottom: 100,
    marks: [
      // Fill between best and worst
      Plot.areaY(areaData, {
        x: "Date",
        y1: "Best",
        y2: "Worst",
        fill: "#d3d3d3",
        fillOpacity: 0.3
      }),

      // Projection lines
      Plot.line(filtered.filter(d => d.Projection === "Best Case"), {
        x: "Date",
        y: "Recovery",
        stroke: "#aaaaaa",
        strokeWidth: 2
      }),
      Plot.line(filtered.filter(d => d.Projection === "Midpoint"), {
        x: "Date",
        y: "Recovery",
        stroke: "#888888",
        strokeDasharray: "4,4",
        strokeWidth: 2
      }),
      Plot.line(filtered.filter(d => d.Projection === "Worst Case"), {
        x: "Date",
        y: "Recovery",
        stroke: "#bbbbbb",
        strokeWidth: 2
      }),

      // Actual line
      Plot.line(actualData, {
        x: "Date",
        y: "Recovery",
        stroke: "#ff7f0e",
        strokeWidth: 3
      }),

      // Labels
      Plot.text(labels, {
        x: "Date",
        y: "y",
        text: "label",
        fill: "color",
        dx: 5,
        dy: 10,
        fontWeight: "bold"
      })
    ],
    x: {
      label: "Date",
      type: "time"
    },
    y: {
      label: "Recovery Ratio",
      grid: true
    }
  });

  document.getElementById("bus-projection-plot").appendChild(plot);
}

drawBusProjectionPlot();
