import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Sticker from "@/assets/semDisciplinas.svg";
import { Link } from "expo-router";
import { TurmaProps } from "@/models/TurmaProps";

const SemDisciplina: React.FC<TurmaProps> = ({ id, nome, professorId }) => {
  return (
    <View className=" items-center top-20 bg- bg-red-200 absolute w-full pt-16 pb-72">
      <Sticker height={350} width={350} />
      <Text className=" ml-5 mr-5 text-xl font-medium">
        Essa Turma ainda não possui disciplinas, deseja adicionar?
      </Text>
      <TouchableOpacity className=" bg-green-400 mt-4 p-2 rounded-xl">
        <Link
          href={{
            pathname: "/home/(turmas)/criarDisciplina",
            params: {
              turmaId: id,
              professorId: professorId,
              nome: nome,
            },
          }}
        >
          <Text className=" font-bold text-base">
            Adicionar a Primeira Disciplina!
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};
export default SemDisciplina;
