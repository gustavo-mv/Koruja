import React from "react";
import DisciplinaInfoScreen from "@/screens/turmas/DisciplinaInfoScreen";
import { useLocalSearchParams } from "expo-router";
import { disciplinasObj } from "../../models/TurmaProps";

const novaturma = () => {
  let { disciplina } = useLocalSearchParams<{ disciplina: string }>();
  if (!disciplina) {
    return null;
  }

  let novaDisciplina = JSON.parse(disciplina) as disciplinasObj;
  return <DisciplinaInfoScreen {...novaDisciplina} />;
};

export default novaturma;
