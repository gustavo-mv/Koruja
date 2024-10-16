import { TouchableOpacity, Text, Modal, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import AuthContext from "@/app/AuthContext";

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
  nomeTurma: string;
  professorId: string;
  disciplinas: DisciplinasObj[];
}

const ButtonHeaderHelp: React.FC<PropsStyleButtons> = ({
  titulo,
  bg,
  icon,
  tipo,
  idTurma,
  nomeTurma,
  disciplinas,
  professorId,
}) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [deletar, setDeletar] = React.useState<boolean>(false);
  const [editar, setEditar] = React.useState<string>(nomeTurma);
  const [editarView, setEditarView] = React.useState<boolean>(false);
  const [editarDisabled, setEditarDisabled] = React.useState<boolean>(true);
  const [backDisabled, setBackDisabled] = React.useState<boolean>(false);
  const { token } = React.useContext(AuthContext);

  const [editarLottie, setEditarLottie] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (editar === "" || editar === nomeTurma) {
      setEditarDisabled(true);
    }
  }, [editar]);

  const animationDel = React.useRef<LottieView>(null);
  const animationEdit = React.useRef<LottieView>(null);

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
    if (editarLottie === true) {
      animationEdit.current?.play(0, 71);

      setTimeout(() => {
        animationEdit.current?.pause();
        animationEdit.current?.play(71, 71);
      }, 2000);
    }
    [editarLottie];
  });

  function handleClick() {
    if (tipo === "tipoDelete") {
      setDeletar(true);
    }
    if (tipo === "tipoEdit") {
      setEditarView(true);
    }
    if (tipo === "tipoHistoricoGabaritos") {
      router.push("home/(scan)/listaDeGabaritos");
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/turmas/${idTurma}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    setEditarDisabled(true);
    setBackDisabled(true);
    setEditarLottie(true);
    try {
      const response = await fetch(`${API_URL}/turmas/${idTurma}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: editar,
        }),
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao editar a turma.");
      } else {
        router.replace("/home/(tabs)/turmas");
        router.push({
          pathname: "/home/(turmas)/[turmaId]",
          params: {
            nome: editar,
            turmaId: idTurma,
            disciplinas: JSON.stringify(disciplinas),
            professorId: professorId,
          },
        });
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
                Deseja realmente excluir a Turma?
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
            <View className="flex justify-end bg-white rounded-xl h-72 w-80 overflow-hidden">
              {!editarLottie ? (
                <LottieView
                  autoPlay
                  style={{
                    width: 350,
                    height: 350,
                    position: "absolute",
                    bottom: 40,
                    left: -10,
                  }}
                  source={require("@/assets/lotties/editar.json")}
                />
              ) : (
                <LottieView
                  loop={false}
                  autoPlay={false}
                  ref={animationEdit}
                  style={{
                    width: 150,
                    height: 150,
                    position: "absolute",
                    top: 10,
                    left: 85,
                  }}
                  source={require("@/assets/lotties/checked.json")}
                />
              )}

              <Text className="block text-left pl-3 mb-2 text-lg font-medium text-gray-900 dark:text-white">
                Editar Nome:
              </Text>
              <TextInput
                className=" font-bold text-center bg-yellow-200 border border-gray-300 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                value={editar}
                onChangeText={(value) => {
                  setEditar(value);
                  setEditarDisabled(false);
                }}
              />
              <View className="flex-row bg-gray-200 w-80 h-14 justify-center items-center rounded-b-xl">
                <TouchableOpacity
                  disabled={editarDisabled}
                  onPress={() => handleEdit()}
                  className={`${
                    editarDisabled ? "opacity-50" : ""
                  } flex-1 items-center bg-green-500 h-14 text-center justify-center border-r-2 border-gray-400`}
                >
                  <Text className={`text-white text-xl font-bold`}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={backDisabled}
                  className={`${
                    backDisabled ? "opacity-50" : ""
                  } flex-1 items-center`}
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

export default ButtonHeaderHelp;
