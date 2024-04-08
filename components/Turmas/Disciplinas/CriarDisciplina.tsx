import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

const CriarDisciplina = () => {
  const { turmaId } = useLocalSearchParams<{
    turmaId: string;
  }>();
  const [nome, setNome] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [createDisabled, setCreateDisabled] = React.useState<boolean>(true);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    if (nome.length > 4) {
      setCreateDisabled(false);
    }
  }, [nome]);

  const handleCreation = async () => {
    setCreateDisabled(true);
    try {
      const response = await fetch(`${API_URL}/disciplinas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome, turmaId: turmaId }),
      });

      if (!response.ok) {
        setError("Algo inesperado aconteceu, erro na criação de turma.");
        throw new Error("Erro na resposta da API /criarDisciplina");
      } else {
        router.replace("/home/(tabs)/turmas");
      }
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
        setError(e || "Erro ao cadastrar Disciplina");
      } else if (e instanceof Error) {
        e.message;
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-100 h-96">
      <View className="mb-5 ">
        {error && (
          <Text className="text-center text-lg font-medium text-red-500">
            {error}
          </Text>
        )}
        <Text className="mb-2 text-sm font-medium text-gray-900">
          Nome da Disciplina:
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5"
          placeholder="Exemplo: Matématica"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
      </View>

      <TouchableOpacity
        className=""
        disabled={createDisabled}
        onPress={handleCreation}
      >
        <Text
          className={`  ${
            createDisabled ? "opacity-40" : "opacity-100"
          } bg-green-500 text-gray-900  rounded-xl p-3 text-xl font-bold text-center`}
        >
          Adicionar Disciplina
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CriarDisciplina;
