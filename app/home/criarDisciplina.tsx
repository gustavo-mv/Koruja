import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

const criarDisciplina = () => {
  const { idTurma } = useGlobalSearchParams();
  return (
    <View className=" bg-black">
      <Text className=" text-white">{idTurma}</Text>
    </View>
  );
};

export default criarDisciplina;
