import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "@/app/AuthContext";
import LottieView from "lottie-react-native";

const GabaritosCard = () => {
  const { userGlobalData } = React.useContext(AuthContext);

  return (
    <LinearGradient
      colors={["#e86800", "#ff7f11", "#cc5500"]}
      className="h-36 m-3  flex flex-row rounded-xl  pl-7"
    >
      <View className="flex-1 items-start justify-center ">
        <Text className=" text-xl text-white">Provas</Text>
        <Text className=" font-bold tracking-wide text-3xl text-white">
          Geradas:
        </Text>
      </View>
      <View className="flex-1 h-36  items-center justify-center rounded-xl bg-chumbo">
        <View className="flex-row ">
          <Text className=" font-bold text-white text-7xl">
            {userGlobalData?.provasGeradas}
          </Text>
        </View>

        <View>
          {userGlobalData?.tipo === "free" ? (
            <>
              <Text className="font-bold text-gray-300 text-xl">
                Restam{" "}
                {userGlobalData.nLimiteProvasFree -
                  userGlobalData.provasGeradas}
              </Text>
            </>
          ) : (
            <>
              <Text className="font-bold text-gray-300 text-lg">
                Clique para criar +
              </Text>
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default GabaritosCard;
