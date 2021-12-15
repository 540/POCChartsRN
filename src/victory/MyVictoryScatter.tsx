/*eslint-disable */
import {
  createContainer,
  Line,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip
} from "victory-native";
import React from "react";
import { VictoryCursorContainerNativeProps } from "victory-native/src/components/victory-cursor-container";
import { VictoryVoronoiContainerNativeProps } from "victory-native/src/components/victory-voronoi-container";

const records = [
  {
    bpm: 60,
    timestamp: 1639043479 * 1000
  },
  {
    bpm: 74,
    timestamp: 1639129879 * 1000
  },
  {
    bpm: 100,
    timestamp: 1639216279 * 1000
  },
  {
    bpm: 80,
    timestamp: 1639302679 * 1000
  },
  {
    bpm: 120,
    timestamp: 1639389079 * 1000
  },
  {
    bpm: 110,
    timestamp: 1639475479 * 1000
  },
  {
    bpm: 120,
    timestamp: 1639561879 * 1000
  },
  {
    bpm: 100,
    timestamp: 1639648279 * 1000
  },
  {
    bpm: 90,
    timestamp: 1639734679 * 1000
  }
];

const redLineData = records.map(record => {
  return {
    bpm: 105,
    timestamp: record.timestamp
  };
});

const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");


export const MyVictoryScatter = () => (
  <VictoryChart
    domainPadding={16}
    theme={VictoryTheme.material}
    height={500}
    maxDomain={{
      y: 160
    }}
    minDomain={{
      y: 0
    }}
    scale={{ y: "linear", x: "time" }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${new Date(datum.timestamp).toLocaleDateString()} | ${datum.bpm} bpm`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={4}
            dy={-7}
            style={{
              fill: "white",
              fontSize: 16
            }}
            flyoutStyle={{
              fill: ({ datum }) => (datum.bpm >= 105 ? "red" : "green"),
              strokeWidth: 0
            }}
          />
        }
        voronoiBlacklist={["redLine"]}
        voronoiDimension="x"
        cursorDimension="x"
        cursorComponent={<Line style={{ strokeWidth: 3 }} />}
      />
    }>
    <VictoryAxis dependentAxis />
    <VictoryAxis tickFormat={tick => new Date(tick).toLocaleDateString()} />
    <VictoryScatter
      name="scatter"
      data={records}
      x="timestamp"
      y="bpm"
      size={7}
      style={{
        data: {
          fill: ({ datum }) => datum.bpm >= 105 ? "red" : "green"
        }
      }}
    />
    <VictoryLine
      name="redLine"
      data={redLineData}
      x="timestamp"
      y="bpm"
      style={{
        data: {
          stroke: "red",
          strokeWidth: 2,
          strokeDasharray: 8
        }
      }}
    />
  </VictoryChart>
);
