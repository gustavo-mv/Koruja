import React from "react";
import { CreditCardComponent } from "@/screens/config/CreditCardComponent";
import { useLocalSearchParams } from "expo-router";

const CreditCardScreen = () => {
  const { nomeCompleto, cpf, canGoToForm } = useLocalSearchParams();

  return (
    <CreditCardComponent cpfParam={cpf} nomeCompletoParam={nomeCompleto} />
  );
};

export default CreditCardScreen;
