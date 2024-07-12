import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";

const Criar = () => {
  return (
    <Link push href={{ pathname: "/home/(scan)/criarProva" }} asChild>
      <TouchableOpacity className=" mb-3 flex-row items-center justify-center rounded-lg h-20 w-80 bg-orange-600 border-2 ">
        <Icon name="file-circle-plus" color="white" size={32} />
        <Text className=" font-semibold text-lg ml-14 mr-14 text-slate-50">
          Criar Gabarito
        </Text>
        <Icon name="circle-chevron-right" size={32} color="white" />
      </TouchableOpacity>
    </Link>
  );
};
export default Criar;
