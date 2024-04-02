import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import SemTurmas from "./SemTurmas";
import CardTurma from "@/components/Turmas/CardTurma";
interface ListaTurmasProps {
  idProf: string | null;
}

const ListaTurmas: React.FC<ListaTurmasProps> = ({ idProf }) => {
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
        turmas.map((turma) => <CardTurma key={turma.id} nome={turma.nome} />)
      ) : (
        <SemTurmas />
      )}
    </View>
  );
};
export default ListaTurmas;
