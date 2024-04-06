import { View, Text } from "react-native";
import React from "react";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import ButtonHeaderHelpDisciplina from "./ButtonHeaderHelpDisciplina";
import { TurmaProps } from "@/models/TurmaProps";
import LottieView from "lottie-react-native";

const HeaderDisciplina: React.FC<{
  disciplina: DisciplinasObj;
  turma: TurmaProps;
  index: number;
}> = ({ disciplina, turma, index }) => {
  return (
    <View className=" bg-black h-full items-center justify-center pb-20 z-50 w-full">
      <LottieView
        source={require("@/assets/lotties/background.json")}
        style={{
          width: 900,
          height: 900,
          opacity: 0.8,
          position: "absolute",
          bottom: 0,
          transform: "rotate(270deg)",
        }}
        autoPlay
        loop
      />
      <Text className=" text-white text-5xl text-center font-extrabold tracking-wide mb-4">
        {disciplina.nome}
      </Text>
      <Text className=" text-emerald-100 text-center text-md font-medium tracking-wider w-64 mb-4">
        {turma.nome}
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
            index={index}
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
            index={index}
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
              index={index}
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
              index={index}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderDisciplina;
