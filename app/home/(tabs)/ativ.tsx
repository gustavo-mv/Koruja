import { View } from "react-native";
import React from "react";
import AtividadesIndex from "../../../components/Atividades/AtividadesIndex";
import { StatusBar } from "expo-status-bar";

const atividades = () => {
  return (
    <View>
      <StatusBar style="light" />

      <AtividadesIndex />
    </View>
  );
};

export default atividades;
