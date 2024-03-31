import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import AuthContext from "./AuthContext";

const index = () => {
  const { token, dataUser, isLoading } = React.useContext(AuthContext);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            router.replace("/login");
            throw new Error("Token Expirado!");
          }
          const data = await response.json();
          dataUser(data);
          router.replace("/home");
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
          router.replace("/login");
        }
      };
      fetchData();
    }
  }, [isLoading, token]);

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
