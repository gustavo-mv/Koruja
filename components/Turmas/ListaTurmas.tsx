import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text } from "react-native";
import SemTurmas from "./SemTurmas";
import CardTurma from "@/components/Turmas/CardTurma";
import AuthContext from "@/app/AuthContext";

interface ListaTurmasProps {
  idProf: string;
}

const ListaTurmas: React.FC<ListaTurmasProps> = ({ idProf }) => {
  const [turmas, setTurmas] = React.useState<TurmaProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  React.useEffect(() => {
    fetchDados();
  }, []);

  const fetchDados = async () => {
    try {
      const response = await fetch(`${API_URL}/turmas/prof/${idProf}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }

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
        <SemTurmas />
      )}
    </View>
  );
};
export default ListaTurmas;
