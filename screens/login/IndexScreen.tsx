import { router } from "expo-router";
import React from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

function handleLogin() {
  router.push("/login/loginForm");
}
function handleCreateAccount() {
  router.push("/login/criarConta");
}

const IndexScreen = () => {
  return (
    <View className="flex h-full w-full">
      <View className="h-96">
        <Image
          source={require("@/assets/classroom.jpg")}
          className="h-full w-full"
        />
      </View>
      <View
        className=" bg-ciano absolute top-80 w-full h-full items-center"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="mt-10">
          <Text className=" text-xl font-light text-white w-64 text-center">
            Seja bem-vindo(a) ao melhor amigo do professor!
          </Text>
        </View>
        <View style={styles.imageContainer} className="mt-5">
          <Image
            source={require("./../../assets/attlasAssistente.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View
          className="flex-row rounded-3xl border-laranja mt-5"
          style={{ borderStyle: "solid", borderWidth: 1 }}
        >
          <TouchableOpacity onPress={() => handleLogin()}>
            <View className=" border-laranja bg-laranja w-36 rounded-3xl h-12 justify-center items-center">
              <Text className=" text-white font-extrabold text-md">Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCreateAccount()}>
            <View className="w-36 rounded-xl h-12 justify-center items-center">
              <Text className=" text-laranja font-semibold text-md ">
                Criar Conta
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default IndexScreen;
