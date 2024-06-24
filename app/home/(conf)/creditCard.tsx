import ApresentationPremiumScreen from "@/screens/config/ApresentationPremiumScreen";
import FormPremiumScreen from "@/screens/config/FormPremiumScreen";

import { useLocalSearchParams } from "expo-router";
import React from "react";

const creditCard = () => {
  const params = useLocalSearchParams<{
    canGoToForm: string;
  }>();

  return <FormPremiumScreen />;
};

export default creditCard;
