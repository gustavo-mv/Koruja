import { ScrollView, View } from "react-native";
import React, { useContext } from "react";
import AuthContext from "@/app/AuthContext";
import IndexHomeScreen from "@/screens/home/IndexHomeScreen";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const { userGlobalData } = useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return (
    <View className="bg-ciano">
      <StatusBar style="light" />
      <IndexHomeScreen {...userGlobalData} />
    </View>
  );
};

export default index;
