import React from "react";
import { useLocalSearchParams } from "expo-router";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
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

  const newRespostas = JSON.parse(respostas);
  const gabarito = [
    {
      questoes: {
        create: newRespostas.map((resposta: string, index: number) => ({
          numero: index + 1,
          resposta: resposta,
        })),
      },
    },
  ];

  let modelos = [];

  for (let i = 0; i < parseInt(index); i++) {
    modelos.push({ modelo: i + 1 });

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
      gabaritos: gabarito,
      index: parseInt(index) as number,
    };

    console.log(disciplinaFromParams.gabaritos);

    return <ConcluidoScreen {...disciplinaFromParams} />;
  }
};
export default selecionarVariacoes;
