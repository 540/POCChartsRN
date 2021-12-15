/*eslint-disable */
import { ScatterChart } from "react-native-charts-wrapper";
import React from "react";
import { Platform, processColor } from "react-native";

const records = [
  {
    up: 120,
    down: 60,
    timestamp: 1639043479 * 1000
  },
  {
    up: 130,
    down: 50,
    timestamp: 1639129879 * 1000
  },
  {
    up: 100,
    down: 60,
    timestamp: 1639216279 * 1000
  },
  {
    up: 140,
    down: 80,
    timestamp: 1639302679 * 1000
  },
  {
    up: 114,
    down: 67,
    timestamp: 1639389079 * 1000
  },
  {
    up: 118,
    down: 81,
    timestamp: 1639475479 * 1000
  },
  {
    up: 160,
    down: 90,
    timestamp: 1639561879 * 1000
  },
  {
    up: 110,
    down: 55,
    timestamp: 1639648279 * 1000
  },
  {
    up: 100,
    down: 45,
    timestamp: 1639734679 * 1000
  }
];

// No funciona bien en Android
const colors1 = records.map(record => record.up >= 130 ? processColor("red") : processColor("green"));
const colors2 = records.map(record => record.down <= 60 ? processColor("red") : processColor("green"));

const values1 = records.map(record => {
  return {
    x: records.indexOf(record),
    y: record.up,
    marker: `${new Date(record.timestamp).toLocaleDateString()
      .substring(0, 5)} - ${new Date(record.timestamp).toLocaleTimeString().substring(0, 5)} | ${record.up} - ${record.down} mmHg`
  };
});

const values2 = records.map(record => {
  return {
    x: records.indexOf(record),
    y: record.down,
    marker: `${new Date(record.timestamp).toLocaleDateString()
      .substring(0, 5)} - ${new Date(record.timestamp).toLocaleTimeString().substring(0, 5)} | ${record.up} - ${record.down} mmHg`
  };
});

export const DoubleScatter = () => (
  <ScatterChart
    style={{ height: 500 }}
    xAxis={{
      valueFormatter: records.map(record => new Date(record.timestamp).toLocaleDateString()),
      position: "BOTTOM",
      drawGridLines: false
    }}
    yAxis={{
      right: {
        drawLabels: false
      }
    }}
    legend={{
      enabled: false
    }}
    chartDescription={{
      text: ""
    }}
    scaleEnabled={false}
    marker={{
      markerColor: processColor("green"),
      textColor: processColor("white"),
      enabled: true
    }}
    data={{
      dataSets: [
        {
          values: values1,
          label: "1",
          config: {
            scatterShape: "CIRCLE",
            scatterShapeSize: Platform.OS === "android" ? 25 : undefined,
            colors: colors1,
            drawValues: false,
            highlightColor: processColor("green"),
            highlightLineWidth: 2,
            drawHorizontalHighlightIndicator: false
          }
        },
        {
          values: values2,
          label: "2",
          config: {
            scatterShape: "CIRCLE",
            scatterShapeSize: Platform.OS === "android" ? 25 : undefined,
            colors: colors2,
            drawValues: false,
            highlightColor: processColor("green"),
            highlightLineWidth: 2,
            drawHorizontalHighlightIndicator: false
          }
        }
      ]
    }}
  />
);
