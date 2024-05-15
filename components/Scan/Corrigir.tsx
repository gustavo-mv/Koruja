import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const Corrigir = () => {
  return (
    <Link push href={{ pathname: "/home/(scan)/corrigir" }} asChild>
      <TouchableOpacity className="flex-row items-center justify-center rounded-lg h-20 w-80 mt-3 mb-3 bg-emerald-600 border-2 border-slate-300">
        <Icon name="camera" color="white" size={32} />
        <Text className=" font-semibold text-lg ml-11 mr-11 text-gray-200">
          Corrigir Gabaritos
        </Text>
        <Icon name="circle-chevron-right" size={32} color="white" />
      </TouchableOpacity>
    </Link>
  );
};
export default Corrigir;
