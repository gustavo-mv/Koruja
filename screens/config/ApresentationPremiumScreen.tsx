import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ApresentationPremiumScreen = () => {
  function handleContinue() {
    router.push({
      pathname: "/home/(conf)/assinarPremium",
      params: {
        canGoToForm: 1,
      },
    });
  }

  return (
    <View className="h-full bg-ciano">
      <LottieView
        autoPlay
        loop
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: -75,
          bottom: 190,
        }}
        source={require("@/assets/lotties/premium.json")}
      />
      <View className="p-4 justify-end h-full pb-10 space-y-5 ">
        <Text className=" text-white text-xl font-medium text-center">
          Por apenas{" "}
          <Text className="font-extrabold text-orange-300">12.90/mês</Text> você
          possui o melhor assistente educacional do mercado com Provas
          Ilimitadas!
        </Text>

        <TouchableOpacity
          className="bg-yellow-300 w-72 p-2 rounded-lg self-center justify-center items-center space-x-4 flex-row"
          onPress={() => handleContinue()}
        >
          <Text className="font-extrabold text-xl text-center">
            Adquirir assinatura!
          </Text>
          <FontAwesome5 name="crown" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApresentationPremiumScreen;
