import React from "react";
import AwaitingCode from "@/screens/login/AwaitingCode";
import { useLocalSearchParams } from "expo-router";

const awaitingCode = () => {
  const params = useLocalSearchParams<{
    telefone: string;
    isTryingResetPassword: string;
  }>();

  if (!params) {
    return null;
  }

  if (params.telefone && !params.isTryingResetPassword) {
    return <AwaitingCode telefone={params.telefone} />;
  }
  if (params.isTryingResetPassword) {
    return <AwaitingCode isTryingReset={params.isTryingResetPassword} />;
  }
};

export default awaitingCode;
