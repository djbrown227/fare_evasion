import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawDailyRidershipLine() {
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
  const max = d3.max(raw, d => d["Average Daily Ridership"]);
  const highest = raw.find(d => d["Average Daily Ridership"] === max);

  // 👉 Add 2019 explicitly
  const yr2019 = raw.find(d => d.Year_clean === 2019);
  const labeled = [first, last, highest, yr2019].filter(Boolean);

  // Formatter for millions with 2 decimals (e.g. 2.50M, 1.78M)
  const formatMillions = d3.format(".2s");

  const chart = Plot.plot({
    width: 900,
    height: 600,
    marginLeft: 100,
    marginRight: 150,
    marginBottom: 100,
    marginTop: 100,
    style: { background: "#fff", fontFamily: "Helvetica" },
    y: {
      domain: [0, 2500000],   // 👈 daily ridership scale
      label: "Average Daily Ridership",
      tickFormat: formatMillions
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
        label: "Average Daily Ridership",
        fontSize: 16,
        labelFont: "Helvetica",
        labelFontSize: 16,
        tickFormat: formatMillions,
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
        tickRotate: -45,
        ticks:8
      }),
      
      // Line
      Plot.line(raw, {
        x: "Year_clean",
        y: "Average Daily Ridership",
        stroke: "#FF9B00", // blue for distinction
        strokeWidth: 4,
        curve: "monotone-x"
      }),

      // Dots
      Plot.dot(labeled, {
        x: "Year_clean",
        y: "Average Daily Ridership",
        r: 5,
        fill: d => (d.Projected ? "orange" : "#FF9B00"),
        title: d => `${d.Year}: ${formatMillions(d["Average Daily Ridership"])}`
      }),

      // Labels with "Projected" note for 2025*
      Plot.text(labeled, {
        x: "Year_clean",
        y: "Average Daily Ridership",
        text: d => d.Projected
          ? `${formatMillions(d["Average Daily Ridership"])} (Projected)`
          : `${formatMillions(d["Average Daily Ridership"])}`,
        dy: -10,
        dx: 5,
        fontWeight: "bold",
        fontSize: 16,
        textAnchor: "start",
        fill: d => (d.Projected ? "black" : "black")
      }),

      Plot.ruleY([0])
    ]
  });

  document.getElementById("daily-ridership-line").appendChild(chart);
}

drawDailyRidershipLine();
