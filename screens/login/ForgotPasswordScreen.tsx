import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import AuthContext from "@/app/AuthContext";

const ForgotPasswordScreen = ({ emailParam }) => {
  const [email, setEmail] = useState(emailParam || "");

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  function handleRecovery() {}

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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-laranja focus:border-laranja block w-80 p-2.5"
            placeholder="Email"
          />
        </View>
      </View>

      <TouchableOpacity className="" disabled={disabled}>
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
