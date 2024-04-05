import { View, Text } from "react-native";
import React from "react";
import { disciplinasObj } from "@/models/TurmaProps";
import HeaderDisciplina from "@/components/Turmas/Disciplinas/HeaderDisciplina";

const DisciplinaInfoScreen: React.FC<disciplinasObj> = (disciplina) => {
  return (
    <View>
      <HeaderDisciplina {...disciplina} />
      <Text>{disciplina.nome}</Text>
    </View>
  );
};

export default DisciplinaInfoScreen;
