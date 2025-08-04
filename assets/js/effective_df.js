import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawFarePaidVsLost() {
  const rawData = await d3.csv("data/processed/effective_df.csv", d3.autoType);

  // Create quarter labels
  rawData.forEach(d => {
    d.quarterLabel = `${d.Year} ${d.Quarter}`;
  });

  // Sort data by Year and Quarter
  const quarterOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
  rawData.sort((a, b) => d3.ascending(a.Year * 10 + quarterOrder[a.Quarter], b.Year * 10 + quarterOrder[b.Quarter]));

  // Prepare data, with loss values negated for plotting below zero
  const chartData = rawData.flatMap(d => [
    { quarter: d.quarterLabel, category: "Fare Paid", value: d.effective_fare_paid_per_rider },
    { quarter: d.quarterLabel, category: "Fare Lost", value: -d.effective_fare_loss_per_rider }
  ]);

  // Quarters where you want to show text labels
  const quartersToLabel = ["2020 Q4", "2022 Q4", "2024 Q4"];
  const labelsData = chartData.filter(d => quartersToLabel.includes(d.quarter));

  const plot = Plot.plot({
    width: 900,
    height: 500,
    marginLeft: 80,
    marginBottom: 80,
    marginTop: 60,
    style: { background: "#fff" },
    x: {
      type: "band",
      label: "Quarter",
      tickRotate: -45
    },
    y: {
      label: "Fare per Rider (USD)",
      grid: true,
      tickFormat: d => `$${Math.abs(d).toFixed(2)}`,
      domain: [
        -d3.max(rawData, d => d.effective_fare_loss_per_rider) * 2.25,
        d3.max(rawData, d => d.effective_fare_paid_per_rider) * 1.5
      ]
    },
    color: {
      legend: true,
      domain: ["Fare Paid", "Fare Lost"],
      range: ["#89CFF0", "#1F4E79"]
    },
    marks: [
      Plot.barY(chartData, {
        x: "quarter",
        y: "value",
        fill: "category",
        title: d => `${d.category}: $${Math.abs(d.value).toFixed(2)}`
      }),
            // Text label on one bar: 2024 Q4 Fare Paid
            Plot.text(
              chartData.filter(d => d.quarter === "2024 Q4" && d.category === "Fare Paid"),
              {
                x: "quarter",
                y: d => d.value,
                text: d => `$${Math.abs(d.value).toFixed(2)}`,
                textAnchor: "middle",
                dy: -8,
                fontWeight: "bold",
                fontSize: 14,
                fill: "black"
              }
            ),
            Plot.text(
              chartData.filter(d => d.quarter === "2024 Q3" && d.category === "Fare Lost"),
              {
                x: "quarter",
                y: d => d.value,
                text: d => `$${Math.abs(d.value).toFixed(2)}`,
                textAnchor: "middle",
                dy: 14,
                fontWeight: "bold",
                fontSize: 14,
                fill: "black"
              }
            ),
      
      Plot.ruleY([0])  // horizontal zero line
    ]
  });

  document.getElementById("fare-bar").appendChild(plot);
}

drawFarePaidVsLost();
