import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TurmaProps } from "@/models/TurmaProps";

const CardPickDisciplina: React.FC<TurmaProps & { index: number }> = ({
  nome,
}) => {
  return (
    <TouchableOpacity className=" self-center rounded-md bg-green-400 h-24 mb-5 w-11/12 items-center justify-center">
      <Text className=" text-black text-3xl w-60 text-center font-bold">
        {nome}
      </Text>
    </TouchableOpacity>
  );
};

export default CardPickDisciplina;
