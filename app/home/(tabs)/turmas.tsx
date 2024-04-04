import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import IndexTurmasScreen from "@/screens/turmas/IndexTurmasScreen";
import AuthContext from "@/app/AuthContext";

const turmas = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return <IndexTurmasScreen {...userGlobalData} />;
};

export default turmas;
