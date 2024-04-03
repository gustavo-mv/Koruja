import { View } from "react-native";
import React from "react";
import TurmaInfo from "@/components/Turmas/Disciplinas/TurmaInfo";
import { useGlobalSearchParams } from "expo-router";

const turma = () => {
  const { nome, turmaId } = useGlobalSearchParams();
  const nomeString: string = nome as string;
  const turmaIdNumber: number = parseInt(turmaId as string);

  return (
    <View>
      <TurmaInfo nome={nomeString} id={turmaIdNumber} />
    </View>
  );
};

export default turma;
