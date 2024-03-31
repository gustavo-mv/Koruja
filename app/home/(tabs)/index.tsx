import { ScrollView } from "react-native";
import React, { useContext } from "react";
import AuthContext from "@/app/AuthContext";
import HeaderHome from "../../../components/Home/HeaderHome";
import HomeIndex from "../../../components/Home/HomeIndex";

const index = () => {
  const { userGlobalData } = useContext(AuthContext);
  return (
    <ScrollView>
      <HeaderHome nome={userGlobalData?.nome || null} />
      <HomeIndex />
    </ScrollView>
  );
};

export default index;
