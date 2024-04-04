import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import SemDisciplina from "./SemDisciplina";
import { disciplinasObj, TurmaProps } from "@/models/TurmaProps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg1 from "../../../assets/iconsDisc/Svg1.svg";
import Svg2 from "../../../assets/iconsDisc/Svg2.svg";
import Svg3 from "../../../assets/iconsDisc/Svg3.svg";
import Svg4 from "../../../assets/iconsDisc/Svg4.svg";
import Svg5 from "../../../assets/iconsDisc/Svg5.svg";
import Svg6 from "../../../assets/iconsDisc/Svg6.svg";
import Svg7 from "../../../assets/iconsDisc/Svg7.svg";
import Svg8 from "../../../assets/iconsDisc/Svg8.svg";
import Svg9 from "../../../assets/iconsDisc/Svg9.svg";
import ButtonHeaderHelp from "./ButtonHeaderHelp";

interface Props {
  disciplinas: disciplinasObj[];
}

const icones = [Svg1, Svg2, Svg3, Svg4, Svg5, Svg6, Svg7, Svg8, Svg9];

const IconeDisciplina: React.FC<{ indice: number }> = ({ indice }) => {
  const Icone = icones[indice % icones.length];
  return <Icone height={150} width={300} className=" top-2 right-6" />;
};

const DisciplinasList: React.FC<Props> = ({ disciplinas }) => {
  const cores = ["#0a9600", "#076600", "#044000"];
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
          <Text className=" text-white w-52 text-4xl font-bold left-3">
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
      <View className=" mb-11">
        <ScrollView className="h-full">
          <View className=" bg-black rounded-b-3xl pb-5 z-50">
            <Text className=" text-white text-4xl font-extrabold tracking-wide ml-6 w-96 pr-12 mb-4">
              {turma.nome}
            </Text>
            <View className=" flex-column justify-center items-center">
              <View className=" flex-row w-96 justify-center items-center">
                <ButtonHeaderHelp
                  titulo="Editar Nome"
                  icon="lead-pencil"
                  bg="#f7ee6d"
                />
                <ButtonHeaderHelp
                  titulo="Histórico de Gabaritos"
                  icon="qrcode-scan"
                  bg="#57dff7"
                />
              </View>
              <View>
                <View className="flex-row">
                  <ButtonHeaderHelp
                    titulo="Histórico de Atividades"
                    icon="note-multiple-outline"
                    bg="#ffa754"
                  />
                  <ButtonHeaderHelp
                    titulo="Excluir Turma"
                    icon="delete"
                    bg="#fa5f81"
                  />
                </View>
              </View>
            </View>
          </View>

          <View className="h-full">
            <Text className=" w-52 text-xl mt-4 pl-5 font-bold border-b-4">
              Lista de Disciplinas
            </Text>

            <DisciplinasList disciplinas={turma.disciplinas} />
          </View>
        </ScrollView>
        <Link
          push
          asChild
          href={{
            pathname: "home/criarDisciplina",
            params: {
              turmaId: turma.id,
            },
          }}
        >
          <TouchableOpacity className=" flex-row justify-center items-center bg-black rounded-xl bottom-28 6 w-44 h-10 self-end fixed right-2 z-50">
            <MaterialCommunityIcons
              name="notebook-edit"
              size={24}
              color="#22c55e"
            />

            <Text className="text-green-500 font-semibold pl-2">
              Adicionar Disciplina
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
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
