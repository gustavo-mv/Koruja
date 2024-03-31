import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GabaritosCard = () => {
  return (
    <LinearGradient
      colors={["#069d09", "#069009", "#067409"]}
      className="h-36 m-3  flex flex-row rounded-xl  pl-7"
    >
      <View className="flex-1 items-start justify-center ">
        <Text className=" text-xl text-white">Gabaritos</Text>
        <Text className=" font-bold tracking-wide text-3xl text-white">
          Corrigidos:
        </Text>
      </View>
      <View className="flex-1 space-y-1 h-36  items-center justify-start rounded-xl bg-black">
        <View className="flex-row h-10 justify-center w-32">
          <Text className=" text-xs font-bold  text-gray-300 border-r-2  truncate pt-3">
            Total de Provas: 80
          </Text>
        </View>
        <View className="flex-row ">
          <Text className=" font-bold pt-2 text-green-500 text-5xl">65</Text>
          <Text className=" pt-5 text-green-500 text-lg">%</Text>
        </View>
        <View>
          <Text className="font-bold text-gray-300 text-xl">Restam 28</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default GabaritosCard;
