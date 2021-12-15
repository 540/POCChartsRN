/*eslint-disable */
import { LineChart } from "react-native-charts-wrapper";
import React from "react";
import { processColor, StyleSheet } from "react-native";

const records = [
  {
    temp: 36,
    timestamp: 1639030797 * 1000
  },
  {
    temp: 36.4,
    timestamp: 1639034397 * 1000
  },
  {
    temp: 37.2,
    timestamp: 1639037997 * 1000
  },
  {
    temp: 37.1,
    timestamp: 1639041597 * 1000
  },
  {
    temp: 38.8,
    timestamp: 1639045197 * 1000
  },
  {
    temp: 37,
    timestamp: 1639048797 * 1000
  },
  {
    temp: 36.5,
    timestamp: 1639052397 * 1000
  },
  {
    temp: 36,
    timestamp: 1639055997 * 1000
  },
  {
    temp: 36.2,
    timestamp: 1639059597 * 1000
  }
];

const circleColors = records.map(record =>
  record.temp! >= 37 ? processColor("red") : processColor("green")
);
const values = records.map(record => {
  return {
    x: record.timestamp,
    y: record.temp,
    marker: `${new Date(record.timestamp * 1000)
      .toLocaleTimeString()
      .substring(0, 5)} | ${record.temp}ºC`
  };
});

export const Line = () => {
  return (
    <LineChart
      style={styles.chart}
      scaleEnabled={false}
      touchEnabled
      marker={{
        enabled: true,
        textSize: 20,
        digits: 1,
        markerColor: processColor("green"),
        textColor: processColor('white')
      }}
      xAxis={{
        gridLineWidth: 0.5,
        gridColor: processColor("#D1DBE3"),
        position: "BOTTOM",
        valueFormatter: "date",
        valueFormatterPattern: "HH",
        gridDashedLine: {
          spaceLength: 6,
          lineLength: 8
        }
      }}
      yAxis={{
        left: {
          gridLineWidth: 1,
          gridColor: processColor("#D1DBE3")
        },
        right: {
          drawLabels: false
        }
      }}
      chartDescription={{
        text: ""
      }}
      gridBackgroundColor={processColor("grey")}
      legend={{
        enabled: false
      }}
      data={{
        dataSets: [
          {
            label: "label",
            values: values,
            config: {
              circleRadius: 6,
              circleColors: circleColors,
              drawCircleHole: false,
              highlightColor: processColor("green"),
              drawHorizontalHighlightIndicator: false,
              drawValues: false,
              lineWidth: 2,
              colors: circleColors
            }
          }
        ]
      }}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    height: 500
  }
});
