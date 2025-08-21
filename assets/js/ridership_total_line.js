import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawYearlyRidershipLine() {
  const raw = await d3.csv("data/processed/df_bus_ridership.csv", d3.autoType);

  // Parse the special "2025*" row into a clean year + flag
  raw.forEach(d => {
    if (String(d.Year).includes("*")) {
      d.Year_clean = +d.Year.replace("*", "");
      d.Projected = true;
    } else {
      d.Year_clean = +d.Year;
      d.Projected = false;
    }
  });

  raw.sort((a, b) => d3.ascending(a.Year_clean, b.Year_clean));

  const first = raw[0];
  const last = raw[raw.length - 1];
  const max = d3.max(raw, d => d.Ridership);
  const highest = raw.find(d => d.Ridership === max);

  // 👉 Add 2019 explicitly + keep first/last/highest
  const yr2019 = raw.find(d => d.Year_clean === 2019);
  const labeled = [first, last, highest, yr2019].filter(Boolean);

  const chart = Plot.plot({
    width: 1000,
    height: 600,
    marginLeft: 100,
    marginRight: 200,
    marginBottom: 100,
    marginTop: 100,
    style: { background: "#fff", fontFamily: "Helvetica" },
    y: {
      domain: [0, 900000000],
      label: "Ridership (Annual Total)",
      tickFormat: d3.format(".2s")
    }, 
    x: {
      label: "Year",
      tickFormat: d3.format("d"),
      ticks: raw.map(d => d.Year_clean)
    },
    marks: [
      // Explicit axes with font styling
      Plot.axisY({
        scale: "y",
        label: "Ridership (Annual Total)",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        tickFormat: d3.format(".2s"),
        ticks: 7
      }),
      
      Plot.axisX({
        scale: "x",
        label: "Year",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 18,
        tickFormat: d3.format("d"),
        ticks: raw.map(d => d.Year_clean),
        tickRotate: -45
      }),
      
      // Line
      Plot.line(raw, {
        x: "Year_clean",
        y: "Ridership",
        stroke: "#FF9B00",
        strokeWidth: 4,
        curve: "linear"
      }),

      // Dots
      //Plot.dot(raw, {
        //x: "Year_clean",
        //y: "Ridership",
        //r: 5,
        //fill: d => (d.Projected ? "steelblue" : "#FF9B00"),
        //title: d => `${d.Year}: ${d3.format(",")(d.Ridership)}`
      //}),

      // 👉 Labels with "Projected" note for 2025*
      Plot.text(labeled, {
        x: "Year_clean",
        y: "Ridership",
        text: d => d.Projected
          ? `${d3.format(".2s")(d.Ridership)} (Projected)`
          : `${d3.format(".2s")(d.Ridership)}`,
        dy: -15,
        dx: 5,
        fontWeight: "bold",
        fontSize: 16,
        textAnchor: "start",
        fill: d => (d.Projected ? "steelblue" : "#FF9B00")
      }),

      Plot.ruleY([0])
    ]
  });

  document.getElementById("ridership-line").appendChild(chart);
}

drawYearlyRidershipLine();
