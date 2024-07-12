import { View } from "react-native";
import React from "react";
import AuthContext from "@/app/AuthContext";
import ConfigIndex from "../../../components/Config/ConfigIndex";
import { StatusBar } from "expo-status-bar";

const conf = () => {
  const { logout, userGlobalData } = React.useContext(AuthContext);

  return (
    <View>
      <StatusBar style="light" />
      <ConfigIndex logout={logout} userGlobalData={userGlobalData} />
    </View>
  );
};

export default conf;
