import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import React from "react";
import { TurmaProps } from "@/models/TurmaProps";
import { AntDesign } from "@expo/vector-icons";

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
              <View className="h-80 items-center mb-6">
                <Text className=" bg-black w-80 text-center h-12 pt-2 rounded-xl text-white text-lg font-medium">
                  Escolha a Disciplina:
                </Text>
                <ScrollView>
                  {disciplinas.map((disciplina) => {
                    return (
                      <TouchableOpacity
                        className=" flex-row pt-3 space-x-28 pr-2 justify-center pl-3 bg-white w-72 m-2 h-12 rounded-md"
                        key={disciplina.id}
                      >
                        <Text className="font-bold w-32">
                          {disciplina.nome}
                        </Text>
                        <AntDesign
                          name="rightcircleo"
                          size={24}
                          color="green"
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
