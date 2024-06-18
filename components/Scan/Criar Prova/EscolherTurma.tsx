import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import CardPickDisciplina from "./CardPickDisciplina";
import { router } from "expo-router";

const EscolherTurma: React.FC<{ idProf: string }> = ({ idProf }) => {
  const [turmas, setTurmas] = React.useState<TurmaProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  React.useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const response = await fetch(`${API_URL}/turmas/prof/${idProf}`);
      const data = await response.json();
      setTurmas(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="bg-black w-full h-full  ">
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : turmas.length > 0 ? (
        turmas.map((turma, index) => (
          <CardPickDisciplina
            key={turma.id}
            index={index}
            id={turma.id}
            nome={turma.nome}
            professorId={idProf}
            disciplinas={turma.disciplinas}
          />
        ))
      ) : (
        <View className="w-full items-center">
          <Text className="text-white w-80 text-center mt-10 text-xl font-bold">
            Você ainda não criou nenhuma turma.
          </Text>
          <TouchableOpacity
            className="bg-green-500 rounded-md w-40 h-12 items-center justify-center mt-10"
            onPress={() => {
              router.replace({
                pathname: "/home/(turmas)/novaturma",
                params: { idProfessor: idProf },
              });
            }}
          >
            <Text className="text-white font-extrabold text-center text-xl">
              Criar Turma
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
export default EscolherTurma;
