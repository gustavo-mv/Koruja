import { View } from "react-native";
import React from "react";
import TurmaInfo from "@/components/Turmas/Disciplinas/TurmaInfo";
import { useGlobalSearchParams } from "expo-router";

const turma = () => {
  const { nome, turmaId, disciplinas, professorId } = useGlobalSearchParams();

  if (
    typeof nome === "string" &&
    typeof turmaId === "string" &&
    typeof disciplinas === "number" &&
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
