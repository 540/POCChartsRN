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

const recordsHigh = [
  {
    mmHg: 110,
    timestamp: 1640762065 * 1000
  },
  {
    mmHg: 120,
    timestamp: 1640772865 * 1000
  },
  {
    mmHg: 150,
    timestamp: 1640783665 * 1000
  },
  {
    mmHg: 110,
    timestamp: 1640794465 * 1000
  },
  {
    mmHg: 120,
    timestamp: 1640805265 * 1000
  },
  {
    mmHg: 130,
    timestamp: 1640816065 * 1000
  },
  {
    mmHg: 140,
    timestamp: 1640822365 * 1000
  },
  {
    mmHg: 160,
    timestamp: 1640853025 * 1000
  },
  {
    mmHg: 110,
    timestamp: 1640863825 * 1000
  }
];

const recordsLow = [
  {
    mmHg: 55,
    timestamp: 1640762065 * 1000
  },
  {
    mmHg: 65,
    timestamp: 1640772865 * 1000
  },
  {
    mmHg: 85,
    timestamp: 1640783665 * 1000
  },
  {
    mmHg: 55,
    timestamp: 1640794465 * 1000
  },
  {
    mmHg: 65,
    timestamp: 1640805265 * 1000
  },
  {
    mmHg: 75,
    timestamp: 1640816065 * 1000
  },
  {
    mmHg: 55,
    timestamp: 1640822365 * 1000
  },
  {
    mmHg: 85,
    timestamp: 1640853025 * 1000
  },
  {
    mmHg: 55,
    timestamp: 1640863825 * 1000
  }
];
const PRESSURE_HIGH_HIGHER_LIMIT = 150;
const PRESSURE_HIGH_LOWER_LIMIT = 100;
const PRESSURE_LOW_HIGHER_LIMIT = 90;
const PRESSURE_LOW_LOWER_LIMIT = 50;

const pressureHighHigher = recordsHigh.map(record => {
  return {
    mmHg: PRESSURE_HIGH_HIGHER_LIMIT,
    timestamp: record.timestamp
  };
});

const pressureHighLower = recordsHigh.map(record => {
  return {
    mmHg: PRESSURE_HIGH_LOWER_LIMIT,
    timestamp: record.timestamp
  };
});

const pressureLowHigher = recordsHigh.map(record => {
  return {
    mmHg: PRESSURE_LOW_HIGHER_LIMIT,
    timestamp: record.timestamp
  };
});

const pressureLowLower = recordsHigh.map(record => {
  return {
    mmHg: PRESSURE_LOW_LOWER_LIMIT,
    timestamp: record.timestamp
  };
});



const VictoryCursorVoronoiContainer = createContainer<VictoryCursorContainerNativeProps,
  VictoryVoronoiContainerNativeProps>("cursor", "voronoi");

  const CustomTooltip = ({ x, y, datum, ...props}) => {
    const WIDTH =  props.theme.area.width;
    const HighValue = props.activePoints.find(point => point.childName === 'scatterHIGH')['_y'];
    const LowValue = props.activePoints.find(point => point.childName === 'scatterLOW')['_y'];
    const showAlert = 
      HighValue >= PRESSURE_HIGH_HIGHER_LIMIT || 
      HighValue <= PRESSURE_HIGH_LOWER_LIMIT ||
      LowValue <= PRESSURE_LOW_LOWER_LIMIT ||
      LowValue <= PRESSURE_LOW_LOWER_LIMIT;
    return (
    
      <G>
        <Rect
          x={x > WIDTH ? x - 110:x - 60}
          y={0}
          width={135}
          height="48"
          rx={4}
          fill={showAlert ? "#FF7373" : "#17CCBA"}
          stroke={showAlert ? "#FF7373" : "#17CCBA"}
        />
        <Rect
          x={x - 1}
          y={0}
          width={2}
          height={props.theme.area.height - 110}
          fill={showAlert ? "#FF7373" : "#17CCBA"}
          stroke={showAlert ? "#FF7373" : "#17CCBA"}
        />

        <Text
          x={x > WIDTH ? x - 100:x - 50}
          y={20}
          fill="#FFFFFF60"
          style={{fontSize:14, fontWeight:'normal', textAlign:'right'}}
        >
          {`${getTimeFromDate(datum.timestamp)}`} 
        </Text>
        <Text
          x={x > WIDTH ? x - 100:x - 50}
          y={35}
          fill="#FFFFFF60"
          style={{fontSize:14, fontWeight:'normal', textAlign:'right'}}
        >
          {`${getShortDate(datum.timestamp)}`} 
        </Text>


        <Rect
          x={x > WIDTH ? x - 50:x}
          y={6}
          width={0}
          height={35}
          fill={"#FFFFFF"}
          stroke={"#FFFFFF"}
        />


        <Text
          x={x > WIDTH ? x - 45:x + 5}
          y={20}
          fill="#FFFFFF"
          style={{fontSize:13, fontWeight:'bold', textAlign:'right'}}
        >
          {`${HighValue}`} mmHg
        </Text>
        <Text
          x={x > WIDTH ? x - 45:x + 5}
          y={36}
          fill="#FFFFFF"
          style={{fontSize:13, fontWeight:'bold', textAlign:'right'}}
        >
          {`${LowValue}`} mmHg
        </Text>
      </G>
    )
  };

export const BloodPressure = () => (
  <VictoryChart
    domainPadding={20}
    padding={{
      top:60,
      left: 30,
      right: 10,
      bottom: 40
    }}
    theme={VictoryTheme.material}
    height={280}
    maxDomain={{
      y: 170
    }}
    minDomain={{
      y: 40
    }}
    scale={{ y: "linear", x: "time" }}
    containerComponent={
      <VictoryCursorVoronoiContainer
        labels={({ datum }) => `${new Date(datum.timestamp).toLocaleDateString()} | ${datum.mmHg} mmHg`}
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
          fill: "#7592AA", 
          fontSize: 10, 
          padding: 5
        },
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: { stroke: "#D1DBE3" , strokeDasharray: "0" , strokeWidth: 1 }
      }} 
      dependentAxis 
      tickValues={[40,105,170]}
      tickFormat={tick => tick} />
    <VictoryAxis  
      style={{    
        ticks: {size: 0},
        tickLabels: { 
          fill: "#7592AA", 
          fontSize: 10, 
          padding: 15
        },  
        axis: {stroke: "#D1DBE3", strokeWidth:1},
        grid: { stroke: "#D1DBE3" ,strokeWidth: 1, strokeDasharray: "2" }
      }}
      tickFormat={tick => getShortDate(tick)} 
    />
    <VictoryScatter
      name="scatterHIGH"
      data={recordsHigh}
      x="timestamp"
      y="mmHg"
      size={4}
      style={{
        data: {
          fill: ({ datum }) => datum.mmHg >= PRESSURE_HIGH_HIGHER_LIMIT || datum.mmHg <= PRESSURE_HIGH_LOWER_LIMIT ? "#FF7373" : "#17CCBA"
        }
      }}
    />
    <VictoryScatter
      name="scatterLOW"
      data={recordsLow}
      x="timestamp"
      y="mmHg"
      size={4}
      style={{
        data: {
          fill: ({ datum }) => datum.mmHg >= PRESSURE_LOW_HIGHER_LIMIT || datum.mmHg <= PRESSURE_LOW_LOWER_LIMIT ? "#FF7373" : "#17CCBA"
        }
      }}
    />
    <VictoryLine
      name="redLineHighHigher"
      data={pressureHighHigher}
      x="timestamp"
      y="mmHg"
      style={{
        data: {
          stroke: "#FF7373",
          strokeWidth: 1,
          strokeDasharray: 4
        }
      }}
    />
    <VictoryLine
      name="redLineHighLower"
      data={pressureHighLower}
      x="timestamp"
      y="mmHg"
      style={{
        data: {
          stroke: "#FF7373",
          strokeWidth: 1,
          strokeDasharray: 4
        }
      }}
    />
    <VictoryLine
      name="redLineLowHigher"
      data={pressureLowHigher}
      x="timestamp"
      y="mmHg"
      style={{
        data: {
          stroke: "#FF7373",
          strokeWidth: 1,
          strokeDasharray: 4
        }
      }}
    />
    <VictoryLine
      name="redLineLowLower"
      data={pressureLowLower}
      x="timestamp"
      y="mmHg"
      style={{
        data: {
          stroke: "#FF7373",
          strokeWidth: 1,
          strokeDasharray: 4
        }
      }}
    />
  </VictoryChart>
);
