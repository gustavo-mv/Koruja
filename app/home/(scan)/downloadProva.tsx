import React from "react";
import { useLocalSearchParams } from "expo-router";
import { DisciplinaInfo } from "@/models/DisciplinaInfo";
import DownloadGabarito from "@/screens/scan/DownloadGabarito";

const DadosProvaCriar = () => {
  const params = useLocalSearchParams<{
    variacaoId: string;
  }>();
  const variacaoId = params.variacaoId as string;

  {
    return <DownloadGabarito variacaoId={variacaoId} />;
  }
};

export default DadosProvaCriar;
