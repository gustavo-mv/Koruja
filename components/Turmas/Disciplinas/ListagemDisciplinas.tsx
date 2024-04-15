import { TouchableOpacity, Text, View, FlatList } from "react-native";
import IconeDisciplinaProvider from "@/components/Turmas/Disciplinas/IconeDisciplinaProvider";
import { DisciplinasObj } from "@/models/DisciplinasObj";
import { Link } from "expo-router";
import { TurmaProps } from "@/models/TurmaProps";

const ListagemDisciplinas: React.FC<{
  disciplinas: DisciplinasObj[];
  turma: TurmaProps;
}> = ({ disciplinas, turma }) => {
  const cores = ["#0a9600", "#076600", "#044000"];
  const nomesIcones = ["icone1", "icone2", "icone3", "icone4"];

  const renderItem = ({
    item,
    index,
  }: {
    item: DisciplinasObj;
    index: number;
  }) => {
    const indiceCor = index % cores.length;
    const indiceIcone = index % nomesIcones.length;

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
  };

  return (
    <FlatList
      data={disciplinas}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ListagemDisciplinas;
