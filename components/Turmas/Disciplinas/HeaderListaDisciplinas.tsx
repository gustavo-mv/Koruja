import { View, Text } from "react-native";
import React from "react";
import { TurmaProps } from "@/models/TurmaProps";
import ButtonHeaderHelp from "./ButtonHeaderHelp";

interface HeaderListaDisciplinasProps extends TurmaProps {
  aparecerMenu: boolean;
}

const HeaderListaDisciplinas: React.FC<HeaderListaDisciplinasProps> = ({
  aparecerMenu,
  ...turma
}) => {
  if (aparecerMenu) {
    return (
      <View className=" bg-ciano rounded-b-3xl pb-5 z-50">
        <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
          {turma.nome}
        </Text>
        <View className=" flex-column justify-center items-center">
          <View className=" flex-row w-96 justify-center items-center">
            <ButtonHeaderHelp
              titulo="Editar Nome"
              icon="lead-pencil"
              bg="#f7ee6d"
              tipo="tipoEdit"
              idTurma={turma.id}
              nomeTurma={turma.nome}
              disciplinas={turma.disciplinas}
              professorId={turma.professorId}
            />
            <ButtonHeaderHelp
              titulo="Histórico de Gabaritos"
              icon="qrcode-scan"
              bg="#57dff7"
              tipo="tipoHistoricoGabaritos"
              idTurma={turma.id}
              nomeTurma={turma.nome}
              disciplinas={turma.disciplinas}
              professorId={turma.professorId}
            />
          </View>
          <View>
            <View className="flex-row">
              <ButtonHeaderHelp
                titulo="Histórico de Atividades"
                icon="note-multiple-outline"
                bg="#ffa754"
                tipo="tipoHistoricoAtv"
                idTurma={turma.id}
                nomeTurma={turma.nome}
                disciplinas={turma.disciplinas}
                professorId={turma.professorId}
              />
              <ButtonHeaderHelp
                titulo="Excluir Turma"
                icon="delete"
                bg="#fa5f81"
                tipo="tipoDelete"
                idTurma={turma.id}
                nomeTurma={turma.nome}
                disciplinas={turma.disciplinas}
                professorId={turma.professorId}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View className=" bg-black rounded-b-3xl z-50">
      <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
        {turma.nome}
      </Text>
      <View className="flex-row pb-5 items-center justify-center">
        <ButtonHeaderHelp
          titulo="Editar Nome"
          icon="lead-pencil"
          bg="#f7ee6d"
          tipo="tipoEdit"
          idTurma={turma.id}
          nomeTurma={turma.nome}
          disciplinas={turma.disciplinas}
          professorId={turma.professorId}
        />
        <ButtonHeaderHelp
          titulo="Excluir Turma"
          icon="delete"
          bg="#fa5f81"
          tipo="tipoDelete"
          idTurma={turma.id}
          nomeTurma={turma.nome}
          disciplinas={turma.disciplinas}
          professorId={turma.professorId}
        />
      </View>
    </View>
  );
};

export default HeaderListaDisciplinas;
