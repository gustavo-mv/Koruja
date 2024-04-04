import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import ListaTurmas from "@/components/Turmas/ListaTurmas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import User from "@/models/User";

const IndexTurmasScreen: React.FC<User> = ({ id }) => {
  return (
    <View>
      <ScrollView className="h-full">
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
          <Text className=" text-3xl font-bold tracking-wider mt-72 mb-3">
            Turmas
          </Text>
          <ListaTurmas idProf={id} />
        </View>
      </ScrollView>

      <Link
        asChild
        push
        href={{
          pathname: "/home/novaturma",
          params: { idProfessor: id },
        }}
      >
        <TouchableOpacity className=" flex-row justify-center items-center bg-green-500 rounded-2xl bottom-24 w-40 h-10 self-end fixed right-2 z-50">
          <MaterialCommunityIcons
            name="account-multiple-plus"
            size={24}
            color="black"
          />
          <Text className=" font-semibold pl-2">Adicionar Turma</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};
export default IndexTurmasScreen;
