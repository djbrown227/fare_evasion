import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawJourneyVsWait() {
  const raw = await d3.csv("data/processed/df_journey.csv", d3.autoType);

  // Melt into long format
  const melted = [];
  raw.forEach(d => {
    melted.push({ year: d.year, metric: "Journey Time Performance", value: d.customer_journey_time_performance });
    melted.push({ year: d.year, metric: "Avg Wait Assessment", value: d.avg_wait_assessment });
  });

  // Convert years to strings for ticks
  melted.forEach(d => d.year_str = String(d.year));
  const uniqueYears = [...new Set(melted.map(d => d.year))];
  const tickYears = uniqueYears.map(String);

  // Labels + dots only for these years
  const labelYears = [2017, 2019, 2025];
  const labelData = melted.filter(d => labelYears.includes(d.year));

  // Color mapping
  const colorMap = {
    "Journey Time Performance": "#FF9B00",
    "Avg Wait Assessment": "#2D9CDB"
  };

  // === Set your y-axis domain + ticks here ===
  const yDomain = [0.60, 0.85];     // 60% to 85%
  const yTicks = [0.60, 0.65, 0.70, 0.75, 0.80, 0.85]; // adjust as needed

  const chart = Plot.plot({
    width: 900,
    height: 550,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 80,
    marginTop: 50,
    style: { background: "#fff", fontFamily: "Helvetica" },
    x: {
      label: "Year",
      tickFormat: d => d,
      ticks: tickYears
    },
    y: {
      label: "Score (%)",
      domain: yDomain,
      ticks: yTicks,
      tickFormat: d3.format(".0%")   // format as whole percentages
    },
    color: {
      domain: Object.keys(colorMap),
      range: Object.values(colorMap),
      legend: true
    },
    marks: [
      // Y-axis
      Plot.axisY({
        label: "Score (%)",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        tickFormat: d3.format(".0%")
      }),

      // X-axis
      Plot.axisX({
        label: "Year",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 18,
        tickRotate: -45
      }),

      // Lines
      Plot.line(melted, {
        x: "year_str",
        y: "value",
        stroke: "metric",
        strokeWidth: 3,
        curve: "monotone-x"
      }),

      // Dots (only at label years)
      Plot.dot(labelData, {
        x: "year_str",
        y: "value",
        fill: "metric",
        r: 4,
        title: d => `${d.year} ${d.metric}: ${(d.value * 100).toFixed(0)}%`
      }),

      // Labels (2017, 2019, 2025)
      Plot.text(labelData, {
        x: "year_str",
        y: "value",
        text: d => `${(d.value * 100).toFixed(0)}%`,
        dy: -17,
        dx: 12,
        fontSize: 14,
        fontWeight: "bold",
        fill: d => colorMap[d.metric],
        textAnchor: "middle"
      }),

      Plot.ruleY([0])
    ]
  });

  document.getElementById("journey-wait-line").appendChild(chart);
}

drawJourneyVsWait();
