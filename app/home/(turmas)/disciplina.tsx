import React from "react";
import DisciplinaInfoScreen from "@/screens/turmas/DisciplinaInfoScreen";
import { useLocalSearchParams } from "expo-router";
import { DisciplinasObj } from "../../../models/DisciplinasObj";
import { TurmaProps } from "@/models/TurmaProps";

const disciplina = () => {
  let { index, turma, disciplina } = useLocalSearchParams<{
    index: string;
    turma: string;
    disciplina: string;
  }>();

  console.log(disciplina);

  if (!disciplina || !turma || !index) {
    return null;
  }
  let indexConvert = parseInt(index) as number;
  let novaDisciplina = JSON.parse(disciplina) as DisciplinasObj;
  let novaTurma = JSON.parse(turma) as TurmaProps;
  console.log(turma);

  return (
    <DisciplinaInfoScreen
      index={indexConvert}
      turma={novaTurma}
      disciplina={novaDisciplina}
    />
  );
};

export default disciplina;
