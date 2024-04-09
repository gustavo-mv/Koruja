import React from "react";
import DadosProvaCriarScreen from "@/screens/scan/DadosProvaCriarScreen";
import { useLocalSearchParams } from "expo-router";
import { DisciplinaInfo } from "@/models/DisciplinaInfo";

const DadosProvaCriar = () => {
  const params = useLocalSearchParams<{
    turmaId: string;
    disciplinaNome: string;
    disciplinaId: string;
    turmaNome: string;
  }>();

  const disciplinaFromParams: DisciplinaInfo = {
    turmaId: params.turmaId as string,
    disciplinaNome: params.disciplinaNome as string,
    disciplinaId: params.disciplinaId as string,
    turmaNome: params.turmaNome as string,
  };

  {
    return <DadosProvaCriarScreen {...disciplinaFromParams} />;
  }
};

export default DadosProvaCriar;
