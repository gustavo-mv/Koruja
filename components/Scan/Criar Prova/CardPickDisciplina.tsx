import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React from "react";
import { TurmaProps } from "@/models/TurmaProps";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import AuthContext from "@/app/AuthContext";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CardPickDisciplina: React.FC<TurmaProps & { index: number }> = ({
  nome,
  id,
  disciplinas,
  professorId,
}) => {
  const [modalDisciplinasVisivel, setModalDisciplinasVisivel] =
    React.useState(false);
  const [modalContaFree, setModalContaFree] = React.useState(false);
  const [modalForbidden, setmodalForbidden] = React.useState(false);

  const [turmaIdFree, setTurmaIdFree] = React.useState<string | null>(null);
  const [idFree, setIdFree] = React.useState<string | null>(null);
  const [nomeFree, setNomeFree] = React.useState<string | null>(null);

  const { userGlobalData } = React.useContext(AuthContext);

  function handleClick(turmaIdFunc: any, nomeFunc: any, idFunc: any) {
    if (
      userGlobalData?.tipo === "free" &&
      userGlobalData.provasGeradas < userGlobalData.nLimiteProvasFree
    ) {
      setIdFree(idFunc);
      setTurmaIdFree(turmaIdFunc);
      setNomeFree(nomeFunc);

      setModalDisciplinasVisivel(false);
      setModalContaFree(true);
    } else if (
      userGlobalData?.tipo === "free" &&
      userGlobalData.provasGeradas >= userGlobalData.nLimiteProvasFree
    ) {
      setModalDisciplinasVisivel(false);
      setmodalForbidden(true);
    } else {
      setModalDisciplinasVisivel(false);
      router.push({
        pathname: "/home/(scan)/dadosProvaCriar",
        params: {
          turmaId: turmaIdFunc,
          disciplinaNome: nomeFunc,
          disciplinaId: idFunc,
        },
      });
    }
  }

  function handleContinueFree() {
    setModalDisciplinasVisivel(false);

    router.push({
      pathname: "/home/(scan)/dadosProvaCriar",
      params: {
        turmaId: turmaIdFree,
        disciplinaNome: nomeFree,
        disciplinaId: idFree,
      },
    });
  }

  function handleCloseFreeModal() {
    setModalContaFree(false);
    setIdFree(null);
    setTurmaIdFree(null);
    setTurmaIdFree(null);
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalDisciplinasVisivel}
        onRequestClose={() => setModalDisciplinasVisivel(false)}
      >
        <View className=" bg-black/75 w-full h-full justify-center items-center">
          <View className="flex justify-end h-96 bg-gray-200 rounded-xl items-center w-80">
            {disciplinas.length > 0 ? (
              <View className="h-96 items-center mb-5">
                <Text className=" bg-black w-80 text-center h-16 pt-4 mt-5 rounded-xl text-white text-2xl font-medium">
                  Escolha a Disciplina:
                </Text>
                <ScrollView>
                  {disciplinas.map((disciplina, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleClick(
                            disciplina.turmaId,
                            disciplina.nome,
                            disciplina.id
                          )
                        }
                        className=" flex-row pt-3 pb-3 h-20 m-3 items-center space-x-20 pr-2 justify-center pl-3 bg-green-600 w-72 rounded-md"
                        key={disciplina.id}
                      >
                        <Text className="font-bold text-white text-xl w-40">
                          {disciplina.nome}
                        </Text>
                        <AntDesign
                          name="rightcircleo"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <View className=" flex-col justify-center items-center mb-20">
                <Text className="text-2xl w-72 text-center font-medium mb-5">
                  {" "}
                  Não foram encontradas Disciplinas nessa Turma
                </Text>
                <TouchableOpacity
                  className="h-12 w-40 bg-green-400 rounded-lg items-center justify-center"
                  onPress={() => {
                    router.replace({
                      pathname: "/home/(turmas)/criarDisciplina",
                      params: {
                        nome: nome,
                        turmaId: id,
                        professorId: professorId,
                        vemPelaRotadeScan: 1,
                      },
                    });
                  }}
                >
                  <Text className=" font-semibold">Adicionar Disciplina</Text>
                </TouchableOpacity>
              </View>
            )}
            <View className=" bg-red-400 w-full h-14 justify-center items-center rounded-b-xl">
              <TouchableOpacity
                className="w-full items-center"
                onPress={() => setModalDisciplinasVisivel(false)}
              >
                <Text className=" text-white text-xl font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalContaFree}
        onRequestClose={() => setModalContaFree(false)}
      >
        <View className=" bg-black/75 w-full h-full justify-center items-center">
          <View className="bg-white w-80 items-center rounded-lg pt-5">
            <View className="self-end  space-x-14 pr-5 flex-row">
              <Text className="text-3xl font-bold">Atenção</Text>
              <AntDesign
                name="closecircle"
                size={30}
                color="red"
                style={{}}
                onPress={() => handleCloseFreeModal()}
              />
            </View>
            <LottieView
              autoPlay
              speed={0.8}
              style={{
                width: 240,
                height: 240,
              }}
              source={require("@/assets/lotties/attention.json")}
            />
            <Text className="text-center font-medium pl-3 pr-3 text-lg">
              Sua conta está no{" "}
              <Text className="font-extrabold text-green-700">
                Nível Gratuito
              </Text>
              . Você pode criar apenas{" "}
              <Text className="font-extrabold">
                {userGlobalData.nLimiteProvasFree} provas{" "}
              </Text>
              por mês.
            </Text>
            <Text className="text-xl font-bold mt-5">
              Provas Criadas: <Text>{userGlobalData?.provasGeradas}</Text>
            </Text>
            <TouchableOpacity
              className="bg-green-400 w-full rounded-b-lg mt-5"
              onPress={() => handleContinueFree()}
            >
              <Text className="font-bold text-xl text-center m-3 ">
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-yellow-300 mt-8 flex-row space-x-5 p-3 rounded-lg">
            <Text className="text-xl font-bold">Adquirir Assinatura</Text>
            <FontAwesome5 name="crown" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalForbidden}
        onRequestClose={() => setmodalForbidden(false)}
      >
        <View className=" bg-black/75 w-full h-full justify-center items-center">
          <View className="bg-white w-80 items-center rounded-lg pt-5">
            <View className="self-end  space-x-14 pr-5 flex-row">
              <Text className="text-3xl font-bold">Atenção</Text>
              <AntDesign
                name="closecircle"
                size={30}
                color="red"
                style={{}}
                onPress={() => handleCloseFreeModal()}
              />
            </View>
            <LottieView
              autoPlay
              speed={0.8}
              style={{
                width: 240,
                height: 240,
              }}
              source={require("@/assets/lotties/sadCard.json")}
            />
            <Text className="text-center font-medium pl-3 pr-3 text-lg">
              Você atingiu o limite de criação de provas do{" "}
              <Text className="font-extrabold text-green-700">
                Nível Gratuito
              </Text>
              . Você pode criar apenas{" "}
              <Text className="font-extrabold">
                {userGlobalData.nLimiteProvasFree} provas{" "}
              </Text>
              por mês.
            </Text>

            <TouchableOpacity className="bg-yellow-300 flex-row space-x-5 p-3 justify-center rounded-b-lg items-center mt-5 w-full">
              <Text className="text-xl font-bold">Adquirir Assinatura</Text>
              <FontAwesome5 name="crown" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalDisciplinasVisivel(true)}
        className=" self-center rounded-md bg-green-500 h-24 mb-5 w-11/12 items-center justify-center"
      >
        <Text className=" text-black text-3xl w-60 text-center font-bold">
          {nome}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardPickDisciplina;
