import React from "react";
import InfoCriarQuestoesScreen from "@/screens/scan/InfoCriarQuestoesScreen";
import { useLocalSearchParams } from "expo-router";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";

const DadosProvaCriar = () => {
  const params = useLocalSearchParams<{
    turmaId: string;
    disciplinaNome: string;
    disciplinaId: string;
    turmaNome: string;
    nomeProva: string;
    assunto: string;
  }>();

  const disciplinaFromParams: CriarProvaInfo = {
    turmaId: params.turmaId as string,
    disciplinaNome: params.disciplinaNome as string,
    disciplinaId: params.disciplinaId as string,
    assunto: params.assunto as string,
    nomeProva: params.nomeProva as string,
  };

  {
    return <InfoCriarQuestoesScreen {...disciplinaFromParams} />;
  }
};

export default DadosProvaCriar;
