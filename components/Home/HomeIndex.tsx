import { View, Text, ScrollView } from "react-native";
import React from "react";
import IndexCard from "./IndexCard";
import GabaritosCard from "./GabaritosCard";
import AtividadeCard from "./AtividadeCard";

const HomeIndex = () => {
  return (
    <View>
      <GabaritosCard />
      <View className=" mt-3">
        <Text className=" text-3xl font-extrabold pl-2">Atividades:</Text>
        <ScrollView horizontal={true} className=" ml-2">
          <AtividadeCard nomeMateria="Biologia" />
          <AtividadeCard nomeMateria="Matemática" />
          <AtividadeCard nomeMateria="Física" />
        </ScrollView>
      </View>
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
    </View>
  );
};
export default HomeIndex;
