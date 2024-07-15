import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { TurmaProps } from "@/models/TurmaProps";

const CardTurma: React.FC<TurmaProps> = ({
  id,
  nome,
  professorId,
  disciplinas,
}) => {
  return (
    <Link
      push
      href={{
        pathname: "/home/(turmas)/[turmaId]",
        params: {
          nome: nome,
          turmaId: id,
          professorId: professorId,
          disciplinas: JSON.stringify(disciplinas),
        },
      }}
      asChild
    >
      <TouchableOpacity className=" bg-chumbo h-36 w-96 mb-4 self-center rounded-2xl justify-center items-start ">
        <View className="flex-col">
          <View className=" flex-row items-center ml-4 mb-2 mt-2 space-x-3 ">
            <View className=" bg-white rounded-lg p-1">
              <Ionicons name="school-outline" size={35} color="black" />
            </View>
            <Text className=" text-gray-300">Quantidade Disciplinas:</Text>
            <Text className=" text-gray-300">{disciplinas.length}</Text>
          </View>
          <View className="flex-row justify-center items-start space-x-20">
            <Text className=" text-white font-bold text-xl w-60 ml-5 mb-5">
              {nome}
            </Text>
            <AntDesign name="right" size={24} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default CardTurma;
