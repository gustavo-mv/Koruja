import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthContext from "@/app/AuthContext";
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();

const NewPasswordScreen = ({ code }) => {
  const [disabled, setDisabled] = useState(true);
  const [senhaNova, setSenhaNova] = useState("");
  console.log(code);

  const [error, setError] = useState("");
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    if (senhaNova.length > 7) {
      setDisabled(false);
    }
  }, [senhaNova]);

  async function handleRecovery() {
    const response = await fetch(`${API_URL}/professores/resetar-senha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        newPassword: senhaNova,
      }),
    });

    if (!response.ok) {
      console.log(response);

      console.error(
        "Algo inesperado aconteceu recuperação de conta não realizada."
      );
      throw new Error("Erro na resposta da API /professores/sms/reenviar");
    } else {
      router.replace({
        pathname: "/",
      });
    }
  }

  return (
    <View className=" h-full bg-ciano items-center justify-center">
      <View className="mb-5 ">
        {error && (
          <Text className="text-center text-lg font-medium text-red-500">
            {error}
          </Text>
        )}
        <View className="w-80">
          <Text className="font-bold text-white text-xl mb-5 text-center">
            Insira sua nova senha:
          </Text>
          <Text className="mb-2 text-sm text-white font-bold">Senha:</Text>
          <TextInput
            autoFocus={true}
            value={senhaNova}
            onChangeText={(value) => setSenhaNova(value)}
            className="font-bold text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-laranja focus:border-laranja block w-80 p-2.5"
            placeholder="Nova Senha"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleRecovery} disabled={disabled}>
        <Text
          className={`  ${
            disabled ? "opacity-40" : "opacity-100"
          } bg-laranja text-white  rounded-xl p-3 text-xl font-bold text-center`}
        >
          Alterar Senha
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPasswordScreen;
