import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Svg from "@/assets/notFound.svg";

const SemTurmas = () => {
  return (
    <View className=" items-center pt-16 bg-red-100 h-96">
      <Svg height={150} width={300} />
      <Text className=" text-center text-lg font-semibold mt-3 p-1">
        Você não possui turmas adicionadas ainda.
      </Text>
    </View>
  );
};

export default SemTurmas;
