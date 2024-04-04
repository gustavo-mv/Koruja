import React from "react";
import { useLocalSearchParams } from "expo-router";
import CriarDisciplina from "@/components/Turmas/Disciplinas/CriarDisciplina";

const criarDisciplina = () => {
  const { turmaId } = useLocalSearchParams<{
    turmaId: string;
  }>();
  if (typeof turmaId === "string") {
    return <CriarDisciplina id={turmaId} />;
  } else return null;
};

export default criarDisciplina;
