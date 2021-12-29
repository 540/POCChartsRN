/*eslint-disable */
import {
  createContainer,
  Line,
  LineSegment,
  Rect,
  Text,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip
} from "victory-native";
import React from "react";
import { VictoryCursorContainerNativeProps } from "victory-native/src/components/victory-cursor-container";
import { VictoryVoronoiContainerNativeProps } from "victory-native/src/components/victory-voronoi-container";
import { G } from "react-native-svg";
import { fillWithZeros } from "../utils";

const records = [
  {
    temperature: 36,
    timestamp: 1640302588000
  },
  {
    temperature: 36.2,
    timestamp: 1640311348000
  },
  {
    temperature: 38,
    timestamp: 1640317528000
  },
  {
    temperature: 36.5,
    timestamp: 1640322088000
  },
  {
    temperature: 36.7,
    timestamp: 1640329468000
  },
  {
    temperature: 36.4,
    timestamp: 1640336548000
  },
  {
    temperature: 37.8,
    timestamp: 1640343628000
  },
  {
    temperature: 36.2,
    timestamp: 1640351248000
  },
  {
    temperature: 36.9,
    timestamp: 1640360008000
  },
  {
    temperature: 37.6,
    timestamp: 1640368948000
  },
  {
    temperature: 36.7,
    timestamp: 1640376088000
  },
  {
    temperature: 36.9,
    timestamp: 1640380228000
  }
];

const redLineData = records.map(record => {
  return {
    temperature: 37,
    timestamp: record.timestamp
  };
});



const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");

  const CustomTooltip = ({ x, y, datum, theme}) => {
    const WIDTH =  theme.area.width;
    return (
    
      <G>
        <Rect
          x={x > WIDTH ? x - 110:x - 60}
          y={10}
          width="120"
          height="30"
          rx={4}
          fill={datum.temperature >= 37 ? "#FF7373" : "#17CCBA"}
          stroke={datum.temperature >= 37 ? "#FF7373" : "#17CCBA"}
        />
        <Rect
          x={x - 1}
          y={40}
          width="2"
          height={y - 40}
          fill={datum.temperature >= 37 ? "#FF7373" : "#17CCBA"}
          stroke={datum.temperature >= 37 ? "#FF7373" : "#17CCBA"}
        />
        <Rect
          x={x > WIDTH ? x - 50:x - 1}
          y={13}
          width={0}
          height={23}
          fill={"#FFFFFF"}
          stroke={"#FFFFFF"}
        />
        <Text
          x={x > WIDTH ? x - 100:x - 45}
          y={30 }
          fill="#FFFFFF80"
          style={{fontSize:14, backgroundColor:'red'}}
        >
          {`${fillWithZeros(new Date(datum.timestamp).getHours())}:${fillWithZeros(new Date(datum.timestamp).getMinutes())}`} 
          <Text  
          x={x > WIDTH ? x - 40:x + 10}
          y={30 }
            fill="white"
            style={{fontSize:14, fontWeight:'bold'}}>
              {datum.temperature}ºC
          </Text>
        </Text>
      </G>
    )
  };
  
export const MyVictoryLine = () => (
  <VictoryChart
    domainPadding={20}
    padding={{
      top:50,
      left: 30,
      right: 10,
      bottom: 40
    }}
    theme={VictoryTheme.material}
    height={300}
    maxDomain={{
      y: 40
    }}
    minDomain={{
      y: 34.5
    }}
    scale={{ y: "linear", x: "time" }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${new Date(datum.timestamp).toLocaleDateString()} | ${datum.temperature}ºC`}
        labelComponent={<CustomTooltip/>}
        voronoiDimension="x"
        cursorDimension="x"
        voronoiBlacklist={["redLine", "scatter", "redRecords"]}
        cursorComponent={ <LineSegment style={{ strokeWidth: 0, stroke :'#17CCBA' }} />}
      
      />
    }>
    <VictoryAxis  
      style={{
        ticks: {size: 0},
        tickLabels: { 
          fill: ({ tick }) => tick !== 37 ? "#7592AA" : "#FF7373", 
          fontSize: 10, 
          padding: 5
        },
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: { stroke: "#D1DBE3" , strokeDasharray: "0" , strokeWidth: 1 }
      }} 
      dependentAxis 
      tickFormat={tick => tick}
      tickValues={[0,34,36,37,38,40]}

      />
    <VictoryAxis  
      style={{
        ticks: {size: 0},
        tickLabels: { fill: "#D1DBE3",fontSize: 12, padding: 9},
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: {stroke: "#D1DBE3", strokeDasharray: "2", strokeWidth: 1},
      }}  
      tickFormat={tick => new Date(tick).getHours()}

      tickValues={records.map(record => record.timestamp)}
      minDomain={{x:0}}
      maxDomain={{x:24}}
    />
    <VictoryLine
      data={records}
      x="timestamp"
      y="temperature"
      style={{
        data: {
          stroke: ({ data }) => data.temperature >= 37 ? "#FF7373" : "#17CCBA",
          strokeWidth:1,
        }
      }}
    />
    <VictoryScatter
      name="scatter"
      data={records}
      x="timestamp"
      y="temperature"
      size={3}
      style={{
        data: {
          fill: ({ datum }) => datum.temperature >= 37 ? "#FF7373" : "#17CCBA"
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
          stroke: "#FF7373",
          strokeWidth: 1,
          strokeDasharray: 5
        }
      }}
    />
  </VictoryChart>
);
