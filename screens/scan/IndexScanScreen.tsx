import { View } from "react-native";
import React from "react";
import Criar from "@/components/Scan/Criar";
import MainScannerVector from "@/assets/Scan.svg";
import Corrigir from "@/components/Scan/Corrigir";
import VerGabaritos from "@/components/Scan/VerGabaritos";
import { Link } from "expo-router";

const IndexScanScreen = () => {
  return (
    <View className="flex items-center justify-center pt-12 bg-ciano h-full pb-5">
      <MainScannerVector width={500} height={350} />
      <Corrigir />

      <Criar />

      <VerGabaritos />
    </View>
  );
};
export default IndexScanScreen;
