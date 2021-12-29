/*eslint-disable */
import {
  createContainer,
  Line,
  LineSegment,
  Rect,
  Text,
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
import { G } from "react-native-svg";
import { getShortDate, getTimeFromDate } from "../utils";

const records = [
  {
    bpm: 39,
    timestamp: 1640762065 * 1000
  },
  {
    bpm: 42,
    timestamp: 1640772865 * 1000
  },
  {
    bpm: 43,
    timestamp: 1640783665 * 1000
  },
  {
    bpm: 41,
    timestamp: 1640794465 * 1000
  },
  {
    bpm: 60,
    timestamp: 1640805265 * 1000
  },
  {
    bpm: 65,
    timestamp: 1640816065 * 1000
  },
  {
    bpm: 38,
    timestamp: 1640822365 * 1000
  },
  {
    bpm: 41,
    timestamp: 1640853025 * 1000
  },
  {
    bpm: 42,
    timestamp: 1640863825 * 1000
  },
  {
    bpm: 42,
    timestamp: 1640874625 * 1000
  },
  {
    bpm: 40,
    timestamp: 1640885425 * 1000
  },
  {
    bpm: 43,
    timestamp: 1640896225 * 1000
  },
  {
    bpm: 120,
    timestamp: 1640903425 * 1000
  },
  {
    bpm: 111,
    timestamp: 1640908225 * 1000
  },
  {
    bpm: 121,
    timestamp: 1640933425 * 1000
  },
  {
    bpm: 43,
    timestamp: 1640944225 * 1000
  },
  {
    bpm: 40,
    timestamp: 1640951425 * 1000
  },
  {
    bpm: 43,
    timestamp: 1640962225 * 1000
  },
  {
    bpm: 79,
    timestamp: 1640973025 * 1000
  },
  {
    bpm: 68,
    timestamp: 1640983825 * 1000
  }
];

const redLineData = records.map(record => {
  return {
    bpm: 105,
    timestamp: record.timestamp
  };
});

const HIGHER_LIMIT = 105;

const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");

  const CustomTooltip = ({ x, y, datum, ...props}) => {

    return (
    
      <G>
        <Rect
          x={x - 60}
          y={0}
          width={120}
          height="46"
          rx={4}
          fill={datum.bpm >= HIGHER_LIMIT ? "#FF7373" : "#17CCBA"}
          stroke={datum.bpm >= HIGHER_LIMIT ? "#FF7373" : "#17CCBA"}
        />
        <Rect
          x={x - 1}
          y={0}
          width={2}
          height={props.theme.area.height - 110}
          fill={datum.bpm >= HIGHER_LIMIT ? "#FF7373" : "#17CCBA"}
          stroke={datum.bpm >= HIGHER_LIMIT ? "#FF7373" : "#17CCBA"}
        />

        <Text
          x={x - 50}
          y={20}
          fill="#FFFFFF60"
          style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}
        >
          {`${getTimeFromDate(datum.timestamp)}`} 
        </Text>
        <Text
          x={x - 50}
          y={35}
          fill="#FFFFFF60"
          style={{fontSize:14, fontWeight:'bold', textAlign:'right'}}
        >
          {`${getShortDate(datum.timestamp)}`} 
        </Text>


        <Rect
          x={x - 1}
          y={6}
          width={0}
          height={35}
          fill={"#FFFFFF"}
          stroke={"#FFFFFF"}
        />


        <Text
          x={x + 5 }
          y={28}
          fill="#FFFFFF"
          style={{fontSize:13, fontWeight:'bold', textAlign:'right'}}
        >
          {`${datum.bpm}`} bpm
         
          
        </Text>
      </G>
    )
  };

export const MyVictoryScatter = () => (
  <VictoryChart
    domainPadding={20}
    padding={{
      top:50,
      left: 30,
      right: 10,
      bottom: 40
    }}
    theme={VictoryTheme.material}
    height={280}
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
        labelComponent={<CustomTooltip/>}
        voronoiDimension="x"
        cursorDimension="x"
        voronoiBlacklist={["redLine"]}
        cursorComponent={ <LineSegment style={{ strokeWidth: 0, stroke :'#17CCBA' }} />}
      />
    }>
    <VictoryAxis       
      style={{
        ticks: {size: 0},
        tickLabels: { 
          fill: ({ tick }) => tick !== HIGHER_LIMIT ? "#7592AA" : "#FF7373", 
          fontSize: 10, 
          padding: 5
        },
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: { stroke: "#D1DBE3" , strokeDasharray: "0" , strokeWidth: 1 }
      }} 
      dependentAxis 
      tickValues={[0,40,80,105,120,160]}
      tickFormat={tick => tick} />
    <VictoryAxis  
      style={{    
        ticks: {size: 0},
        tickLabels: { 
          fill: ({ tick }) => tick !== HIGHER_LIMIT ? "#7592AA" : "#FF7373", 
          fontSize: 10, 
          padding: 5
        },  
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: { stroke: "#D1DBE3" ,strokeWidth: 1, strokeDasharray: "2" }
      }}
      tickFormat={tick => getShortDate(tick)} 
    />
    <VictoryScatter
      name="scatter"
      data={records}
      x="timestamp"
      y="bpm"
      size={4}
      style={{
        data: {
          fill: ({ datum }) => datum.bpm >= HIGHER_LIMIT ? "#FF7373" : "#17CCBA"
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
          stroke: "#FF7373",
          strokeWidth: 2,
          strokeDasharray: 4
        }
      }}
    />
  </VictoryChart>
);
