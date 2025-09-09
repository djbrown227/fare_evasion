import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawStackedBar() {
  const raw = await d3.csv("data/processed/speeds_2025peak.csv", d3.autoType);
  const speeds = raw.map(d => d.avg_speed_peak_2025).filter(d => Number.isFinite(d));

  // Define bins
  const bins = [0, 5, 7, 9, 11, 15];
  const labels = ["≤5 mph", "5–7 mph", "7–9 mph", "9–11 mph", ">11 mph"];
  
  // Highlight "5–7 mph" with a contrasting color
  const colors = ["#d73027","#FF9B00","#fee08b","#91bfdb","#4575b4"];

  // Bin speeds into categories
  const binned = speeds.map(s => {
    for (let i = 0; i < bins.length - 1; i++) {
      if (s >= bins[i] && s < bins[i + 1]) return labels[i];
    }
    if (s >= bins[bins.length - 1]) return labels[labels.length - 1];
    return null;
  });

  // Count frequencies
  const counts = d3.rollup(binned, v => v.length, d => d);
  const total = speeds.length;

  // Convert to percentages
  const pctData = labels.map(label => ({
    bin: label,
    percent: (counts.get(label) ?? 0) / total * 100
  }));

  // Add cumulative offsets for stacked positioning
  let cumulative = 0;
  const pctDataWithOffsets = pctData.map(d => {
    const y0 = cumulative;
    cumulative += d.percent;
    return {
      ...d,
      y0,
      yMid: y0 + d.percent / 2 // midpoint for text
    };
  });

  const chart = Plot.plot({
    width: 700,
    height: 500,
    marginLeft: 50,
    marginRight:50,
    marginBottom: 80,
    marginTop:50,
    style: { background: "#fff", fontFamily: "Helvetica" },
    x: {
      label: "Bus Routes",
      domain: ["All Routes"]
    },
    y: {
      label: "Percentage of Routes (%)",
      domain: [0, 100]
    },
    color: {
      domain: labels,
      range: colors,
      legend: true,
      label: "Speed Range"
    },
    marks: [
      // Explicit axes
      Plot.axisX({
        scale: "x",
        label: "",
        fontSize: 14,
        labelFont: "Helvetica",
        labelFontSize: 16
      }),
      Plot.axisY({
        scale: "y",
        label: "Percentage of Routes (%)",
        fontSize: 14,
        labelFont: "Helvetica",
        labelFontSize: 16,
        tickFormat: d => d + "%"
      }),

      // Stacked bar
      Plot.barY(pctDataWithOffsets, {
        x: () => "All Routes",
        y: "percent",
        fill: "bin",
        insetLeft: 100,
        insetRight: 100
      }),

      // Percentage labels
      Plot.text(pctDataWithOffsets, {
        x: () => "",
        y: d => d.yMid,
        text: d => `${d.percent.toFixed(1)}%`,
        fill: d => d.bin === "5–7 mph" ? "black" : "gray",
        fontWeight: d => d.bin === "5–7 mph" ? "bold" : "normal",
        fontSize: 12,
        textAnchor: "middle",
        dx: 130
      })
    ]
  });

  document.getElementById("stacked-bar").appendChild(chart);
}

drawStackedBar();
