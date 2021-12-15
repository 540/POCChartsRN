/*eslint-disable */
import {
  createContainer,
  Line,
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip
} from "victory-native";
import React from "react";
import { VictoryCursorContainerNativeProps } from "victory-native/src/components/victory-cursor-container";
import { VictoryVoronoiContainerNativeProps } from "victory-native/src/components/victory-voronoi-container";

const downData = [
  { x: new Date(2016, 6, 1), open: 70, low: 70, close: 80, high: 80 },
  { x: new Date(2016, 6, 2), open: 74, low: 74, close: 82, high: 82 },
  { x: new Date(2016, 6, 3), open: 80, low: 80, close: 92, high: 92 },
  { x: new Date(2016, 6, 4), open: 55, low: 55, close: 62, high: 62 },
  { x: new Date(2016, 6, 5), open: 70, low: 70, close: 80, high: 80 },
  { x: new Date(2016, 6, 6), open: 50, low: 50, close: 64, high: 64 },
  { x: new Date(2016, 6, 7), open: 80, low: 80, close: 84, high: 84 }
];

const upData = [
  {
    open: 120,
    close: 130,
    high: 130,
    low: 120,
    up: { x: new Date(2016, 6, 1), open: 120, close: 130, high: 130, low: 120 },
    down: downData[0]
  },
  {
    open: 105,
    close: 115,
    high: 115,
    low: 105,
    up: { x: new Date(2016, 6, 2), open: 105, low: 105, close: 115, high: 115 },
    down: downData[1]
  },
  {
    open: 129,
    close: 140,
    high: 140,
    low: 129,
    up: { x: new Date(2016, 6, 3), open: 129, low: 129, close: 140, high: 140 },
    down: downData[2]
  },
  {
    open: 110,
    close: 120,
    high: 120,
    low: 110,
    up: { x: new Date(2016, 6, 4), open: 110, low: 110, close: 120, high: 120 },
    down: downData[3]
  },
  {
    open: 150,
    close: 160,
    high: 160,
    low: 150,
    up: { x: new Date(2016, 6, 5), open: 150, low: 150, close: 160, high: 160 },
    down: downData[4]
  },
  {
    open: 155,
    close: 165,
    high: 165,
    low: 155,
    up: { x: new Date(2016, 6, 6), open: 155, low: 155, close: 165, high: 165 },
    down: downData[5]
  },
  {
    open: 120,
    close: 130,
    high: 130,
    low: 120,
    up: { x: new Date(2016, 6, 7), open: 120, low: 120, close: 130, high: 130 },
    down: downData[6]
  }
];

const firstRedLine = upData.map(record => {
  return {
    x: record.up.x,
    y: 160
  };
});

const secondRedLine = upData.map(record => {
  return {
    x: record.up.x,
    y: 110
  };
});

const thirdRedLine = upData.map(record => {
  return {
    x: record.up.x,
    y: 100
  };
});

const forthRedLine = upData.map(record => {
  return {
    x: record.up.x,
    y: 60
  };
});

const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");


export const MyVictoryCandle = () => (
  <VictoryChart
    domainPadding={16}
    theme={VictoryTheme.material}
    height={500}
    maxDomain={{ y: 180 }}
    minDomain={{ y: 40 }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${datum.up.x.toLocaleDateString()} \n - \n ${datum.up.open} - ${datum.up.close} mmHg \n ${datum.down.open} - ${datum.down.close} mmHg`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={4}
            dy={-7}
            style={{
              fill: "white",
              fontSize: 16
            }}
            flyoutStyle={{
              fill: ({ datum }) => (datum.up.close >= 160 || datum.up.open <= 110 || datum.down.close >= 100 || datum.down.open <= 60) ? "red" : "green",
              strokeWidth: 0
            }}
          />
        }
        voronoiBlacklist={["upCandles", "downCandles", "firstRedLine", "secondRedLine", "thirdRedLine",
          "forthRedLine"]}
        voronoiDimension="x"
        cursorDimension="x"
        cursorComponent={<Line style={{ strokeWidth: 3 }} />}
      />
    }>
    <VictoryAxis dependentAxis />
    <VictoryAxis tickFormat={tick => new Date(tick).toLocaleDateString()} fixLabelOverlap />
    <VictoryCandlestick
      name="upCandles"
      data={upData}
      candleWidth={10}
      x={data => data.up.x}
      y={data => data.up.close}
      style={{
        data: {
          fill: ({ datum }) => (datum.up.close >= 160 || datum.up.open <= 110) ? "red" : "green",
          stroke: "transparent",
          borderRadius: 10
        }
      }}
    />
    <VictoryCandlestick
      name="downCandles"
      data={downData}
      candleWidth={10}
      x="x"
      y="close"
      style={{
        data: {
          fill: ({ datum }) => (datum.close >= 100 || datum.open <= 60) ? "red" : "green",
          stroke: "transparent"
        }
      }}
    />
    <VictoryScatter
      data={upData}
      x={data => data.up.x}
      y={data => data.up.close}
      style={{
        data: {
          fill: "transparent"
        }
      }}
    />
    <VictoryLine
      name="firstRedLine"
      data={firstRedLine}
      x="x"
      y="y"
      style={{ data: { stroke: "red", strokeWidth: 2, strokeDasharray: 8 } }}
    />
    <VictoryLine
      name="secondRedLine"
      data={secondRedLine}
      x="x"
      y="y"
      style={{ data: { stroke: "red", strokeWidth: 2, strokeDasharray: 8 } }}
    />
    <VictoryLine
      name="thirdRedLine"
      data={thirdRedLine}
      x="x"
      y="y"
      style={{ data: { stroke: "red", strokeWidth: 2, strokeDasharray: 8 } }}
    />
    <VictoryLine
      name="forthRedLine"
      data={forthRedLine}
      x="x"
      y="y"
      style={{ data: { stroke: "red", strokeWidth: 2, strokeDasharray: 8 } }}
    />
  </VictoryChart>
);
