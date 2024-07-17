import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormEmailScreen = ({ nomeParam }) => {
  const [email, setEmail] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const nomeFormt = nomeParam.split(" ")[0];

  React.useEffect(() => {
    const isValidEmail = validateEmail(email);
    setDisabled(!isValidEmail);
  }, [email]);

  const validateEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  async function handleNext() {
    try {
      const response = await fetch(
        `${API_URL}/professores/buscar/params?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        Alert.alert("Erro", "Este email já está cadastrado no nosso sistema.");
      } else if (response.status === 404) {
        router.push({
          pathname: "/login/validationToGoToPassword",
          params: {
            nome: nomeParam,
            email: email,
          },
        });
      } else {
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao verificar o email. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao verificar o email:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao verificar o email. Tente novamente."
      );
    }
  }

  return (
    <View className=" h-full bg-ciano">
      <Text className=" font-bold text-xl m-2 text-white mt-3 mb-5 self-center">
        {nomeFormt}, insira seu melhor E-mail:
      </Text>
      <TextInput
        autoFocus={true}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none" // Evita a capitalização automática do email
        className="bg-gray-100 h-10 w-72 font-medium self-center rounded-md text-xl p-2 border-2 border-laranja"
        onChangeText={(value) => setEmail(value)}
      ></TextInput>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: "#e86800", opacity: disabled ? 0.4 : 1 }}
        onPress={() => handleNext()}
        className="self-center m-5 w-40 rounded-md items-center justify-center p-3 flex-row space-x-4"
      >
        <Text
          className="font-bold text-xl"
          style={{ color: disabled ? "black" : "white" }}
        >
          Próximo
        </Text>
        <FontAwesome5
          name="chevron-circle-right"
          size={24}
          color={disabled ? "black" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FormEmailScreen;
