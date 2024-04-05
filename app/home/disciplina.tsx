import React from "react";
import DisciplinaInfoScreen from "@/screens/turmas/DisciplinaInfoScreen";
import { useLocalSearchParams } from "expo-router";
import { DisciplinasObj } from "../../models/DisciplinasObj";
import { TurmaProps } from "@/models/TurmaProps";

const disciplina = () => {
  let { turma, disciplina } = useLocalSearchParams<{
    turma: string;
    disciplina: string;
  }>();

  console.log(disciplina);

  if (!disciplina || !turma) {
    return null;
  }

  let novaDisciplina = JSON.parse(disciplina) as DisciplinasObj;
  let novaTurma = JSON.parse(turma) as TurmaProps;
  console.log(turma);

  return <DisciplinaInfoScreen turma={novaTurma} disciplina={novaDisciplina} />;
};

export default disciplina;
