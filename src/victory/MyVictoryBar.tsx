/*eslint-disable */
import {
  createContainer,
  Line,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip
} from "victory-native";
import React from "react";
import { VictoryCursorContainerNativeProps } from "victory-native/src/components/victory-cursor-container";
import { VictoryVoronoiContainerNativeProps } from "victory-native/src/components/victory-voronoi-container";

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
    steps: 2050,
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

const redLineData = records.map(record => {
  return {
    steps: 200,
    timestamp: record.timestamp
  };
});

const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");

export const MyVictoryBar = () => (
  <VictoryChart
    domainPadding={16}
    theme={VictoryTheme.material}
    height={500}
    scale={{ y: "linear", x: "time" }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${new Date(datum.timestamp).toLocaleDateString()} | ${datum.steps} pasos`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={4}
            dy={-7}
            style={{
              fill: "white",
              fontSize: 16
            }}
            flyoutStyle={{
              fill: ({ datum }) => (datum.steps < 200 ? "red" : "green"),
              strokeWidth: 0
            }}
          />
        }
        voronoiBlacklist={["redLine"]}
        voronoiDimension="x"
        cursorDimension="x"
        cursorComponent={<Line data={records} style={{ strokeWidth: 3 }} />}
      />
    }>
    <VictoryAxis dependentAxis />
    <VictoryAxis tickFormat={tick => new Date(tick).toLocaleDateString()} />
    <VictoryBar
      data={records}
      x="timestamp"
      y="steps"
      cornerRadius={4}
      barWidth={20}
      style={{
        data: {
          fill: ({ datum }) => (datum.steps < 200 ? "red" : "green")
        }
      }}
    />
    <VictoryLine
      name="redLine"
      data={redLineData}
      x="timestamp"
      y="steps"
      style={{
        data: {
          stroke: "red",
          strokeWidth: 4,
          strokeDasharray: 15
        }
      }}
    />
  </VictoryChart>
);
