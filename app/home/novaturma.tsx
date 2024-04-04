import React from "react";
import NovaTurmaForm from "@/screens/turmas/NovaTurmaForm";
import { useLocalSearchParams } from "expo-router";

const novaturma = () => {
  const { idProfessor } = useLocalSearchParams();
  if (!idProfessor) {
    return null;
  }
  return <NovaTurmaForm id={idProfessor.toString()} />;
};

export default novaturma;
