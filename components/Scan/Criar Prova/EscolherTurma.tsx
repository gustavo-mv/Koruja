import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text } from "react-native";

import CardTurma from "@/components/Turmas/CardTurma";

const ListaTurmas: React.FC<{ idProf: string }> = ({ idProf }) => {
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
    <View className="w-full mb-10">
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : turmas.length > 0 ? (
        turmas.map((turma, index) => (
          <CardTurma
            key={turma.id}
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
    </View>
  );
};
export default ListaTurmas;
