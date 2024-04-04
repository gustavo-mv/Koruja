import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import SemDisciplina from "./SemDisciplina";
import { disciplinasObj, TurmaProps } from "@/models/TurmaProps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg1 from "../../../assets/iconsDisc/Svg1.svg";
import Svg2 from "../../../assets/iconsDisc/Svg2.svg";
import Svg3 from "../../../assets/iconsDisc/Svg3.svg";

interface Props {
  disciplinas: disciplinasObj[];
}

const icones = [Svg1, Svg2, Svg3];

const IconeDisciplina: React.FC<{ indice: number }> = ({ indice }) => {
  const Icone = icones[indice % icones.length];
  return <Icone height={150} width={300} className=" top-2 right-6" />;
};

const DisciplinasList: React.FC<Props> = ({ disciplinas }) => {
  const cores = ["#14db4c", "#18ad42", "#1a993e", "#178035", "#115c27"];
  const nomesIcones = ["icone1", "icone2", "icone3", "icone4"];
  const cardsDisciplinas = disciplinas.map((disciplina, index) => {
    const indiceCor = index % cores.length;
    const indiceIcone = index % nomesIcones.length;

    return {
      nome: disciplina.nome,
      cor: cores[indiceCor],
      icone: nomesIcones[indiceIcone],
    };
  });

  return (
    <View>
      {cardsDisciplinas.map((disciplina, index) => (
        <TouchableOpacity
          key={index}
          className="mt-5 w-11/12 rounded-lg border-2 self-center flex-row overflow-hidden relative justify-start items-center"
          style={{ backgroundColor: disciplina.cor }}
        >
          <Text className=" w-52 text-4xl font-bold left-3">
            {disciplina.nome}
          </Text>
          <IconeDisciplina indice={index} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TurmaInfo: React.FC<TurmaProps> = (turma) => {
  if (turma.disciplinas.length > 0) {
    return (
      <ScrollView className="h-full">
        <View className=" bg-black rounded-b-3xl z-50">
          <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
            {turma.nome}
          </Text>
        </View>
        <View className="h-full">
          <Text className=" w-52 text-xl mt-4 pl-5 font-bold border-b-4">
            Lista de Disciplinas
          </Text>

          <DisciplinasList disciplinas={turma.disciplinas} />
        </View>

        <TouchableOpacity className=" flex-row justify-center items-center bg-black rounded-xl space-x-3 bottom-44 w-44 h-10 self-end fixed right-2 z-50">
          <MaterialCommunityIcons
            name="account-multiple-plus"
            size={24}
            color="#22c55e"
          />

          <Link
            push
            href={{
              pathname: "home/criarDisciplina",
              params: {
                turmaId: turma.id,
              },
            }}
          >
            <Text className="text-green-500 font-semibold pl-2">
              Adicionar Disciplina
            </Text>
          </Link>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <View className=" bg-black rounded-b-3xl z-50">
          <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
            {turma.nome}
          </Text>
        </View>
        <SemDisciplina {...turma} />
      </View>
    );
  }
};

export default TurmaInfo;
