import { TouchableOpacity, Text, Modal, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { TurmaProps } from "@/models/TurmaProps";

interface ButtonsProp {
  titulo: string;
  bg: string;
  icon: any;
  tipo:
    | "tipoDelete"
    | "tipoEdit"
    | "tipoHistoricoGabaritos"
    | "tipoHistoricoAtv";
  idDisc: string;
  nomeDisc: string;
  turmaId: string;
  index: number;
}

const ButtonHeaderHelpDisciplina: React.FC<
  ButtonsProp & { turma: TurmaProps }
> = ({ titulo, bg, icon, tipo, idDisc, nomeDisc, turmaId, turma, index }) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [deletar, setDeletar] = React.useState<boolean>(false);
  const [nomeEdit, setNomeEdit] = React.useState<string>(nomeDisc);
  const [editarView, setEditarView] = React.useState<boolean>(false);
  const [editarDisabled, setEditarDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (nomeEdit === "" || nomeEdit === nomeDisc) {
      setEditarDisabled(true);
    }
  }, [nomeEdit]);

  const animationDel = React.useRef<LottieView>(null);

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

  function handleClick() {
    if (tipo === "tipoDelete") {
      setDeletar(true);
    }
    if (tipo === "tipoEdit") {
      setEditarView(true);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/disciplinas/${idDisc}`, {
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

  const handleEdit = async () => {
    try {
      const response = await fetch(`${API_URL}/disciplinas/${idDisc}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nomeEdit,
        }),
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao editar a turma.");
      } else {
        turma.disciplinas[index].nome = nomeEdit;
        router.replace("/home/(tabs)/turmas");
        router.push({
          pathname: "/home/(turmas)/[turmaId]",
          params: {
            nome: turma.nome,
            turmaId: turmaId,
            disciplinas: JSON.stringify(turma.disciplinas),
            professorId: turma.professorId,
          },
        });
        router.push({
          pathname: "/home/(turmas)/disciplina",
          params: {
            index: index,
            disciplina: JSON.stringify({
              nome: nomeEdit,
              id: idDisc,
              turmaId: turmaId,
            }),
            turma: JSON.stringify({ turma }),
          },
        });
      }
    } catch (e) {
      if (typeof e === "string") {
        throw new Error("Ocorreu um erro no servidor." + e);
      } else if (e instanceof Error) {
        throw new Error("Ocorreu um erro no servidor." + e);
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
              <Text className="text-lg font-medium mb-5">
                Deseja realmente excluir a turma?
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

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={editarView}
          onRequestClose={() => setEditarView(false)}
        >
          <View className=" bg-black/75 w-full h-full justify-center items-center">
            <View className="flex bg-white rounded-xl items-center  w-80 overflow-hidden mb-20">
              <LottieView
                autoPlay
                style={{
                  padding: 0,
                  margin: 0,
                  width: 350,
                  height: 350,
                }}
                source={require("@/assets/lotties/editar.json")}
              />
              <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bottom-10">
                Editar Nome
              </Text>
              <TextInput
                className=" font-bold text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg bottom-10 focus:ring-green-500 focus:border-green-500 block w-80 p-2.5"
                value={nomeEdit}
                onChangeText={(value) => {
                  setNomeEdit(value);
                  setEditarDisabled(false);
                }}
              />
              <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
                <TouchableOpacity
                  disabled={editarDisabled}
                  onPress={() => handleEdit()}
                  className={`${editarDisabled ? "opacity-50" : ""} ${
                    nomeEdit === nomeDisc ? "opacity-50" : ""
                  } 
                  ${nomeEdit === "" ? "opacity-70" : ""}
                  flex-1 items-center bg-green-500 h-14 text-center justify-center border-r-2 border-gray-400`}
                >
                  <Text className={`text-white text-xl font-bold`}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 items-center"
                  onPress={() => setEditarView(false)}
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

export default ButtonHeaderHelpDisciplina;
