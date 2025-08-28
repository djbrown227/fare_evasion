import {plot} from "@observablehq/plot";

// Data
const data = [
  {year: 2017, avg_additional_bus_stop_time: 2.078737, avg_additional_travel_time: 0.935338},
  {year: 2018, avg_additional_bus_stop_time: 1.974035, avg_additional_travel_time: 0.767853},
  {year: 2019, avg_additional_bus_stop_time: 2.407678, avg_additional_travel_time: 1.110827},
  {year: 2020, avg_additional_bus_stop_time: 2.257264, avg_additional_travel_time: 0.173992},
  {year: 2021, avg_additional_bus_stop_time: 2.873868, avg_additional_travel_time: 0.227701},
  {year: 2022, avg_additional_bus_stop_time: 2.790826, avg_additional_travel_time: 0.674259},
  {year: 2023, avg_additional_bus_stop_time: 2.695352, avg_additional_travel_time: 0.786603},
  {year: 2024, avg_additional_bus_stop_time: 3.081756, avg_additional_travel_time: 0.941573},
  {year: 2025, avg_additional_bus_stop_time: 2.779832, avg_additional_travel_time: 0.808098},
];

// Transform data to long format for Observable Plot
const longData = data.flatMap(d => [
  {year: d.year, type: "Bus Stop Time", value: d.avg_additional_bus_stop_time},
  {year: d.year, type: "Travel Time", value: d.avg_additional_travel_time}
]);

Plot.plot({
  marks: [
    Plot.line(longData, {x: "year", y: "value", stroke: "type"}),
    Plot.dot(longData, {x: "year", y: "value", fill: "type"})
  ],
  x: {tickFormat: d => d}, // show full year
  y: {label: "Time (minutes)"},
  color: {legend: true}
})
