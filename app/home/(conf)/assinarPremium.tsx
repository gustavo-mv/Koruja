import ApresentationPremiumScreen from "@/screens/config/ApresentationPremiumScreen";
import FormPremiumScreen from "@/screens/config/FormPremiumScreen";

import { useLocalSearchParams } from "expo-router";
import React from "react";

const assinarPremium = () => {
  const params = useLocalSearchParams<{
    canGoToForm: string;
  }>();

  if (params.canGoToForm === undefined) {
    return <ApresentationPremiumScreen />;
  } else {
    return <FormPremiumScreen />;
  }
};

export default assinarPremium;
