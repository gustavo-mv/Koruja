import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { CriarProvaInfoFinal } from "@/models/CriarProvaInfoFinal";
import { router } from "expo-router";

const ConcluidoScreen: React.FC<CriarProvaInfoFinal> = (prova) => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [okMessage, setOkMessage] = React.useState<null | string>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const animationConfetti = React.useRef<LottieView>(null);

  React.useEffect(() => {
    if (okMessage) {
      animationConfetti.current?.play(0, 241);
      setTimeout(() => {
        animationConfetti.current?.pause();
        animationConfetti.current?.play(241, 241);
      }, 6000);
    }
  }, [okMessage]);

  React.useEffect(() => {
    const handleCreation = async () => {
      try {
        const response = await fetch(`${API_URL}/provas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prova: {
              nome: prova.nomeProva,
              assunto: prova.assunto,
              nQuestoes: prova.nQuestoes,
              nAlternativas: prova.nAlternativas,
              nVariacoes: prova.nVariacoes,
              disciplinaId: prova.disciplinaId,
            },
            variacoes: prova.modelos,
            gabaritos: prova.gabaritos,
          }),
        });

        if (!response.ok) {
          setError("Algo inesperado aconteceu, erro na criação da prova.");
          throw new Error("Erro na resposta da API /criarProva");
        } else {
          setLoading(false);
          setOkMessage("Prova Criada com Sucesso!");
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
    handleCreation();
  }, []);

  const handleClick = () => {
    router.replace("home/(tabs)/scan");
    router.push("home/(scan)/listaDeGabaritos");
  };

  return (
    <View className="h-full items-center justify-center">
      {error && <Text>{error}</Text>}
      {loading && (
        <View className=" items-center h-full">
          <Text className=" w-52 text-center text-3xl font-bold mb-10">
            Carregando...
          </Text>
        </View>
      )}

      {okMessage && (
        <View className=" items-center">
          <LottieView
            loop={false}
            autoPlay={false}
            speed={0.8}
            ref={animationConfetti}
            source={require("../../assets/lotties/confetti.json")}
            style={{
              width: 650,
              height: 1000,
              top: -350,
              position: "absolute",
            }}
          />
          <LottieView
            speed={0.8}
            source={require("../../assets/lotties/JfzRlRaU4i.json")}
            style={{
              width: 450,
              height: 250,
              position: "absolute",
              bottom: 120,
            }}
            autoPlay
            loop
          />

          <Text className=" w-52 text-center text-3xl font-bold mb-10">
            {okMessage}
          </Text>
          <TouchableOpacity
            className=" bg-green-500 rounded-lg items-center p-5"
            onPress={handleClick}
          >
            <Text className=" font-bold text-lg">Conferir Lista de Provas</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ConcluidoScreen;
