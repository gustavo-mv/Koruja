import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

const CriarDisciplina = () => {
  const params = useLocalSearchParams<{
    nome: string;
    turmaId: string;
    disciplinas: string;
    professorId: string;
    vemPelaRotadeScan: string;
  }>();

  let disciplinasArray: any[];
  if (params.disciplinas) {
    disciplinasArray = JSON.parse(params.disciplinas);
  }

  const [nome, setNome] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [createDisabled, setCreateDisabled] = React.useState<boolean>(true);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleChangeText = (nomeDisciplina: string) => {
    if (/^(?!.*\s$)(?!^\s).*$/g.test(nomeDisciplina)) {
      setNome(nomeDisciplina);
    }
  };

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
        body: JSON.stringify({ nome: nome, turmaId: params.turmaId }),
      });

      if (!response.ok) {
        setError("Algo inesperado aconteceu, erro na criação de turma.");
        throw new Error("Erro na resposta da API /criarDisciplina");
      } else {
        const data = await response.json();

        if (params.vemPelaRotadeScan !== undefined) {
          router.replace("/home/(scan)/");
          router.push({
            pathname: "/home/(scan)/dadosProvaCriar",
            params: {
              turmaId: params.turmaId,
              disciplinaNome: nome,
              disciplinaId: data.id,
            },
          });
        } else {
          disciplinasArray.push({
            id: data.id,
            nome: nome,
            turmaId: params.turmaId,
          });
          router.replace("/home/(tabs)/turmas");
          router.push({
            pathname: "/home/(turmas)/[turmaId]",
            params: {
              nome: params.nome,
              turmaId: params.turmaId,
              disciplinas: JSON.stringify(disciplinasArray),
              professorId: params.professorId,
            },
          });
        }
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
          onChangeText={handleChangeText}
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
