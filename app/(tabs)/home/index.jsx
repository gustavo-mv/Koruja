import { Link, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const [userData, setUserData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const Tab1Index = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dadosUsuario = await response.json();
        console.log(dadosUsuario);
        setUserData(dadosUsuario);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Home" }} />
      <Link href="/">Bem-vindo {userData}</Link>
    </View>
  );
};
export default Tab1Index;
