import { View, Text } from "react-native";
import React from "react";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import ButtonHeaderHelpDisciplina from "./ButtonHeaderHelpDisciplina";
import { TurmaProps } from "@/models/TurmaProps";

const HeaderDisciplina: React.FC<{
  disciplina: DisciplinasObj;
  turma: TurmaProps;
}> = ({ disciplina, turma }) => {
  return (
    <View className=" bg-black rounded-b-3xl pb-5 z-50">
      <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
        {disciplina.nome}
      </Text>
      <View className=" flex-column justify-center items-center">
        <View className=" flex-row w-96 justify-center items-center">
          <ButtonHeaderHelpDisciplina
            titulo="Editar Nome"
            bg="#f7ee6d"
            icon="lead-pencil"
            tipo="tipoEdit"
            idDisc={disciplina.id}
            nomeDisc={disciplina.nome}
            turmaId={disciplina.turmaId}
            turma={turma}
          />
          <ButtonHeaderHelpDisciplina
            titulo="Gabaritos"
            icon="qrcode-scan"
            bg="#57dff7"
            tipo="tipoHistoricoGabaritos"
            idDisc={disciplina.id}
            nomeDisc={disciplina.nome}
            turmaId={disciplina.turmaId}
            turma={turma}
          />
        </View>
        <View>
          <View className="flex-row">
            <ButtonHeaderHelpDisciplina
              titulo="Atividades"
              icon="note-multiple-outline"
              bg="#ffa754"
              tipo="tipoHistoricoAtv"
              idDisc={disciplina.id}
              nomeDisc={disciplina.nome}
              turmaId={disciplina.turmaId}
              turma={turma}
            />
            <ButtonHeaderHelpDisciplina
              titulo="Excluir Disciplina"
              icon="delete"
              bg="#fa5f81"
              tipo="tipoDelete"
              idDisc={disciplina.id}
              nomeDisc={disciplina.nome}
              turmaId={disciplina.turmaId}
              turma={turma}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderDisciplina;
