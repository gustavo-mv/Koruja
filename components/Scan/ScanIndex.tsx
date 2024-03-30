import { View, Text, ScrollView } from "react-native";
import React from "react";
import Criar from "./Criar";
import MainScannerVector from "./../../assets/Scan.svg";
import Corrigir from "./Corrigir";
import VerGabaritos from "./VerGabaritos";

const ScanIndex = () => {
  return (
    <View className="flex items-center justify-center pt-10">
      <MainScannerVector width={500} height={350} />
      <Corrigir />
      <Criar />
      <VerGabaritos />
    </View>
  );
};
export default ScanIndex;
