/*eslint-disable */
import React from "react";
import { StyleSheet, View } from "react-native";
import { MyVictoryBar } from "./src/victory/MyVictoryBar";

export const App = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#F5FCFF"
    }}>
      <View style={styles.container}>
        <MyVictoryBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500
  }
});
