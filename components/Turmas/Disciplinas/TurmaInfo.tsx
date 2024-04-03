import { View, Text } from "react-native";
import React from "react";
import SemDisciplina from "./SemDisciplina";
import { TurmaProps } from "@/models/TurmaProps";

const TurmaInfo: React.FC<TurmaProps> = (turma) => {
  return (
    <View>
      <View className=" bg-black rounded-b-3xl z-50">
        <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
          {turma.nome}
        </Text>
      </View>
      <SemDisciplina {...turma} />
    </View>
  );
};

export default TurmaInfo;
