import React from "react";
import { useLocalSearchParams } from "expo-router";
import ContaCriadaScreen from "@/screens/login/ContaCriadaScreen";

const contaCriada = () => {
  const params = useLocalSearchParams<{
    nome: string;
    email: string;
    telefone: string;
    token: string;

    userId: string;
  }>();

  if (!params) {
    return null;
  }

  const { nome, email, telefone, token, userId } = params;

  if (nome && email && telefone && token && userId) {
    return (
      <ContaCriadaScreen
        nomeParam={nome}
        emailParam={email}
        telefoneParam={telefone}
        userId={userId}
        token={token}
      />
    );
  }
};

export default contaCriada;
