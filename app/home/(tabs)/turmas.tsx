import { ScrollView, View } from "react-native";
import React from "react";
import TurmasIndex from "@/components/Turmas/TurmasIndex";
import AuthContext from "@/app/AuthContext";

const turmas = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return (
    <ScrollView>
      <TurmasIndex {...userGlobalData} />
    </ScrollView>
  );
};

export default turmas;
