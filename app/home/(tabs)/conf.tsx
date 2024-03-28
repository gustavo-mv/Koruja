import { View, Text, ScrollView } from "react-native";
import React from "react";
import AuthContext from "@/app/AuthContext";
import ConfigIndex from "../../../components/Config/ConfigIndex";

const conf = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <ScrollView>
      <ConfigIndex logout={logout} />
    </ScrollView>
  );
};

export default conf;
