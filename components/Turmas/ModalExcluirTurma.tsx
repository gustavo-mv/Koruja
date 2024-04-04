import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";

const ModalExcluirTurma = (verdade) => {
  const [deletar, setDeletar] = React.useState<boolean>(verdade);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deletar}
        onRequestClose={() => setDeletar(false)}
      >
        console.log("venomextreme");
        <View className=" bg-black/75 w-full h-full justify-center items-center">
          <View className="flex bg-white rounded-xl items-center w-80">
            <Text className="text-lg font-medium mb-5">
              Deseja realmente excluir a turma?
            </Text>
            <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
              <TouchableOpacity className="flex-1 items-center    border-r-2 border-gray-400">
                <Text className="text-red-500 text-xl font-bold">Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 items-center"
                onPress={() => setDeletar(false)}
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

export default ModalExcluirTurma;
