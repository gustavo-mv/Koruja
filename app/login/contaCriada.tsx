import React from "react";
import { useLocalSearchParams } from "expo-router";
import ContaCriadaScreen from "@/screens/login/ContaCriadaScreen";

const validations = () => {
  const params = useLocalSearchParams<{
    nome: string;
    email: string;
    senha: string;
    telefone: string;
  }>();

  console.log(params);

  if (!params) {
    return null;
  }

  const { nome, email, senha, telefone } = params;

  if (nome && email && senha && telefone) {
    return (
      <ContaCriadaScreen
        nomeParam={nome}
        emailParam={email}
        senhaParam={senha}
        telefoneParam={telefone}
      />
    );
  }
};

export default validations;
