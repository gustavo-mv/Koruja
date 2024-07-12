import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Out from "./../../assets/out.svg";
import { router } from "expo-router";

type SairProps = {
  logout: () => void;
};

const Sair: React.FC<SairProps> = ({ logout }) => {
  function handleLogout() {
    logout();
  }
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View className="mb-10">
      <TouchableOpacity
        className="flex-row space-x-11 bg-red-600 w-56 h-16 m-3 items-center rounded-xl p-4"
        onPress={() => setModalVisible(true)}
      >
        <Icon name="logout" size={28} color={"black"} />
        <Text className=" font-bold tracking-wider text-xl">Sair </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className=" bg-black/75 w-full h-full justify-center items-center">
          <View className="flex bg-white rounded-xl items-center w-80">
            <Out width={350} height={250} />
            <Text className="text-lg font-medium mb-5">
              Deseja realmente sair?
            </Text>
            <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
              <TouchableOpacity
                className="flex-1 items-center    border-r-2 border-gray-400"
                onPress={() => handleLogout()}
              >
                <Text className="text-red-500 text-xl font-bold">Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className=" text-blue-500 text-xl font-bold">Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sair;
