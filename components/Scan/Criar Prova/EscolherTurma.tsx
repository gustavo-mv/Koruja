import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text, ScrollView } from "react-native";

import CardPickDisciplina from "./CardPickDisciplina";

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
        <Text>
          Você não possui turmas ou disciplinas, crie na aba "Turmas".
        </Text>
      )}
    </ScrollView>
  );
};
export default EscolherTurma;
