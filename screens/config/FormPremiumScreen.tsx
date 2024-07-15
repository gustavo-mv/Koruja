import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import AuthContext from "@/app/AuthContext";

import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const FormPremiumScreen = () => {
  const { token } = React.useContext(AuthContext);
  const [disabled, setDisabled] = React.useState(true);
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (nome.trim() !== "" && validarCpf(cpf)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nome, cpf]);

  async function handleContinue() {
    const cleanedCpf = cpf.replace(/\D/g, "");

    try {
      const response = await fetch(`${API_URL}/pagamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: nome,
          cpfCnpj: cleanedCpf,
        }),
      });

      if (!response.ok) {
        setError("Algo inesperado aconteceu, erro na criação de assinatura.");
        throw new Error("Erro na resposta da API /pagamentos/mensal");
      }
      router.replace("/home/(tabs)/conf");
      router.push({
        pathname: "/home/(conf)/creditCard",
        params: {
          nomeCompleto: nome,
          cpf: cleanedCpf,
          canGoToForm: 1,
        },
      });
    } catch (e) {
      if (typeof e === "string") {
        setError(e.toUpperCase() || "Erro ao fazer login");
      } else if (e instanceof Error) {
        setError(e.message || "Erro ao fazer login");
      }
    }
  }

  function handleCpfChange(value) {
    const cleanedCpf = value.replace(/\D/g, "");
    if (cleanedCpf.length <= 11) {
      const maskedCpf = cleanedCpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setCpf(maskedCpf);
    }
  }

  function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  return (
    <View className="h-full bg-ciano">
      <Text className="font-bold text-white text-lg m-2 self-center">
        Insira seu nome completo:
      </Text>
      <TextInput
        autoFocus={true}
        placeholder="Nome Completo"
        autoCapitalize="none"
        className="bg-gray-100 h-10 w-72 self-center rounded-md text-xl p-2 border-2 border-green-600"
        onChangeText={(value) => setNome(value)}
      />

      <Text className="font-bold text-lg m-2 self-center">CPF:</Text>
      <TextInput
        placeholder="CPF"
        autoCapitalize="none"
        keyboardType="numeric"
        value={cpf}
        maxLength={14}
        className="bg-gray-100 h-10 w-72 self-center rounded-md text-xl p-2 border-2 border-green-600"
        onChangeText={handleCpfChange}
      />

      <TouchableOpacity
        disabled={disabled}
        onPress={handleContinue}
        style={{ backgroundColor: "#e86800", opacity: disabled ? 0.4 : 1 }}
        className="self-center m-5 rounded-md items-center justify-center p-3 flex-row space-x-4"
      >
        <Text
          className="font-bold text-lg "
          style={{ color: disabled ? "black" : "white" }}
        >
          Prosseguir para Pagamento
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

export default FormPremiumScreen;
