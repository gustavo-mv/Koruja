import { View, Text } from "react-native";
import React from "react";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import HeaderDisciplina from "@/components/Turmas/Disciplinas/HeaderDisciplina";
import { TurmaProps } from "../../models/TurmaProps";

const DisciplinaInfoScreen: React.FC<{
  turma: TurmaProps;
  disciplina: DisciplinasObj;
}> = ({ turma, disciplina }) => {
  return (
    <View>
      <HeaderDisciplina turma={turma} disciplina={disciplina} />
      <Text>oi</Text>
    </View>
  );
};

export default DisciplinaInfoScreen;
