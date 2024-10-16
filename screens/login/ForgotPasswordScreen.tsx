import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthContext from "@/app/AuthContext";
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();

const ForgotPasswordScreen = ({ emailParam }) => {
  const [email, setEmail] = useState(emailParam || "");

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    const isValidEmail = validateEmail(email);
    setDisabled(!isValidEmail);
  }, [email]);

  const validateEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  async function handleRecovery() {
    const response = await fetch(
      `${API_URL}/professores/sms/resetpass/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Algo inesperado aconteceu recuperação de conta não realizada."
      );
      throw new Error("Erro na resposta da API /professores/sms/reenviar");
    } else {
      storage.set("isSmsSent", true);
      storage.set("recovering", true);

      storage.set("smsSentTime", Date.now());
      console.log(response);

      router.push({
        pathname: "/login/awaitingCode",
        params: {
          isTryingResetPassword: "ok",
        },
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
            Para recuperar sua conta Koruja, insira seu Email abaixo:
          </Text>
          <Text className="mb-2 text-sm text-white font-bold">Email:</Text>
          <TextInput
            autoFocus={true}
            value={email}
            onChangeText={(value) => setEmail(value)}
            className="font-bold text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-laranja focus:border-laranja block w-80 p-2.5"
            placeholder="Email"
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
          Recuperar Conta
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
