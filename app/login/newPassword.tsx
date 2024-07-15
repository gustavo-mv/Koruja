import React from "react";
import NewPasswordScreen from "@/screens/login/NewPasswordScreen";
import { useLocalSearchParams } from "expo-router";

const newPassword = () => {
  const params = useLocalSearchParams<{
    code: string;
  }>();

  if (!params) {
    return null;
  }

  if (params.code) {
    return <NewPasswordScreen code={params.code} />;
  }
};

export default newPassword;
