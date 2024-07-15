import ApresentationPremiumScreen from "@/screens/config/ApresentationPremiumScreen";
import FormPremiumScreen from "@/screens/config/FormPremiumScreen";

import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import AuthContext from "@/app/AuthContext";

const assinarPremium = () => {
  const { userGlobalData } = React.useContext(AuthContext);

  const params = useLocalSearchParams<{
    canGoToForm: string;
  }>();

  if (params.canGoToForm === undefined) {
    return <ApresentationPremiumScreen />;
  } else if (params.canGoToForm && userGlobalData?.cliente === true) {
    router.push("/home/(conf)/creditCard");
  } else {
    return <FormPremiumScreen />;
  }
};

export default assinarPremium;
