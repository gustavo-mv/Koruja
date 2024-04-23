import React from "react";
import { useLocalSearchParams } from "expo-router";
import ConcluidoScreen from "@/screens/scan/ConcluidoScreen";
import { CriarProvaInfoFinal } from "@/models/CriarProvaInfoFinal";

const selecionarVariacoes = () => {
  const params = useLocalSearchParams<{
    turmaId?: string;
    disciplinaNome?: string;
    disciplinaId?: string;
    nomeProva?: string;
    assunto?: string;
    nQuestoes?: string;
    nAlternativas?: string;
    nVariacoes: string;
    respostas: string;
    index: string;
  }>();

  if (!params) {
    return null;
  }

  const {
    turmaId,
    disciplinaNome,
    disciplinaId,
    assunto,
    nomeProva,
    nQuestoes,
    nAlternativas,
    nVariacoes,
    respostas,
    index,
  } = params;

  if (
    !turmaId ||
    !disciplinaNome ||
    !disciplinaId ||
    !assunto ||
    !nomeProva ||
    !nQuestoes ||
    !nAlternativas ||
    !nVariacoes ||
    !respostas ||
    !index
  ) {
    return null;
  }

  const parsedRespostas = JSON.parse(respostas);
  let modelos = [];

  for (let i = 1; i < parseInt(index); i++) {
    modelos.push({ modelo: i });
  }
  const disciplinaFromParams: CriarProvaInfoFinal = {
    turmaId: turmaId as string,
    disciplinaNome: disciplinaNome as string,
    disciplinaId: disciplinaId as string,
    assunto: assunto as string,
    nomeProva: nomeProva as string,
    nQuestoes: parseInt(nQuestoes) as number,
    nAlternativas: parseInt(nAlternativas) as number,
    nVariacoes: parseInt(nVariacoes) as number,
    modelos: modelos,
    gabaritos: parsedRespostas,
    index: parseInt(index) as number,
  };

  console.log(disciplinaFromParams);

  return <ConcluidoScreen {...disciplinaFromParams} />;
};
export default selecionarVariacoes;
