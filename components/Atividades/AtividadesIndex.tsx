import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AtividadesIndex = () => {
  return (
    <View className="flex items-center justify-center pt-5">
      <LottieView
        autoPlay
        loop
        style={{
          width: 500,
          height: 350,
          position: "absolute",
          left: 15,
        }}
        source={require("@/assets/lotties/Animation - 1711821268390.json")}
      />
      <Text className=" text-3xl font-bold tracking-wider mt-72">
        Atividades
      </Text>
    </View>
  );
};
export default AtividadesIndex;
