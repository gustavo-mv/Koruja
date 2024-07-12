import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg from "@/assets/notFound.svg";

const SemTurmas = () => {
  return (
    <View className=" h-full w-full items-center pt-16 pb-24 bg-chumbo">
      <Svg height={150} width={300} />
      <Text className=" text-center text-lg font-semibold mt-3 p-1 text-white">
        Você não possui turmas adicionadas ainda.
      </Text>
    </View>
  );
};

export default SemTurmas;
