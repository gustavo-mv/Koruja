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
    respostas?: string;
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
    !index
  ) {
    return null;
  }
  if (respostas) {
    const disciplinaFromParams: CriarProvaInfo = {
      turmaId: turmaId as string,
      disciplinaNome: disciplinaNome as string,
      disciplinaId: disciplinaId as string,
      assunto: assunto as string,
      nomeProva: nomeProva as string,
      nQuestoes: parseInt(nQuestoes) as number,
      nAlternativas: parseInt(nAlternativas) as number,
      nVariacoes: parseInt(nVariacoes) as number,
      respostas: JSON.parse(respostas),
      index: parseInt(index) as number,
    };
    return <MarcarGabaritoScreen {...disciplinaFromParams} />;
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
    respostas: [],
    index: parseInt(index) as number,
  };

  {
    return <MarcarGabaritoScreen {...disciplinaFromParams} />;
  }
};

export default selecionarVariacoes;
