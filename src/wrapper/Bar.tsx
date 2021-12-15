/*eslint-disable */
import { processColor } from "react-native";
import { BarChart } from "react-native-charts-wrapper";
import React from "react";

const records = [
  {
    steps: 500,
    timestamp: 1639043479 * 1000
  },
  {
    steps: 600,
    timestamp: 1639129879 * 1000
  },
  {
    steps: 550,
    timestamp: 1639216279 * 1000
  },
  {
    steps: 150,
    timestamp: 1639302679 * 1000
  },
  {
    steps: 812,
    timestamp: 1639389079 * 1000
  },
  {
    steps: 2001,
    timestamp: 1639475479 * 1000
  },
  {
    steps: 90,
    timestamp: 1639561879 * 1000
  },
  {
    steps: 100,
    timestamp: 1639648279 * 1000
  },
  {
    steps: 600,
    timestamp: 1639734679 * 1000
  }
];

const values = records.map(record => {
  return {
    x: records.indexOf(record),
    y: record.steps,
    marker: `${new Date(record.timestamp).toLocaleDateString()} | ${record.steps} pasos`
  };
});

export const Bar = () => (
  <BarChart
    style={{ height: 500 }}
    scaleEnabled={false}
    legend={{
      enabled: false
    }}
    chartDescription={{
      text: ""
    }}
    xAxis={{
      drawLabels: true,
      valueFormatter: records.map(record => new Date(record.timestamp).toLocaleDateString()),
      position: "BOTTOM",
      yOffset: 20,
      gridDashedLine: {
        spaceLength: 5,
        lineLength: 10
      }
    }}
    yAxis={{
      right: {
        drawLabels: true
      }
    }}
    marker={{
      enabled: true,
      markerColor: processColor("green"),
      textColor: processColor("white")
    }}
    data={{
      dataSets: [
        {
          label: "1",
          values: values,
          config: {
            color: processColor("green"),
            colors: records.map(record => record.steps <= 200 ? processColor("red") : processColor("green")),
            highlightEnabled: true,
            drawValues: false
          }
        }
      ]
    }}
  />
);
