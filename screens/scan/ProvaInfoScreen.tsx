import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ProvaModel } from "../../models/ProvaModel";
import { router } from "expo-router";

const ProvaInfoScreen: React.FC<ProvaModel> = (prova) => {
  const [deletar, setDeletar] = React.useState<boolean>(false);
  const animationDel = React.useRef<LottieView>(null);

  function handleClick() {
    setDeletar(true);
  }

  React.useEffect(() => {
    if (deletar === true) {
      animationDel.current?.play(0, 120);

      setTimeout(() => {
        animationDel.current?.pause();
        animationDel.current?.play(120, 120);
      }, 2000);
    }

    [deletar];
  });

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/provas/${prova.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao excluir a Prova.");
      } else {
        router.replace("home/(tabs)/scan");
        router.push("home/(scan)/listaDeGabaritos");
      }
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
      } else if (e instanceof Error) {
        e.message;
      }
    }
  };

  return (
    <View className=" bg-black h-full items-center justify-center pb-20 z-50 w-full">
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={deletar}
          onRequestClose={() => setDeletar(false)}
        >
          <View className=" bg-black/75 w-full h-full justify-center items-center">
            <View className="flex bg-white rounded-xl items-center w-80 overflow-hidden">
              <LottieView
                autoPlay={false}
                ref={animationDel}
                style={{
                  width: 900,
                  height: 150,
                  right: 5,
                }}
                source={require("@/assets/lotties/delete.json")}
              />
              <Text className="text-lg font-medium mb-5 w-64 text-center">
                Deseja realmente excluir a Prova de {prova.disciplina.nome} ?
              </Text>
              <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
                <TouchableOpacity
                  onPress={() => {
                    handleDelete();
                  }}
                  className="flex-1 items-center    border-r-2 border-gray-400"
                >
                  <Text className="text-red-500 text-xl font-bold">
                    Excluir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 items-center"
                  onPress={() => setDeletar(false)}
                >
                  <Text className=" text-blue-500 text-xl font-bold">
                    Voltar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

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
        <View className="flex-row items-center self-center">
          <Text className=" text-emerald-100 text-center text-md font-medium tracking-wider w-32 mb-4">
            {prova.disciplina.nome}
          </Text>
          <Text className=" text-emerald-100 text-center text-md font-medium tracking-wider w-32 mb-4">
            {prova.assunto}
          </Text>
        </View>
        <View className=" flex-column justify-center items-center">
          <View className=" flex-row w-96 justify-center items-center">
            <TouchableOpacity
              className=" w-9/12 bg-red-500 rounded-md items-center p-3"
              onPress={handleClick}
            >
              <Text className="text-white font-semibold">Excluir Prova</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProvaInfoScreen;
