import { View, Text, ScrollView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const TurmasIndex = () => {
  return (
    <View className="flex items-center justify-center pt-5">
      <LottieView
        autoPlay
        loop
        style={{
          width: 350,
          height: 350,
          backgroundColor: "transparent",
          position: "absolute",
          top: 15,
        }}
        source={require("./../../assets/lotties/Turmas.json")}
      />
      <Text className=" text-3xl font-bold tracking-wider mt-72">Turmas</Text>
    </View>
  );
};
export default TurmasIndex;
