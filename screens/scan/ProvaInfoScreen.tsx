import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ProvaModel } from "../../models/ProvaModel";

const ProvaInfoScreen: React.FC<ProvaModel> = (prova) => {
  return (
    <View className=" bg-black h-full items-center justify-center pb-20 z-50 w-full">
      <LottieView
        source={require("@/assets/lotties/background.json")}
        style={{
          width: 900,
          height: 900,
          opacity: 0.8,
          position: "absolute",
          bottom: 0,
          transform: "rotate(270deg)",
        }}
        autoPlay
        loop
      />
      <View>
        <Text className=" text-white text-5xl text-center font-extrabold tracking-wide mb-4">
          {prova.nome}
        </Text>
        <Text className=" text-emerald-100 text-center text-md font-medium tracking-wider w-64 mb-4">
          {prova.assunto}
        </Text>
        <View className=" flex-column justify-center items-center">
          <View className=" flex-row w-96 justify-center items-center">
            <TouchableOpacity>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProvaInfoScreen;
