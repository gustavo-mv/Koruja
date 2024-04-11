import React from "react";
import { useLocalSearchParams } from "expo-router";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
import MarcarGabaritoScreen from "@/screens/scan/MarcarGabaritoScreen";

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
    !index
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
    nVariacoes: parseInt(nVariacoes) as number,
    index: parseInt(index) as number,
  };

  {
    return <MarcarGabaritoScreen {...disciplinaFromParams} />;
  }
};

export default selecionarVariacoes;
