import { TouchableOpacity, Text, View } from "react-native";
import IconeDisciplinaProvider from "@/components/Turmas/Disciplinas/IconeDisciplinaProvider";
import { disciplinasObj } from "@/models/TurmaProps";
import { Link } from "expo-router";

const ListagemDisciplinas: React.FC<{ disciplinas: disciplinasObj[] }> = ({
  disciplinas,
}) => {
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
        <Link
          key={index}
          asChild
          href={{
            pathname: "/home/disciplina",
            params: { disciplina: JSON.stringify(disciplina) },
          }}
        >
          <TouchableOpacity
            className="mt-5 w-11/12 rounded-lg border-2 self-center flex-row overflow-hidden relative justify-start items-center"
            style={{ backgroundColor: disciplina.cor }}
          >
            <Text className=" text-white w-52 text-4xl font-bold left-3">
              {disciplina.nome}
            </Text>
            <IconeDisciplinaProvider indice={index} />
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default ListagemDisciplinas;
