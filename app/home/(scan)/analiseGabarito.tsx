import AnaliseGabaritoScreen from "@/screens/scan/AnaliseGabaritoScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const analiseGabarito = () => {
  const params = useLocalSearchParams<{
    base64: string;
    dataQR: string;
  }>();

  const photoInfo = {
    base64: params.base64 as string,
    dataQR: params.dataQR as string,
  };

  return <AnaliseGabaritoScreen {...photoInfo} />;
};

export default analiseGabarito;
