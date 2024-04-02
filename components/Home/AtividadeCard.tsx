import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface AtividadeProps {
  nomeMateria: string;
  cor: string;
  dia: string;
  ext: string;
  completa: string;
  descricao: string;
}

const AtividadeCard: React.FC<AtividadeProps> = (props: AtividadeProps) => {
  return (
    <View className="bg-gray-300 border-green-300/40 border-2 w-40 h-52 m-1 rounded-lg">
      <View className="items-center rounded-t-lg bg-black">
        <Text className=" font-medium text-xl text-yellow-500 pb-1 pt-1 ">
          {props.nomeMateria}
        </Text>
      </View>
      <Text className=" font-extrabold text-3xl mt-5 p-2 text-center border-b-2 border-black/40">
        {props.dia}
      </Text>
      <View className="flex-row">
        <Text className=" text-xs w-16 text-center border-r-2 border-black/40 font-bold">
          {props.ext}
        </Text>
        <Text className=" text-xs w-20 text-center pl-2 font-medium">
          {props.completa}
        </Text>
      </View>
      <View className=" mt-5 h-16 rounded-b-xl bg-black ">
        <Text className=" text-gray-200 text-xs text-center p-2">
          {props.descricao}
        </Text>
      </View>
    </View>
  );
};
//         style={{ backgroundColor: `rgba(${corEscurecida},0.5)` }}
const styles = StyleSheet.create({
  container: {},
});

export default AtividadeCard;
