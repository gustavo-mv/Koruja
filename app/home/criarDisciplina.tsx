import React from "react";
import { useGlobalSearchParams } from "expo-router";
import CriarDisciplina from "@/components/Turmas/Disciplinas/CriarDisciplina";

const criarDisciplina = () => {
  const { idTurma } = useGlobalSearchParams();
  if (typeof idTurma === "string") {
    return <CriarDisciplina id={idTurma} />;
  } else return null;
};

export default criarDisciplina;
