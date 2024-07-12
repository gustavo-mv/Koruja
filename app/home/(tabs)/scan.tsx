import React from "react";
import { View } from "react-native";

import IndexScanScreen from "@/screens/scan/IndexScanScreen";
import { StatusBar } from "expo-status-bar";

const scan = () => {
  return (
    <View>
      <StatusBar style="light" />

      <IndexScanScreen />
    </View>
  );
};

export default scan;
