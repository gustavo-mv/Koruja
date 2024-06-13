import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import PhoneInput from "react-native-international-phone-number";
import { ICountry } from "react-native-international-phone-number";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const FormTelefoneScreen = ({ nomeParam, emailParam, senhaParam }: any) => {
  const [telefone, setTelefone] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  const [selectedCountry, setSelectedCountry] = React.useState<
    undefined | ICountry
  >(undefined);
  const [inputValue, setInputValue] = React.useState<string>("");

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  async function handleCreate() {
    const response = await fetch(`${API_URL}/professores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeParam,
        email: emailParam,
        senha: senhaParam,
        telefone: telefone,
      }),
    });

    if (!response.ok) {
      console.error("Algo inesperado aconteceu, erro na criação de conta.");
      throw new Error("Erro na resposta da API /professor");
    } else {
      router.replace({
        pathname: "/login/contaCriada",
        params: {
          nome: nomeParam,
          email: emailParam,
          senha: senhaParam,
          telefone: telefone,
        },
      });
    }
  }

  React.useEffect(() => {
    setTelefone(`${selectedCountry?.callingCode} ${inputValue}`);
    if (inputValue.length > 12) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputValue]);

  return (
    <View className=" h-full bg-white">
      <PhoneInput
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        language="pt"
        autoFocus={true}
      />

      <Text className="font-bold text-gray-600 ml-5 mr-5 mt-2">
        Usaremos confirmação via SMS para validar sua conta. Cada conta possui
        um número associado.
      </Text>

      <Text className="font-bold text-gray-600 ml-5 mr-5 mt-2">
        Ao clicar em "Criar Conta" você concorda com os{" "}
        <Text className="font-extrabold text-blue-600">Termos e condições</Text>{" "}
        e{" "}
        <Text className="font-extrabold text-blue-600">
          Política de Privacidade
        </Text>
      </Text>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: "#1CBA38", opacity: disabled ? 0.4 : 1 }}
        onPress={handleCreate}
        className="self-center m-5 w-44 rounded-md items-center justify-center p-3 flex-row space-x-4"
      >
        <Text
          className="font-bold text-xl"
          style={{ color: disabled ? "black" : "white" }}
        >
          Criar Conta
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

export default FormTelefoneScreen;
