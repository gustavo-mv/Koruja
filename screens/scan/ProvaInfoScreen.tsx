import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ProvaModel } from "../../models/ProvaModel";
import { router, Link } from "expo-router";
import { CriarProvaInfoFinal } from "@/models/CriarProvaInfoFinal";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ProvaInfoScreen: React.FC<ProvaModel> = (prova) => {
  const [deletar, setDeletar] = React.useState<boolean>(false);
  const [optionsPanel, setoptionsPanel] = React.useState<any>(false);

  const animationDel = React.useRef<LottieView>(null);
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

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

  React.useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/provas/${prova.id}`);
      const json: CriarProvaInfoFinal = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

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

  const handleEdit = async () => {
    router.push({
      pathname: "home/(scan)/editarGabarito",
      params: {
        idProva: prova.id,
        turmaId: data.disciplina.id,
        disciplinaNome: data.disciplina.nome,
        disciplinaId: prova.disciplinaId,
        nomeProva: data.nome,
        assunto: data.assunto,
        nQuestoes: data.nQuestoes,
        nAlternativas: data.nAlternativas,
        nVariacoes: data.nVariacoes,
        respostas: JSON.stringify(data.variacoes),
        index: optionsPanel - 1,
      },
    });
    setoptionsPanel(false);
  };

  return (
    <View className="h-full bg-black items-center justify-center z-50 w-full">
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={optionsPanel != false}
          onRequestClose={() => setoptionsPanel(false)}
        >
          <View className=" bg-black/75 w-full h-full justify-center items-center">
            <View className=" items-end w-full">
              <AntDesign
                name="closecircle"
                size={35}
                color="white"
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: 20,
                  zIndex: 10,
                  backgroundColor: "red",
                  borderRadius: 50,
                }}
                onPress={() => setoptionsPanel(false)}
              />
            </View>
            <View className="flex bg-white rounded-xl items-center w-80 overflow-hidden z-0 pt-5">
              <Text className="text-2xl font-bold mb-3 w-64 text-center">
                Opções - Variação {optionsPanel}:
              </Text>
              <View className="flex-row h-35 m-2  justify-center items-center rounded-b-xl">
                <TouchableOpacity
                  className="flex-1 items-center rounded-md m-2 bg-yellow-300 h-28 justify-center"
                  onPress={() => handleEdit()}
                >
                  <MaterialCommunityIcons
                    name="qrcode-edit"
                    size={40}
                    color="black"
                  />
                  <Text className="text-black text-xl pt-1 font-bold">
                    Editar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center h-28 justify-center bg-emerald-400 rounded-md m-2">
                  <MaterialCommunityIcons
                    name="file-download-outline"
                    size={45}
                    color="black"
                  />
                  <Text className=" text-black text-base  pt-1 font-bold">
                    Baixar Gabarito
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
      <View className="">
        <Text className="mt-20 text-white text-4xl w-80 self-center text-center font-extrabold tracking-wide mb-4">
          {prova.nome}
        </Text>
        <View className="flex-row items-center self-center">
          <Text className=" text-emerald-100 text-center text-lg font-medium tracking-wider w-32 mb-4">
            {prova.disciplina.nome}
          </Text>
          <Text className=" text-emerald-100 text-center text-lg font-medium tracking-wider w-32 mb-4">
            {prova.assunto}
          </Text>
        </View>
        <View className=" h-96 mt-5 justify-center">
          {loading && (
            <View className=" flex-col bg-white self-center rounded-md p-5">
              <ActivityIndicator size={"large"} color={"green"} />
              <Text className="text-2xl font-bold text-black">
                Carregando Gabaritos...
              </Text>
            </View>
          )}

          {data && (
            <ScrollView horizontal={true} className="p-2">
              {data.variacoes.map((variacao: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setoptionsPanel(index + 1)}
                >
                  <View
                    key={index}
                    className=" bg-white w-52 h-80 m-3 rounded-md  items-center"
                  >
                    <View key={variacao.id} className=" items-center">
                      <View className=" p-3 bg-green-500 mb-2 rounded-b-md">
                        <Text className="text-black font-bold text-2xl">
                          {index + 1}º Variação
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Primeira coluna */}
                        <View style={{ flex: 1 }}>
                          {variacao.gabaritos.map(
                            (gabarito: any, index: number) => (
                              <View key={gabarito.id}>
                                {gabarito.questoes
                                  .slice(0, 10)
                                  .map((questao: any, index: number) => (
                                    <Text
                                      className="font-bold h-6 text-lg text-right"
                                      style={{ color: "black" }}
                                      key={questao.id}
                                    >
                                      {questao.numero}:{" "}
                                      {questao.respostaCorreta}
                                    </Text>
                                  ))}
                              </View>
                            )
                          )}
                        </View>

                        {/* Segunda coluna */}
                        <View style={{ flex: 1, marginLeft: 25 }}>
                          {variacao.gabaritos.map(
                            (gabarito: any, index: number) => (
                              <View key={gabarito.id}>
                                {gabarito.questoes
                                  .slice(10, 20)
                                  .map((questao: any, index: number) => (
                                    <Text
                                      className="font-bold h-6 text-lg"
                                      style={{ color: "black" }}
                                      key={questao.id}
                                    >
                                      {questao.numero}:{" "}
                                      {questao.respostaCorreta}
                                    </Text>
                                  ))}
                              </View>
                            )
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View className=" flex-column justify-center items-center">
          <TouchableOpacity className=" w-9/12 bg-green-600 rounded-md items-center mb-2 p-3">
            <Text className="text-xl  text-white  font-semibold">Corrigir</Text>
          </TouchableOpacity>
          <View className=" flex-row w-96 justify-center items-center">
            <TouchableOpacity
              className=" w-9/12 bg-red-500 rounded-md items-center p-3"
              onPress={handleClick}
            >
              <Text className="text-xl text-white font-semibold">
                Excluir Prova
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProvaInfoScreen;
