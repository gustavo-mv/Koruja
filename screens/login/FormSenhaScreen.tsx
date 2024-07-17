import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormNomeScreen = ({ nomeParam, emailParam }) => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleNext = () => {
    router.push({
      pathname: "/login/validationToGoToTelephone",
      params: {
        nome: nomeParam,
        email: emailParam,
        senha: senha,
      },
    });
  };

  React.useEffect(() => {
    if (
      senha.trim().length > 7 &&
      confirmarSenha.trim().length > 7 &&
      senha === confirmarSenha
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [senha, confirmarSenha]);

  return (
    <View className=" h-full bg-ciano">
      <View className=" flex-col items-center">
        <Text className="font-bold text-xl mt-5 mb-3 text-white">
          Insira a senha pra sua conta:
        </Text>
        <View className="flex-row justify-center items-center w-full ">
          <TextInput
            keyboardType="default"
            selectTextOnFocus={false}
            pointerEvents="box-only"
            autoFocus={true}
            placeholder="Senha"
            secureTextEntry={!senhaVisivel}
            className="bg-gray-100 h-10 w-80 self-center rounded-md text-xl p-2 border-2 border-laranja "
            onChangeText={(value) => setSenha(value)}
          />

          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={toggleSenhaVisivel}
          >
            <FontAwesome5
              name={senhaVisivel ? "eye-slash" : "eye"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text className="font-bold text-gray-400 ">
          A senha deve ter pelo menos 8 caracteres.
        </Text>
      </View>
      <View className=" flex-col items-center">
        <Text className="font-bold text-xl mt-8 mb-3 text-white">
          Confirme a senha:
        </Text>
        <View className="flex-row justify-center items-center w-full">
          <TextInput
            keyboardType="default"
            selectTextOnFocus={false}
            pointerEvents="box-only"
            placeholder="Confirmar Senha"
            secureTextEntry={!confirmarSenhaVisivel}
            className="bg-gray-100 h-10 w-80 self-center rounded-md text-xl p-2 border-2 border-laranja"
            onChangeText={(value) => setConfirmarSenha(value)}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: "#e86800", opacity: disabled ? 0.4 : 1 }}
        onPress={handleNext}
        className="self-center mt-10 w-40 rounded-md items-center justify-center p-3 flex-row space-x-4"
      >
        <Text
          className="font-bold text-xl "
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
