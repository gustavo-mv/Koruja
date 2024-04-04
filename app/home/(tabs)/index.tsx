import { ScrollView } from "react-native";
import React, { useContext } from "react";
import AuthContext from "@/app/AuthContext";
import IndexHomeScreen from "@/screens/home/IndexHomeScreen";

const index = () => {
  const { userGlobalData } = useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return <IndexHomeScreen {...userGlobalData} />;
};

export default index;
