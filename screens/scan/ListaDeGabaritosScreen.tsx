import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ProvaModel } from "@/models/ProvaModel";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";

const ListaDeGabaritosScreen: React.FC<{ idProf: string; token: string }> = ({
  idProf,
  token,
}) => {
  const [data, setData] = useState<ProvaModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [semGabaritos, setSemGabaritos] = useState<boolean>(false);

  const [primeiraVerificacao, setPrimeiraVerificacao] =
    useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  function handleCriarGabarito() {
    router.replace("/home/(tabs)/scan");
    router.push("home/(scan)/criarProva");
  }

  const fetchData = () => {
    if (loading) return;
    setLoading(true);
    const take = 20;
    const skip = (page - 1) * take;
    const apiUrl = `${API_URL}/provas?professorId=${idProf}&take=${take}&skip=${skip}`;

    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case 404:
              if (primeiraVerificacao) {
                setLoading(false);
              } else {
                setSemGabaritos(true);
              }
              break;
            default:
              throw new Error("Erro ao buscar dados");
          }
        }
        return response.json();
      })
      .then((newData) => {
        if (!Array.isArray(newData)) {
          throw new Error("Os dados retornados não são um array.");
        }

        if (newData.length === 0) {
          setLoading(false);
          return;
        }
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
        setPrimeiraVerificacao(true);
        setLoading(false);
      })
      .catch((error) => {
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
        key={item.id}
      >
        <TouchableOpacity className=" rounded-lg bg-chumbo m-4">
          <View className="p-5 flex-row">
            <View className=" flex-col h-32 w-2/3 items-start justify-center">
              <Text className="text-white text-3xl pl-2 pr-2 font-bold">
                {item.nome}
              </Text>
              <Text className="text-gray-300 text-xl"> {item.assunto}</Text>
            </View>

            <View className="flex-col w-1/3 items-center">
              <Text className=" self-end text-gray-300 font-bold text-md mb-5">
                {formatDate(new Date(item.createdAt))}
              </Text>
              <View className="pl-5 items-center w-full">
                <Text className="text-white text-5xl font-bold">
                  {item.nQuestoes}
                </Text>
                <Text className="text-white">Questões</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  const handleEndReached = () => {
    fetchData();
  };

  const renderHeader = () => {
    return (
      <View className=" h-72 bg-black items-center justify-center">
        <LottieView
          source={require("@/assets/lotties/Provas.json")}
          style={{ width: 400, height: 280, bottom: 5 }}
          autoPlay
          loop
        />
        <Text className="text-white font-bold text-2xl bottom-7">
          Gerencie seus Gabaritos
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-ciano">
      {semGabaritos ? (
        <View className="h-80 items-center">
          {renderHeader()}
          <Text className="text-xl font-bold text-white w-64 text-center mt-10">
            Você ainda não possui nenhum Gabarito.
          </Text>
          <TouchableOpacity
            className="h-12 bg-white mt-10 rounded-lg justify-center"
            onPress={() => handleCriarGabarito()}
          >
            <Text className="m-2 font-bold text-xl">Criar Gabarito</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
          />
        </>
      )}

      {loading && (
        <View className=" p-3 flex-row space-x-5 items-center justify-center m-4 rounded-lg bg-white">
          <ActivityIndicator size={"large"} color={"black"} />
          <Text className=" text-xl font-bold">Carregando Gabaritos</Text>
        </View>
      )}
    </View>
  );
};

export default ListaDeGabaritosScreen;
