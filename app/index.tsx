import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import AuthContext from "./AuthContext";
import NetInfo from "@react-native-community/netinfo";
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();

const index = () => {
  const { token, dataUser, isLoading } = React.useContext(AuthContext);
  const [isConnected, setIsConnected] = React.useState(true);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected !== null ? state.isConnected : true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!isLoading && isConnected) {
      const isSmsSent = storage.getBoolean("isSmsSent");
      const onValidation = storage.getBoolean("onValidation");
      const recovering = storage.getBoolean("recovering");

      const fetchData = async () => {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (!isConnected) {
              return (
                <View className="h-full w-full bg-white justify-center items-center">
                  <Text className="text-xl font-bold text-center text-red-400">
                    Você está offline. Verifique sua conexão com a internet e
                    reinicie o app.
                  </Text>
                </View>
              );
            } else {
              throw new Error("Token Expirado!");
            }
          }

          const data = await response.json();

          dataUser(data);

          if (data.telefoneValidado === false && onValidation) {
            router.replace({
              pathname: "/login/contaCriada",
              params: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                userId: data.id,
                token: token,
              },
            });
            router.push({
              pathname: "/login/awaitingCode",
              params: {
                telefone: data.telefone,
              },
            });
          } else if (data.telefoneValidado === false) {
            router.replace({
              pathname: "/login/contaCriada",
              params: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                userId: data.id,
                token: token,
              },
            });
          } else {
            router.replace("/home");
          }
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
