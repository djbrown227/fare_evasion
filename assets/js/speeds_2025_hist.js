import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawHistogram() {
  const raw = await d3.csv("data/processed/speeds_2025peak.csv", d3.autoType);

  const speeds = raw.map(d => d.avg_speed_peak_2025).filter(d => Number.isFinite(d));
  const mean = d3.mean(speeds);

  // --- KDE scaled to counts ---
  const thresholds = 15;                            // keep in sync with histogram
  const n = speeds.length;
  const [xmin, xmax] = d3.extent(speeds);
  const binWidth = (xmax - xmin) / thresholds;

  // Silverman's rule-of-thumb bandwidth (fallback if sd is 0/undefined)
  const sd = d3.deviation(speeds) ?? 0;
  const h = sd > 0 ? 1.06 * sd * Math.pow(n, -1 / 5) : Math.max(0.1, (xmax - xmin) / 30);

  const gaussian = u => Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI);
  const xgridStep = (xmax - xmin) / 200;
  const xgrid = d3.range(xmin, xmax + xgridStep / 2, xgridStep);

  // Density normalized to 1 then scaled to expected counts per bin: n * binWidth
  const kdeCounts = xgrid.map(x => {
    const density = d3.mean(speeds, v => gaussian((x - v) / h)) / h; // probability density
    return { x, y: density * n * binWidth }; // scale to counts
  });

  const chart = Plot.plot({
    width: 800,
    height: 500,
    marginLeft: 80,
    marginBottom: 80,
    marginTop: 50,
    style: { background: "#fff", fontFamily: "Helvetica" },
    x: {
      label: "Average Peak Speed (mph)"
    },
    y: {
      label: "Number of Routes",
      domain:[0,80]
    },
    marks: [
      // Histogram (counts)
      Plot.rectY(
        raw,
        Plot.binX(
          { y: "count" },
          {
            x: "avg_speed_peak_2025",
            fill: "skyblue",
            thresholds
          }
        )
      ),

      // KDE line scaled to counts
      Plot.line(kdeCounts, {
        x: "x",
        y: "y",
        stroke: "steelblue",
        strokeWidth: 2
      }),

      // Mean line
      Plot.ruleX([mean], { stroke: "red", strokeDasharray: "4,4", strokeWidth: 2 }),

      Plot.axisY({
        scale: "y",
        label: "Number of Routes",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        ticks: 7
      }),

      Plot.axisX({
        scale: "x",
        label: "MPH",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 18,
        tickRotate: 0
      }),

      // Mean label
      Plot.text([mean], {
        x: d => d,
        y: 0,
        text: d => `Mean = ${d.toFixed(2)} mph`,
        dx: 5,
        dy: -350,
        fontSize: 14,
        fill: "red",
        textAnchor: "start"
      })
    ]
  });

  document.getElementById("route-speed-hist").appendChild(chart);
}

drawHistogram();
