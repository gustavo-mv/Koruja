import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface AtividadeProps {
  nomeMateria: string;
}

const AtividadeCard: React.FC<AtividadeProps> = (props: AtividadeProps) => {
  return (
    <View className="bg-orange-600 w-40 h-52 m-1 rounded-xl">
      <View className="items-center bg-slate-600 rounded-t-xl">
        <Text className=" font-medium text-xl ">{props.nomeMateria}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AtividadeCard;
