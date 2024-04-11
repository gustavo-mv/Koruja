import { View, Text } from "react-native";
import React from "react";
import { CriarProvaInfoFinal } from "@/models/CriarProvaInfoFinal";

const ConcluidoScreen: React.FC<CriarProvaInfoFinal> = (prova) => {
  const [error, setError] = React.useState<string | null>(null);
  const [okMessage, setOkMessage] = React.useState("Carregando...");

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

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
          setOkMessage("Prova Criada!");
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

  return (
    <View className="h-full pt-10">
      {error && <Text>{error}</Text>}
      <Text>{okMessage}</Text>
    </View>
  );
};

export default ConcluidoScreen;
