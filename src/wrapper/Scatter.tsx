/*eslint-disable */
import { ScatterChart } from "react-native-charts-wrapper";
import React from "react";
import { Platform, processColor } from "react-native";

const records = [
  {
    bpm: 40,
    timestamp: 1639043479 * 1000
  },
  {
    bpm: 50,
    timestamp: 1639129879 * 1000
  },
  {
    bpm: 65,
    timestamp: 1639216279 * 1000
  },
  {
    bpm: 100,
    timestamp: 1639302679 * 1000
  },
  {
    bpm: 80,
    timestamp: 1639389079 * 1000
  },
  {
    bpm: 120,
    timestamp: 1639475479 * 1000
  },
  {
    bpm: 90,
    timestamp: 1639561879 * 1000
  },
  {
    bpm: 85,
    timestamp: 1639648279 * 1000
  },
  {
    bpm: 95,
    timestamp: 1639734679 * 1000
  }
];

// No funciona bien en Android
const colors = records.map(record => record.bpm >= 100 ? processColor("red") : processColor("green"));
const values = records.map(record => {
  return {
    x: records.indexOf(record),
    y: record.bpm,
    marker: `${new Date(record.timestamp).toLocaleDateString()
      .substring(0, 5)} - ${new Date(record.timestamp).toLocaleTimeString().substring(0, 5)} | ${record.bpm} bpm`
  };
});

export const Scatter = () => (
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
      textColor: processColor('white'),
      enabled: true
    }}
    data={{
      dataSets: [
        {
          values: values,
          label: "Label",
          config: {
            scatterShape: "CIRCLE",
            scatterShapeSize: Platform.OS === 'android' ? 25 : undefined,
            colors: colors,
            drawValues: false,
            highlightColor: processColor("green"),
            highlightLineWidth: 2,
            drawHorizontalHighlightIndicator: false
          }
        }
      ],
    }}
  />
);
