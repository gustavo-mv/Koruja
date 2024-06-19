import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormEmailScreen = ({ nomeParam }) => {
  const [email, setEmail] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const nomeFormt = nomeParam.split(" ")[0];

  React.useEffect(() => {
    const isValidEmail = validateEmail(email);
    setDisabled(!isValidEmail);
  }, [email]);

  const validateEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  function handleNext() {
    router.push({
      pathname: "/login/validationToGoToPassword",
      params: {
        nome: nomeParam,
        email: email,
      },
    });
  }

  return (
    <View className=" h-full bg-white">
      <Text className=" font-bold text-lg m-2 self-center">
        {nomeFormt}, insira seu melhor E-mail:
      </Text>
      <TextInput
        autoFocus={true}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none" // Evita a capitalização automática do email
        className="bg-gray-100 h-10 w-72 self-center rounded-md text-xl p-2 border-2 border-green-600"
        onChangeText={(value) => setEmail(value)}
      ></TextInput>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: "#1CBA38", opacity: disabled ? 0.4 : 1 }}
        onPress={handleNext}
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
