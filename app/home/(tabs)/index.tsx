import { View, Text } from "react-native";
import React from "react";
import AuthContext from "@/app/AuthContext";
import HeaderHome from "./../../../components/HeaderHome";
import HomeIndex from "./../../../components/HomeIndex";
const index = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  return (
    <View>
      {userGlobalData && <HeaderHome nome={userGlobalData.nome} />}
      {userGlobalData && <HomeIndex />}
    </View>
  );
};

export default index;
