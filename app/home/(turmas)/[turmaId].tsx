import { View } from "react-native";
import React from "react";
import TurmaInfoScreen from "@/screens/turmas/TurmaInfoScreen";
import { useLocalSearchParams } from "expo-router";

const Turma = () => {
  const params = useLocalSearchParams<{
    nome: string;
    turmaId: string;
    disciplinas: string;
    professorId: string;
  }>();

  console.log(params);

  // Inicializa disciplinasArray como array vazio
  let disciplinasArray = [];

  // Parse de params.disciplinas se estiver presente
  if (params.disciplinas) {
    disciplinasArray = JSON.parse(params.disciplinas);
  }

  // Verifica se todos os parâmetros necessários estão presentes
  if (params.nome && params.turmaId && params.professorId) {
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
  } else {
    // Renderiza null se qualquer parâmetro obrigatório estiver ausente
    return null;
  }
};

export default Turma;
