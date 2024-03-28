import { Stack } from "expo-router";
import AuthContext from "./../AuthContext";
import React from "react";

export default function HomeLayout() {
  const { token, dataUser } = React.useContext(AuthContext);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados da API");
        }
        const data = await response.json();
        dataUser(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {});

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
