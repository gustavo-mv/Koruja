import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React from "react";
import { TurmaProps } from "@/models/TurmaProps";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const CardPickDisciplina: React.FC<TurmaProps & { index: number }> = ({
  nome,
  disciplinas,
}) => {
  const [modalDisciplinasVisivel, setModalDisciplinasVisivel] =
    React.useState(false);

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
                      <Link
                        key={index}
                        asChild
                        href={{
                          pathname: "/home/(scan)/dadosProvaCriar",
                          params: {
                            turmaId: disciplina.turmaId,
                            disciplinaNome: disciplina.nome,
                            disciplinaId: disciplina.id,
                          },
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setModalDisciplinasVisivel(false)}
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
                      </Link>
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
                <TouchableOpacity className="h-12 w-40 bg-green-400 rounded-lg items-center justify-center">
                  <Text className=" font-semibold">Adicionar Disciplina</Text>
                </TouchableOpacity>
              </View>
            )}
            <View className=" bg-red-400 w-full h-14 justify-center items-center rounded-b-xl">
              <TouchableOpacity
                className="w-full items-center"
                onPress={() => setModalDisciplinasVisivel(false)}
              >
                <Text className=" text-black text-xl font-bold">Cancelar</Text>
              </TouchableOpacity>
            </View>
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
