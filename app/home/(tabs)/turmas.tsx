import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import IndexTurmasScreen from "@/screens/turmas/IndexTurmasScreen";
import AuthContext from "@/app/AuthContext";
import { StatusBar } from "expo-status-bar";

const turmas = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return (
    <View>
      <StatusBar style="light" />

      <IndexTurmasScreen {...userGlobalData} />
    </View>
  );
};

export default turmas;
