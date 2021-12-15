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
    temperature: 36,
    timestamp: 1639043479 * 1000
  },
  {
    temperature: 36.4,
    timestamp: 1639129879 * 1000
  },
  {
    temperature: 37,
    timestamp: 1639216279 * 1000
  },
  {
    temperature: 38,
    timestamp: 1639302679 * 1000
  },
  {
    temperature: 37,
    timestamp: 1639389079 * 1000
  },
  {
    temperature: 38,
    timestamp: 1639475479 * 1000
  },
  {
    temperature: 36.8,
    timestamp: 1639561879 * 1000
  },
  {
    temperature: 36.5,
    timestamp: 1639648279 * 1000
  },
  {
    temperature: 36,
    timestamp: 1639734679 * 1000
  }
];

const redRecords = records.filter(record => record.temperature >= 37);

const redLineData = records.map(record => {
  return {
    temperature: 37,
    timestamp: record.timestamp
  };
});

const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");


export const MyVictoryLine = () => (
  <VictoryChart
    domainPadding={16}
    theme={VictoryTheme.material}
    height={500}
    maxDomain={{
      y: 40
    }}
    minDomain={{
      y: 33.5
    }}
    scale={{ y: "linear", x: "time" }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${new Date(datum.timestamp).toLocaleDateString()} | ${datum.temperature}ºC`}
        labelComponent={
          <VictoryTooltip
            cornerRadius={4}
            dy={-7}
            style={{
              fill: "white",
              fontSize: 16
            }}
            flyoutStyle={{
              fill: ({ datum }) => (datum.temperature >= 37 ? "red" : "green"),
              strokeWidth: 0
            }}
          />
        }
        voronoiBlacklist={["redLine", "scatter", "redRecords"]}
        voronoiDimension="x"
        cursorDimension="x"
        cursorComponent={<Line style={{ strokeWidth: 3 }} />}
      />
    }>
    <VictoryAxis dependentAxis />
    <VictoryAxis tickFormat={tick => new Date(tick).toLocaleDateString()} />
    <VictoryLine
      data={records}
      x="timestamp"
      y="temperature"
      style={{
        data: {
          stroke: ({ data }) => data.temperature >= 37 ? "red" : "green"
        }
      }}
    />
    <VictoryScatter
      name="scatter"
      data={records}
      x="timestamp"
      y="temperature"
      size={7}
      style={{
        data: {
          fill: ({ datum }) => datum.temperature >= 37 ? "red" : "green"
        }
      }}
    />
    <VictoryLine
      name="redRecords"
      data={redRecords}
      x="timestamp"
      y="temperature"
      style={{
        data: {
          stroke: "red"
        }
      }}
    />
    <VictoryLine
      name="redLine"
      data={redLineData}
      x="timestamp"
      y="temperature"
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
