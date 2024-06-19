import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthContext from "@/app/AuthContext";

const FormNomeScreen = ({ nomeParam, userId, token, telefoneParam }: any) => {
  const { logout } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(true);
  const nomeFormt = nomeParam.split(" ")[0];
  React.useEffect(() => {}, []);

  console.log(nomeParam, userId, token, telefoneParam);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  async function handleLogOut() {
    logout();
  }

  async function handleAprove() {
    try {
      const response = await fetch(`${API_URL}/professores/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          telefoneValidado: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na Validação de Conta");
      }

      router.replace("/home");
    } catch (error) {
      console.error("Erro na Validação de Conta:", error);
    }
  }

  return (
    <View className=" h-full bg-white">
      <View>
        <Text className="text-xl m-5 self-center">
          Parabéns {nomeFormt}, sua Conta no{" "}
          <Text className="font-bold ">Attlas Assistente </Text> foi criada com
          sucesso! Para prosseguirmos, você deve validar sua conta via{" "}
          <Text className="text-green-600 font-bold">SMS</Text> para o número:
        </Text>
        <Text className="mt-10 font-extrabold text-2xl self-center bg-green-300 rounded-md pl-5 pr-5 h-12 justify-center pt-2 text-center underline">
          {telefoneParam}
        </Text>
        <View className="items-center justify-center h-64">
          <TouchableOpacity
            className="mt-10 bg-green-600 w-52 h-14 items-center justify-center rounded-md"
            onPress={() => handleAprove()}
          >
            <Text className="text-lg font-bold text-white ">Validar Agora</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2 bg-yellow-300 w-52 h-14 items-center justify-center rounded-md">
            <Text className="text-lg font-bold">Número errado?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="mt-40 bg-red-500  w-52 h-12 items-center justify-center self-center rounded-md"
          onPress={() => {
            handleLogOut();
          }}
        >
          <Text className="text-lg font-bold text-white">Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormNomeScreen;
