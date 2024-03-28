import { View, Text, ScrollView } from "react-native";
import React from "react";
import Sair from "./Sair";

type ConfigIndexProps = {
  logout: () => void;
};

const ConfigIndex: React.FC<ConfigIndexProps> = ({ logout }) => {
  return (
    <View className="flex items-center justify-center">
      <View className="flex-row justify-center"></View>
      <Sair logout={logout} />
    </View>
  );
};
export default ConfigIndex;
