import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Background from "@/assets/bg-school.svg";
import { DisciplinaInfo } from "../../models/DisciplinaInfo";
import { Link } from "expo-router";

const DadosProvaCriar: React.FC<DisciplinaInfo> = (disciplina) => {
  const [nomeProva, setNomeProva] = React.useState("");
  const [assunto, setAssunto] = React.useState("");
  const [proxDisabled, setProxDisabled] = React.useState(true);

  React.useEffect(() => {
    if (nomeProva.length > 4 && assunto.length > 4) {
      setProxDisabled(false);
    } else {
      setProxDisabled(true);
    }
  }, [nomeProva, assunto]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className=" h-full">
        <View className=" h-full pt-10 bg-black items-center ">
          <Text className="text-white m-3 font-bold text-center text-2xl mb-10">
            Informe o Nome e o Assunto da sua prova de{" "}
            {disciplina.disciplinaNome}
          </Text>
          <Text className="self-start ml-10 font-semibold pb-2 text-white">
            Nome da Prova:
          </Text>
          <TextInput
            value={nomeProva}
            onChangeText={setNomeProva}
            autoCapitalize="sentences"
            placeholder={`Ex:   AV2 de ${disciplina.disciplinaNome}`}
            className=" pl-3 h-10 bg-gray-200 w-72 rounded-md"
          />
          <Text className=" self-start ml-10 font-semibold pt-3 pb-2 text-white">
            Assunto da Prova:
          </Text>
          <TextInput
            value={assunto}
            onChangeText={setAssunto}
            placeholder={`Ex:   Tópicos Avançados de ${disciplina.disciplinaNome}`}
            className="pl-3 h-10 bg-gray-200 w-72 rounded-md"
          />
          <Link
            asChild
            href={{
              pathname: "/home/(scan)/infoCriarQuestoes",
              params: {
                turmaId: disciplina.turmaId,
                disciplinaNome: disciplina.disciplinaNome,
                disciplinaId: disciplina.disciplinaId,
                turmaNome: disciplina.turmaNome,
                nomeProva: nomeProva,
                assunto: assunto,
              },
            }}
          >
            <TouchableOpacity
              disabled={proxDisabled}
              className={`${
                proxDisabled ? "opacity-50" : ""
              } bg-green-500 mt-5 w-32 rounded-md p-3`}
            >
              <Text className=" text-center text-base font-bold">Próximo</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DadosProvaCriar;
