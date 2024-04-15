import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ProvaModel } from "@/models/ProvaModel";
import { Link } from "expo-router";

const ListaDeGabaritosScreen: React.FC<{ idProf: string }> = ({ idProf }) => {
  const [data, setData] = useState<ProvaModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = () => {
    if (loading) return;
    setLoading(true);
    const take = 20;
    const skip = (page - 1) * take + 1;
    const apiUrl = `${API_URL}/provas?professorId=${idProf}&take=${take}&skip=${skip}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        return response.json();
      })
      .then((newData: ProvaModel[]) => {
        if (newData.length === 0) {
          setLoading(false);
          return;
        }
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  };

  const renderItem = ({ item }: { item: ProvaModel }) => {
    const formatDate = (date: Date) => {
      const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
      return formattedDate;
    };

    return (
      <Link
        asChild
        href={{
          pathname: "home/(scan)/provaInfo",
          params: {
            id: item.id,
            nome: item.nome,
            disciplinaId: item.disciplinaId,
            disciplina: JSON.stringify(item.disciplina),
            assunto: item.assunto,
            nQuestoes: item.nQuestoes,
            nAlternativas: item.nAlternativas,
            nVariacoes: item.nVariacoes,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            variacoes: JSON.stringify(item.variacoes),
          },
        }}
      >
        <TouchableOpacity className=" rounded-lg bg-black m-4">
          <View className="p-5  justify-center items-center ">
            <Text className="text-white self-center text-3xl pl-2 pr-2 font-bold">
              {item.nome}
            </Text>
            <Text className="text-gray-300 text-xl"> {item.assunto}</Text>

            <View className="bg-white mt-5 mb-5 p-5 rounded-md w-full items-center">
              <Text className="text-black font-bold text-lg">
                Questões: {item.nQuestoes}
              </Text>
              <Text className="text-black font-bold text-lg">
                Alternativas: {item.nAlternativas}
              </Text>
              <Text className="text-black font-bold text-lg">
                Variações: {item.nVariacoes}
              </Text>
              <Text className="text-black font-bold text-lg">
                Criado em: {formatDate(new Date(item.createdAt))}
              </Text>
              <Text className="text-black font-bold text-lg">
                Disciplina: {item.disciplina.nome}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  const handleEndReached = () => {
    fetchData();
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
      {loading && <Text>Carregando...</Text>}
    </View>
  );
};

export default ListaDeGabaritosScreen;
