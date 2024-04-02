import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

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
    <TouchableOpacity>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : turmas.length > 0 ? (
        <FlatList
          data={turmas}
          renderItem={({ item }) => <Text>{item.nome}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>O professor não tem turmas cadastradas.</Text>
      )}
    </TouchableOpacity>
  );
};
export default ListaTurmas;
