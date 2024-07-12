import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Sair from "./Sair";
import { FontAwesome5 } from "@expo/vector-icons";
import User from "@/models/User";
import Avatar from "./Avatar";
import { Feather, Octicons, Fontisto } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import UserAccountType from "./UserAccountType";

type ConfigIndexProps = {
  logout: () => void;
  userGlobalData: User;
};

const ConfigIndex: React.FC<ConfigIndexProps> = ({
  logout,
  userGlobalData,
}) => {
  const backgroundHeader = React.useRef<LottieView>(null);

  const contaFree = () => (
    <TouchableOpacity onPress={() => handlePremium()}>
      <View className="bg-yellow-400 h-32 w-40 rounded-lg items-center justify-end">
        <View className="mb-3">
          <FontAwesome5 name="crown" size={50} color="black" />
        </View>
        <Text className="font-bold text-lg mb-3">Assinar Premium</Text>
      </View>
    </TouchableOpacity>
  );

  function handlePremium() {
    if (userGlobalData.cliente === false) {
      router.push("/home/(conf)/assinarPremium");
    } else {
      router.push({ pathname: "/home/(conf)/creditCard" });
    }
  }

  React.useEffect(() => {
    backgroundHeader.current?.play(0, 120);

    setTimeout(() => {
      backgroundHeader.current?.pause();
      backgroundHeader.current?.play(120, 120);
    }, 3000);

    [backgroundHeader];
  });

  return (
    <ScrollView>
      <View className="flex items-center justify-center h-full w-full bg-white">
        <View className="flex-col justify-center items-center">
          <LottieView
            autoPlay={false}
            ref={backgroundHeader}
            style={{
              width: 500,
              height: 1100,
              position: "absolute",
              top: -300,
              left: -30,
              transform: "rotate(270deg)",
            }}
            source={require("@/assets/bgProfile.json")}
          />
          <View className="items-center mt-32 mb-8">
            <TouchableOpacity>
              <Avatar
                avatarNumber={userGlobalData.nIcone}
                userId={userGlobalData.id}
              />

              <Feather
                name="edit"
                size={24}
                color="white"
                style={{
                  position: "absolute",
                  backgroundColor: "#345e5e",
                  borderRadius: 10,
                  padding: 2,
                  top: 120,
                  left: 115,
                }}
              />
            </TouchableOpacity>
            <Text className="mt-5 font-extrabold self-center text-3xl w-72 text-center text-white p-2">
              {userGlobalData.nome}
            </Text>
            <UserAccountType
              tipoConta={userGlobalData.tipo}
              data={userGlobalData.dataFimAssinatura}
            />
          </View>
        </View>
        <View
          style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40 }}
          className="bg-ciano w-full pt-10 items-center justify-center space-y-4"
        >
          <View className="flex-row space-x-3">
            <TouchableOpacity>
              <View className=" bg-laranja h-32 w-40 rounded-lg items-center justify-end">
                <View className="mb-3">
                  <Feather name="settings" size={55} color="black" />
                </View>
                <Text className="font-bold text-lg mb-3">Configurações</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/home/(conf)/code")}>
              <View className=" bg-laranja w-40 h-32 rounded-lg items-center justify-end">
                <View className=" flex-row space-x-1 mb-5">
                  <Octicons name="key-asterisk" size={30} color="black" />
                  <Octicons name="key-asterisk" size={30} color="black" />
                  <Octicons name="key-asterisk" size={30} color="black" />
                </View>
                <Text className="font-bold text-lg mb-3">Ativar Código</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row space-x-3 mb-3">
            {userGlobalData.tipo === "free" ? (
              contaFree()
            ) : (
              <TouchableOpacity>
                <View className="bg-laranja h-32 w-40 rounded-lg items-center justify-end">
                  <View className="mb-3">
                    <Fontisto name="credit-card" size={50} color="black" />
                  </View>
                  <Text className="font-bold text-lg mb-3">Sua Assinatura</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity>
              <View className=" bg-laranja w-40 h-32 rounded-lg items-center justify-end">
                <View className=" flex-row space-x-1 mb-3">
                  <Octicons name="log" size={45} color="black" />
                </View>
                <Text className="font-bold text-lg mb-3">Registros</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Sair logout={logout} />
        </View>
      </View>
    </ScrollView>
  );
};
export default ConfigIndex;
