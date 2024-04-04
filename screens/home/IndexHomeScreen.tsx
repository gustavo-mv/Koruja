import { ScrollView } from "react-native";
import React from "react";
import HeaderHome from "@/components/Home/HeaderHome";
import HomeIndex from "@/components/Home/HomeIndex";
import User from "@/models/User";

const IndexHomeScreen: React.FC<User> = (dataFromContext) => {
  return (
    <ScrollView>
      <HeaderHome nome={dataFromContext.nome} />
      <HomeIndex />
    </ScrollView>
  );
};

export default IndexHomeScreen;
