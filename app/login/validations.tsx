import React from "react";
import { useLocalSearchParams } from "expo-router";
import FormEmailScreen from "@/screens/login/FormEmailScreen";
import FormSenhaScreen from "@/screens/login/FormSenhaScreen";
import FormTelefoneScreen from "@/screens/login/FormTelefoneScreen";

const validations = () => {
  const params = useLocalSearchParams<{
    nome: string;
    email?: string;
    senha?: string;
    telefone?: string;
  }>();

  console.log(params);

  if (!params) {
    console.log("caiu aqui");

    return null;
  }

  const { nome, email, senha, telefone } = params;

  if (!nome && !email && !senha && !telefone) {
    return null;
  }

  if (nome && !email && !senha && !telefone) {
    return <FormEmailScreen nomeParam={nome} />;
  }

  if (nome && email && !senha && !telefone) {
    return <FormSenhaScreen nomeParam={nome} emailParam={email} />;
  }

  if (nome && email && senha && !telefone) {
    return (
      <FormTelefoneScreen
        nomeParam={nome}
        emailParam={email}
        senhaParam={senha}
      />
    );
  }
};

export default validations;
