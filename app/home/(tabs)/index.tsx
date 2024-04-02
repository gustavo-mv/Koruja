import { ScrollView } from "react-native";
import React, { useContext } from "react";
import AuthContext from "@/app/AuthContext";
import HeaderHome from "../../../components/Home/HeaderHome";
import HomeIndex from "../../../components/Home/HomeIndex";

const index = () => {
  const { userGlobalData } = useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return (
    <ScrollView>
      <HeaderHome {...userGlobalData} />
      <HomeIndex />
    </ScrollView>
  );
};

export default index;
