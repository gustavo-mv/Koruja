import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormNomeScreen = () => {
  const [nome, setNome] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  function handleNext() {
    router.push({
      pathname: "/login/validationToGoToEmail",
      params: {
        nome: nome.trim(),
      },
    });
  }

  React.useEffect(() => {
    if (nome.trim().length > 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nome]);

  return (
    <View className=" h-full bg-ciano">
      <Text className=" font-bold text-xl m-2 mt-3 mb-5 text-white self-center">
        Vamos começar pelo seu nome:
      </Text>
      <TextInput
        autoFocus={true}
        placeholder="Nome"
        autoCapitalize="words"
        className="bg-gray-100 h-10 w-72 self-center font-medium rounded-md text-xl p-2 border-2 border-laranja"
        onChangeText={(value) => setNome(value)}
      ></TextInput>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: "#e86800", opacity: disabled ? 0.4 : 1 }}
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
