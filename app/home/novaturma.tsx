import React from "react";
import NovaTurmaForm from "@/components/Turmas/NovaTurmaForm";
import { useLocalSearchParams } from "expo-router";

const novaturma = () => {
  const { idProfessor } = useLocalSearchParams();
  if (!idProfessor) {
    return null;
  }
  return <NovaTurmaForm id={idProfessor.toString()} />;
};

export default novaturma;
