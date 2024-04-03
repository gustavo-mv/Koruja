import { View } from "react-native";
import React from "react";
import TurmaInfo from "@/components/Turmas/Disciplinas/TurmaInfo";
import { useGlobalSearchParams } from "expo-router";

const turma = () => {
  const { nome, turmaId, disciplinas, professorId } = useGlobalSearchParams();

  const isStringArray = (value: unknown): value is string[] => {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  };

  if (
    typeof nome === "string" &&
    typeof turmaId === "string" &&
    isStringArray(disciplinas) &&
    typeof professorId === "string"
  ) {
    return (
      <View>
        <TurmaInfo
          nome={nome}
          id={turmaId}
          disciplinas={disciplinas}
          professorId={professorId}
        />
      </View>
    );
  } else return null;
};

export default turma;
