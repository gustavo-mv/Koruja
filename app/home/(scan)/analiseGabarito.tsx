import AnaliseGabaritoScreen from "@/screens/scan/AnaliseGabaritoScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const analiseGabarito = () => {
  const params = useLocalSearchParams<{
    base64: string;
  }>();

  const { base64 } = params;

  return <AnaliseGabaritoScreen base64={base64} />;
};

export default analiseGabarito;
