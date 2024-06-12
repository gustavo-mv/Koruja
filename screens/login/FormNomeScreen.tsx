import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormNomeScreen = () => {
  const [nome, setNome] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  function handleNext() {
    router.push({
      pathname: "/login/validations",
      params: {
        nome: nome.trim(), // Remover espaços em branco no início e no final
      },
    });
  }

  React.useEffect(() => {
    // Remover espaços em branco no início e no final e verificar se ainda há caracteres no nome
    if (nome.trim().length > 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nome]);

  return (
    <View className=" h-full bg-white">
      <Text className=" font-bold text-lg m-2 self-center">
        Vamos começar pelo seu nome:
      </Text>
      <TextInput
        autoFocus={true}
        placeholder="Nome"
        autoCapitalize="words"
        className="bg-gray-100 h-10 w-72 self-center rounded-md text-xl p-2 border-2 border-green-600"
        onChangeText={(value) => setNome(value)}
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

export default FormNomeScreen;
