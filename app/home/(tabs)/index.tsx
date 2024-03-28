import { View, Text, ScrollView } from "react-native";
import React from "react";
//import AuthContext from "@/app/AuthContext";
import HeaderHome from "../../../components/Home/HeaderHome";
import HomeIndex from "../../../components/Home/HomeIndex";
const index = () => {
  //const { userGlobalData } = React.useContext(AuthContext);
  return (
    <ScrollView>
      <HeaderHome />
      <HomeIndex />
    </ScrollView>
  );
};

export default index;
