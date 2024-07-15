import React, { PureComponent } from "react";
import { TouchableOpacity, Text, View, FlatList } from "react-native";
import IconeDisciplinaProvider from "@/components/Turmas/Disciplinas/IconeDisciplinaProvider";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import { Link } from "expo-router";
import { TurmaProps } from "@/models/TurmaProps";

class ListItem extends PureComponent<{
  item: DisciplinasObj;
  index: number;
  turma: TurmaProps;
}> {
  render() {
    const { item, index, turma } = this.props;
    const cores = ["#e86800", "#b95300", "#944200"];
    const indiceCor = index % cores.length;

    return (
      <Link
        asChild
        href={{
          pathname: "/home/(turmas)/disciplina",
          params: {
            index: index,
            turma: JSON.stringify(turma),
            disciplina: JSON.stringify(item),
          },
        }}
      >
        <TouchableOpacity
          className="mt-5 w-11/12 rounded-lg border-2 self-center flex-row overflow-hidden relative justify-start items-center"
          style={{ backgroundColor: cores[indiceCor] }}
        >
          <Text className=" text-white w-52 text-4xl font-bold left-3">
            {item.nome}
          </Text>
          <IconeDisciplinaProvider indice={index} />
        </TouchableOpacity>
      </Link>
    );
  }
}

const ListagemDisciplinas: React.FC<{
  disciplinas: DisciplinasObj[];
  turma: TurmaProps;
}> = ({ disciplinas, turma }) => {
  return (
    <FlatList
      data={disciplinas}
      renderItem={({ item, index }) => (
        <ListItem item={item} index={index} turma={turma} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ListagemDisciplinas;
