import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawScatterWithHighlights() {
  const raw = await d3.csv("data/processed/customers_speed_2025.csv", d3.autoType);

  const a = 60.188;
  const b = 2.791;

  // Generate curve points for the fit
  const xMin = 1; // avoid log(0)
  const xMax = 500000;
  const curvePoints = d3.range(xMin, xMax, (xMax - xMin)/500).map(x => ({
    x,
    y: a / Math.log(x) + b
  }));

  // Sort by avg_monthly_number_of_customers
  const sorted = [...raw].sort((a, b) => b.avg_monthly_number_of_customers - a.avg_monthly_number_of_customers);
  const top10 = new Set(sorted.slice(0, 10).map(d => d.route_id));

  // Choose colors
  const topColor = "aqua";
  const defaultColor = "black";

  const chart = Plot.plot({
    width: 1000,
    height: 600,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 50,
    style: { background: "#fff", fontFamily: "Helvetica" },
    x: {
      label: "Average Monthly Number of Customers",
      tickFormat: d3.format(","),
      domain: [0, 500000]
    },
    y: {
      label: "Average Speed (mph)",
      domain: [4, 20]
    },
    marks: [
      // Scatter points
      Plot.dot(raw, {
        x: "avg_monthly_number_of_customers",
        y: "avg_average_speed",
        r: 6,
        fill: d => top10.has(d.route_id) ? topColor : defaultColor,
        fillOpacity: d => top10.has(d.route_id) ? 1 : 0.3, // highlight top 10
        title: d => `${d.route_id}: ${d3.format(",")(d.avg_monthly_number_of_customers)} customers, ${d.avg_average_speed.toFixed(2)} mph`
      }),

      // Fitted curve
      Plot.line(curvePoints, {
        x: "x",
        y: "y",
        stroke: "#FF9B00",
        strokeWidth: 7
      }),

      // Axes
      Plot.axisX({
        scale: "x",
        label: "Average Monthly Number of Customers",
        fontSize: 16,
        labelFont: "Helvetica",
        tickFormat: d3.format(","),
        ticks: 6
      }),
      Plot.axisY({
        scale: "y",
        label: "Average Speed (mph)",
        fontSize: 16,
        labelFont: "Helvetica",
        ticks: [5, 8, 11, 14, 17, 20]
      })
    ]
  });

  document.getElementById("route-speed-scatter").appendChild(chart);
}

drawScatterWithHighlights();
