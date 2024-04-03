import { View } from "react-native";
import React from "react";
import TurmaInfo from "@/components/Turmas/Disciplinas/TurmaInfo";
import { useGlobalSearchParams } from "expo-router";

const turma = () => {
  const { nome, turmaId, disciplinas, professorId } = useGlobalSearchParams();
  let numeroConv: number[] = [];
  if (Array.isArray(disciplinas)) {
    numeroConv = disciplinas.map((str) => parseInt(str, 10));
  }

  if (
    typeof nome === "string" &&
    typeof turmaId === "string" &&
    typeof numeroConv === "object" &&
    typeof professorId === "string"
  ) {
    return (
      <View>
        <TurmaInfo
          nome={nome}
          id={turmaId}
          disciplinas={numeroConv}
          professorId={professorId}
        />
      </View>
    );
  } else return null;
};

export default turma;
