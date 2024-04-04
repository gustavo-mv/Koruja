import { TouchableOpacity, Text, Modal, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface PropsStyleButtons {
  titulo: string;
  bg: string;
  icon: any;
  tipo:
    | "tipoDelete"
    | "tipoEdit"
    | "tipoHistoricoGabaritos"
    | "tipoHistoricoAtv";
  idTurma: string;
}

const ButtonHeaderHelp: React.FC<PropsStyleButtons> = ({
  titulo,
  bg,
  icon,
  tipo,
  idTurma,
}) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [deletar, setDeletar] = React.useState<boolean>(false);

  function handleClick() {
    if (tipo === "tipoDelete") {
      setDeletar(true);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/turmas/${idTurma}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao excluir a turma.");
      } else {
        router.replace("/home/(tabs)/turmas");
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
    <View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={deletar}
          onRequestClose={() => setDeletar(false)}
        >
          <View className=" bg-black/75 w-full h-full justify-center items-center">
            <View className="flex bg-white rounded-xl items-center w-80">
              <Text className="text-lg font-medium mb-5">
                Deseja realmente excluir a turma?
              </Text>
              <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
                <TouchableOpacity
                  onPress={() => handleDelete()}
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

      <TouchableOpacity
        onPress={handleClick}
        className={`flex-row w-44 rounded-lg m-1 h-12 items-center pl-2  `}
        style={{ backgroundColor: `${bg}` }}
      >
        <MaterialCommunityIcons name={`${icon}`} size={24} color="black" />
        <Text className="pl-3 w-32 font-medium">{titulo}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonHeaderHelp;
