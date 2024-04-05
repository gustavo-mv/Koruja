import { View } from "react-native";
import React from "react";
import TurmaInfoScreen from "@/screens/turmas/TurmaInfoScreen";
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
        <TurmaInfoScreen
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
