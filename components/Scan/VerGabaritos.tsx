import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";

const VerGabaritos = () => {
  return (
    <TouchableOpacity className="flex-row items-center justify-center rounded-lg h-20 w-80  bg-green-950 border-2 border-slate-300">
      <Icon name="layer-group" color="white" size={32} />
      <Text className=" font-semibold text-lg ml-6 mr-6 text-white">
        Ver Lista de Gabaritos
      </Text>
      <Icon name="circle-chevron-right" size={32} color="white" />
    </TouchableOpacity>
  );
};
export default VerGabaritos;
