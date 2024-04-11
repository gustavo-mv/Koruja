import React from "react";
import SelecionarVariacoesScreen from "@/screens/scan/SelecionarVariacoesScreen";
import { useLocalSearchParams } from "expo-router";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";

const selecionarVariacoes = () => {
  const params = useLocalSearchParams<{
    turmaId?: string;
    disciplinaNome?: string;
    disciplinaId?: string;
    nomeProva?: string;
    assunto?: string;
    nQuestoes?: string;
    nAlternativas?: string;
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
  } = params;

  if (
    !turmaId ||
    !disciplinaNome ||
    !disciplinaId ||
    !assunto ||
    !nomeProva ||
    !nQuestoes ||
    !nAlternativas
  ) {
    return null;
  }

  const disciplinaFromParams: CriarProvaInfo = {
    turmaId: turmaId as string,
    disciplinaNome: disciplinaNome as string,
    disciplinaId: disciplinaId as string,
    assunto: assunto as string,
    nomeProva: nomeProva as string,
    nQuestoes: parseInt(nQuestoes) as number,
    nAlternativas: parseInt(nAlternativas) as number,
  };

  {
    return <SelecionarVariacoesScreen {...disciplinaFromParams} />;
  }
};

export default selecionarVariacoes;
