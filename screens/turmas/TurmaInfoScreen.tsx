import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import SemDisciplina from "../../components/Turmas/Disciplinas/SemDisciplina";
import { TurmaProps } from "@/models/TurmaProps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListagemDisciplinas from "@/components/Turmas/Disciplinas/ListagemDisciplinas";
import HeaderListaDisciplinas from "@/components/Turmas/Disciplinas/HeaderListaDisciplinas";

const TurmaInfoScreen: React.FC<TurmaProps> = (turma) => {
  return (
    <View>
      {turma.disciplinas.length > 0 ? (
        <View className=" mb-24">
          <View className="h-full">
            <HeaderListaDisciplinas aparecerMenu={true} {...turma} />
            <View className="h-full pb-60">
              <Text className=" w-52 text-xl mt-4 mb-2  pl-5 font-bold border-b-4">
                Lista de Disciplinas
              </Text>
              <ListagemDisciplinas
                disciplinas={turma.disciplinas}
                turma={turma}
              />
            </View>
          </View>
          <Link
            push
            asChild
            href={{
              pathname: "/home/(turmas)/criarDisciplina",
              params: {
                nome: turma.nome,
                turmaId: turma.id,
                disciplinas: JSON.stringify(turma.disciplinas),
                professorId: turma.professorId,
              },
            }}
          >
            <TouchableOpacity className=" flex-row justify-center items-center bg-laranja border-2 rounded-xl bottom-28 6 w-44 h-10 self-end fixed right-2 z-50">
              <MaterialCommunityIcons
                name="notebook-edit"
                size={24}
                color="white"
              />

              <Text className="text-white font-semibold pl-2">
                Adicionar Disciplina
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <View>
          <HeaderListaDisciplinas aparecerMenu={false} {...turma} />
          <SemDisciplina {...turma} />
        </View>
      )}
    </View>
  );
};
export default TurmaInfoScreen;
