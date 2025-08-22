import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawCustomerJourneyFacets() {
  const data = await d3.csv("data/processed/bus_metrics.csv", d3.autoType);

  const chart = Plot.plot({
    width: 900,
    height: 400,
    marginLeft: 80,
    marginTop: 50,
    marginBottom: 60,
    style: { background: "#fff" },

    // Facet by period
    facet: {
      data: data,
      y: "period",
      columns: 1 // Peak and Off-Peak stacked vertically
    },

    marks: [
      Plot.line(data, {
        x: "year",
        y: "avg_customer_journey_time_performance",
        stroke: "#FF9B00",
        strokeWidth: 3,
        curve: "catmull-rom",
        title: d => `Year ${d.year}: ${d3.format(".3f")(d.avg_customer_journey_time_performance)}`
      }),
      Plot.ruleY([0]), // baseline
      Plot.axisX({
        fontSize: 12,
        label: "Year",
        tickFormat: d3.format("d")
      }),
      Plot.axisY({
        fontSize: 12,
        label: "Avg Customer Journey Time Performance",
        tickFormat: d3.format(".3f"),
        grid: true
      })
    ]
  });

  document.getElementById("customer-journey-facet").appendChild(chart);
}

drawCustomerJourneyFacets();
