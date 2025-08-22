import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawWaitAssessmentPlot() {
  const data = await d3.csv("data/processed/yearly_wait_assessment.csv", d3.autoType);

  // Filter out 2025 if needed
  const filtered = data.filter(d => d.year < 2026);

  const periods = Array.from(new Set(filtered.map(d => d.period)));

  document.body.style.fontFamily = "Inter, system-ui, sans-serif";

  const chart = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 60,
    style: { background: "#fff" },
      // Set y domain here
  y: {
    domain: [0.6, 0.85] ,       // ✅ custom y-axis domain
  },
    marks: [
      ...periods.map((p, i) =>
        Plot.line(
          filtered.filter(d => d.period === p),
          {
            x: "year",
            y: "wait_assessment",
            stroke: i === 0 ? "#FF9B00" : "#2D9CDB",
            strokeWidth: 3,
            curve: "catmull-rom",
            title: d => `${p}: ${(d.wait_assessment * 100).toFixed(1)}%`
          }
        )
      ),
      Plot.ruleY([0]), // baseline
      // Custom X axis
      Plot.axisX({
        tickFormat: d3.format("d"),
        fontSize: 14,
        fontFamily: "Helvetica",
        label: "Year",
        labelFontSize: 16,
        labelFontWeight: "bold",
        tickRotate: -45
      }),
      // Custom Y axis
      Plot.axisY({
        fontSize: 14,
        fontFamily: "Helvetica",
        label: "Wait Assessment",
        labelFontSize: 16,
        labelFontWeight: "bold",
        tickFormat: d3.format(".2f")
      })
    ],
    color: {
      domain: periods,
      range: ["#FF9B00", "#2D9CDB"],
      legend: true
    }
  });

  document.getElementById("wait-assessment-plot").appendChild(chart);
}

drawWaitAssessmentPlot();
