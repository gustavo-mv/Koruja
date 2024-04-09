import { View, Text, ScrollView } from "react-native";
import React from "react";
import EscolherTurma from "@/components/Scan/Criar Prova/EscolherTurma";
import LottieView from "lottie-react-native";

const CriarProvaScreen: React.FC<{ idProf: string }> = ({ idProf }) => {
  return (
    <View className="h-full pt-10">
      <Text className=" mt-3 font-bold text-center text-5xl">
        Escolha uma Turma!
      </Text>
      <LottieView
        autoPlay
        style={{
          position: "absolute",
          width: 450,
          height: 550,
          right: -30,
          top: -139,
          zIndex: 10,
        }}
        source={require("@/assets/lotties/students.json")}
      />
      <View className="h-32 bg-black top-40"></View>
      <ScrollView className="mt-20 h-full bg-black">
        <EscolherTurma idProf={idProf} />
      </ScrollView>
    </View>
  );
};

export default CriarProvaScreen;
