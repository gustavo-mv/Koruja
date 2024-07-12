import React from "react";
import ForgotPasswordScreen from "@/screens/login/ForgotPasswordScreen";
import { useLocalSearchParams } from "expo-router";

const forgotPassword = () => {
  const params = useLocalSearchParams<{
    email?: string;
  }>();

  console.log(params.email);

  return <ForgotPasswordScreen emailParam={params.email} />;
};

export default forgotPassword;
