import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const FormPremiumScreen = () => {
  function handleContinue() {
    router.push({
      pathname: "/home/(conf)/assinarPremium",
      params: {
        canGoToForm: 1,
      },
    });
  }

  return (
    <View className="h-full pt-10">
      <TouchableOpacity onPress={() => handleContinue()}>
        <Text>Tela de Formulário</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormPremiumScreen;
