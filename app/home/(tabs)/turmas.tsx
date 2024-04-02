import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import TurmasIndex from "@/components/Turmas/TurmasIndex";
import AuthContext from "@/app/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const turmas = () => {
  const { userGlobalData } = React.useContext(AuthContext);
  if (!userGlobalData) {
    return null;
  }
  return (
    <View>
      <View className="h-full">
        <ScrollView>
          <TurmasIndex {...userGlobalData} />
        </ScrollView>
      </View>
      <TouchableOpacity className=" flex-row justify-center items-center bg-green-500 rounded-2xl bottom-28 w-40 h-10 self-end fixed right-2 z-50">
        <MaterialCommunityIcons
          name="account-multiple-plus"
          size={24}
          color="black"
        />

        <Link
          href={{
            pathname: "/home/novaturma",
            params: { idProfessor: userGlobalData.id },
          }}
        >
          <Text className=" font-semibold pl-2">Adicionar Turma</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default turmas;
