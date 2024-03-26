import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import AuthContext from "./AuthContext";

const index = () => {
  const { user, isLoading } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!isLoading) {
      router.replace(user ? "/home" : "/login");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return null;
};

export default index;
