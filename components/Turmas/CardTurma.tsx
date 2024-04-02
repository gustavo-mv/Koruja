import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const CardTurma: React.FC<CardTurmaProps> = ({ nome }) => {
  return (
    <TouchableOpacity className=" bg-black h-36 w-96 mb-4 self-center rounded-2xl justify-center items-start">
      <Link
        href={{
          pathname: "/home/[idturma]",
          params: { nome: nome },
        }}
      >
        <View className=" flex-row items-center ml-5 mb-2 mt-2 space-x-3 ">
          <View className=" bg-white rounded-lg p-1">
            <Ionicons name="school-outline" size={35} color="black" />
          </View>
          <Text className=" text-gray-300">Quantidade Matérias:</Text>
          <Text className=" text-gray-300">3</Text>
        </View>
        <View className="flex-row justify-center items-start space-x-20">
          <Text className=" text-white font-bold text-xl w-60 ml-5 mb-5">
            {nome}
          </Text>
          <AntDesign name="right" size={24} color="white" />
        </View>
      </Link>
    </TouchableOpacity>
  );
};
export default CardTurma;
