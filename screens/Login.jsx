import React, { useState } from "react";
import { TextInput, Button, View, Text, ScrollView } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message || "Erro ao fazer login");
      console.log("chegou aqui");
      console.log(API_URL);
      console.log(process.env);
    }
  };

  return (
    <View className="flex-1 justify-center w-80 mx-auto">
      <View className="mb-5">
        <Text className="block mb-2 text-sm font-medium text-gray-900">
          Usuário
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5 ">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Senha
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        title="Login"
        onPress={handleLogin}
      />

      {error && (
        <Text className="text-center text-lg font-medium text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
};

export default LoginForm;
