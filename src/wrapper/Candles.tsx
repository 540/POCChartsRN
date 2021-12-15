/*eslint-disable */
import { Platform, processColor } from "react-native";
import { CandleStickChart, CandleStickValue } from "react-native-charts-wrapper";
import React from "react";

const records = [
  {
    up: {
      max: 120,
      min: 110
    },
    down: {
      max: 80,
      min: 60
    },
    timestamp: 1639030797 * 1000
  },
  {
    up: {
      max: 130,
      min: 114
    },
    down: {
      max: 70,
      min: 50
    },
    timestamp: 1639034397 * 1000
  },
  {
    up: {
      max: 100,
      min: 98
    },
    down: {
      max: 80,
      min: 60
    },
    timestamp: 1639037997 * 1000
  },
  {
    up: {
      max: 140,
      min: 120
    },
    down: {
      max: 100,
      min: 80
    },
    timestamp: 1639041597 * 1000
  },
  {
    up: {
      max: 114,
      min: 110
    },
    down: {
      max: 76,
      min: 67
    },
    timestamp: 1639045197 * 1000
  },
  {
    up: {
      max: 118,
      min: 100
    },
    down: {
      max: 96,
      min: 81
    },
    timestamp: 1639048797 * 1000
  },
  {
    up: {
      max: 160,
      min: 130
    },
    down: {
      max: 110,
      min: 90
    },
    timestamp: 1639052397 * 1000
  },
  {
    up: {
      max: 110,
      min: 90
    },
    down: {
      max: 67,
      min: 55
    },
    timestamp: 1639055997 * 1000
  },
  {
    up: {
      max: 100,
      min: 90
    },
    down: {
      max: 60,
      min: 45
    },
    timestamp: 1639059597 * 1000
  }
];

const values1: CandleStickValue[] = records.map(record => {
  return {
    open: record.up.min,
    shadowL: record.up.min,
    close: record.up.max,
    shadowH: record.up.max,
    marker: `${new Date(record.timestamp).toLocaleDateString()} | ${record.up.min} - ${record.up.max} mmHg
${new Date(record.timestamp).toLocaleDateString()} | ${record.down.min} - ${record.down.max} mmHg`
  };
});

const values2: CandleStickValue[] = records.map(record => {
  return {
    open: record.down.min,
    shadowL: record.down.min,
    close: record.down.max,
    shadowH: record.down.max,
    marker: `${new Date(record.timestamp).toLocaleDateString()} | ${record.up.min} - ${record.up.max} mmHg
${new Date(record.timestamp).toLocaleDateString()} | ${record.down.min} - ${record.down.max} mmHg`
  };
});

export const Candles = () => (
  <CandleStickChart
    style={{ height: 500 }}
    scaleEnabled={false}
    xAxis={{
      valueFormatter: records.map(record => new Date(record.timestamp).toLocaleDateString()),
      position: "BOTTOM",
      gridDashedLine: {
        spaceLength: 5,
        lineLength: 5
      }
    }}
    yAxis={{
      right: {
        enabled: false
      }
    }}
    legend={{
      enabled: false
    }}
    chartDescription={{
      text: ""
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
          values: values1,
          config: {
            highlightLineWidth: 2,
            highlightColor: processColor("green"),
            drawHorizontalHighlightIndicator: false,
            drawValues: false,
            neutralColor: processColor("green"),
            barSpace: Platform.OS === "ios" ? undefined : 0.4,
            visible: true,
            increasingPaintStyle: "FILL",
            decreasingPaintStyle: "FILL",
            increasingColor: processColor("green"),
            colors: records.map(record => record.up.max > 100 ? processColor("red") : processColor("green"))
          }
        },
        {
          label: "2",
          values: values2,
          config: {
            highlightLineWidth: 2,
            highlightColor: processColor("green"),
            drawHorizontalHighlightIndicator: false,
            drawValues: false,
            barSpace: Platform.OS === "ios" ? undefined : 0.4,
            increasingPaintStyle: "FILL",
            decreasingPaintStyle: "STROKE",
            increasingColor: processColor("red")
          }
        }
      ]
    }}
  />
);
