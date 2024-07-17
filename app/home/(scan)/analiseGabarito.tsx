import AnaliseGabaritoScreen from "@/screens/scan/AnaliseGabaritoScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const analiseGabarito = () => {
  const params = useLocalSearchParams<{
    URI: string;
    dataQR: string;
  }>();

  const photoInfo = {
    URI: params.URI as string,
    dataQR: params.dataQR as string,
  };

  return <AnaliseGabaritoScreen {...photoInfo} />;
};

export default analiseGabarito;
