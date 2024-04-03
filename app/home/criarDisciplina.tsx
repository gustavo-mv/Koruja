import { TurmaProps } from "@/models/TurmaProps";
import React from "react";
import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import CriarDisciplina from "@/components/Turmas/Disciplinas/CriarDisciplina";

const criarDisciplina = () => {
  const { idTurma } = useGlobalSearchParams();
  const turmaIdNumber: number = parseInt(idTurma as string);
  return <CriarDisciplina id={turmaIdNumber} />;
};

export default criarDisciplina;
