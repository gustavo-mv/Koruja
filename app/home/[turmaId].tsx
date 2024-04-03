import { View } from "react-native";
import React from "react";
import TurmaInfo from "@/components/Turmas/Disciplinas/TurmaInfo";
import { useLocalSearchParams } from "expo-router";

const turma = () => {
  const params = useLocalSearchParams<{
    nome: string;
    turmaId: string;
    disciplinas: string;
    professorId: string;
  }>();

  let disciplinasArray;
  if (params.disciplinas) {
    disciplinasArray = JSON.parse(params.disciplinas);
  }
  if (
    params.nome &&
    params.turmaId &&
    params.disciplinas &&
    params.professorId
  ) {
    return (
      <View>
        <TurmaInfo
          nome={params.nome}
          id={params.turmaId}
          disciplinas={disciplinasArray}
          professorId={params.professorId}
        />
      </View>
    );
  } else return null;
};

export default turma;
