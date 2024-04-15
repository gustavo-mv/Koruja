import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ProvaModel, Variacao } from "@/models/ProvaModel";
import ProvaInfoScreen from "@/screens/scan/ProvaInfoScreen";

const selecionarVariacoes = () => {
  const params = useLocalSearchParams<{
    id: string;
    nome?: string;
    disciplinaId?: string;
    disciplina: string;
    assunto?: string;
    nQuestoes?: string;
    nAlternativas?: string;
    nVariacoes: string;
    createdAt: string;
    updatedAt: string;
    variacoes: string;
  }>();

  if (!params) {
    return null;
  }

  const {
    id,
    nome,
    disciplinaId,
    disciplina,
    assunto,
    nQuestoes,
    nAlternativas,
    nVariacoes,
    createdAt,
    updatedAt,
    variacoes,
  } = params;

  if (
    !id ||
    !nome ||
    !disciplinaId ||
    !disciplina ||
    !assunto ||
    !nQuestoes ||
    !nAlternativas ||
    !nVariacoes ||
    !variacoes
  ) {
    return null;
  }

  const parsedNQuestoes = parseInt(nQuestoes);
  const parsedNAlternativas = parseInt(nAlternativas);
  const parsedNVariacoes = parseInt(nVariacoes);
  const createdAtDate = createdAt ? new Date(createdAt) : new Date();
  const updatedAtDate = updatedAt ? new Date(updatedAt) : new Date();

  const parsedVariacoes: Variacao[] = JSON.parse(variacoes);

  const prova: ProvaModel = {
    id: id,
    nome: nome,
    assunto: assunto,
    nQuestoes: parsedNQuestoes,
    nAlternativas: parsedNAlternativas,
    nVariacoes: parsedNVariacoes,
    disciplinaId: disciplinaId,
    createdAt: createdAtDate,
    updatedAt: updatedAtDate,
    variacoes: parsedVariacoes,
    disciplina: JSON.parse(disciplina),
  };

  return <ProvaInfoScreen {...prova} />;
};

export default selecionarVariacoes;
