import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";
import { ProfId } from "@/models/ProfId";
import AuthContext from "@/app/AuthContext";

const NovaTurmaForm: React.FC<ProfId> = ({ id }) => {
  const [nome, setNome] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [createDisabled, setCreateDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (nome.length > 4) {
      setCreateDisabled(false);
    }
  }, [nome]);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  const handleChangeText = (nomeTurma: string) => {
    if (/^(?!.*\s{2,})(?!^\s)(?!.*\s\s$).*$/.test(nomeTurma)) {
      setNome(nomeTurma);
    }
  };

  const handleCreation = async () => {
    setCreateDisabled(true);

    try {
      const response = await fetch(`${API_URL}/turmas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: nome, professorId: id }),
      });

      if (!response.ok) {
        setError("Algo inesperado aconteceu, erro na criação de turma.");
        throw new Error("Erro na resposta da API /turmas");
      } else {
        router.replace("/home/(tabs)/turmas");
      }
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
        setError(e || "Erro ao fazer login");
      } else if (e instanceof Error) {
        e.message;
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-100 bg-ciano">
      <View className="mb-5 ">
        {error && (
          <Text className="text-center text-lg font-medium text-red-500">
            {error}
          </Text>
        )}
        <Text className="mb-2 text-sm text-white font-bold">Nome da Turma</Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5"
          placeholder="Exemplo: 8º Ano - Escola Nota 10"
          value={nome}
          onChangeText={handleChangeText}
          autoCapitalize="words"
        />
      </View>

      <TouchableOpacity
        className="w-32"
        disabled={createDisabled}
        onPress={handleCreation}
      >
        <Text
          className={` w-32 ${
            createDisabled ? "opacity-40" : "opacity-100"
          } bg-laranja text-gray-900  pt-1 rounded-xl h-10 text-lg font-bold text-center`}
        >
          Criar Turma
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NovaTurmaForm;
