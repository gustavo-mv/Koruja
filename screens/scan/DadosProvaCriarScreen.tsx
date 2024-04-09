import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Background from "@/assets/bg-school.svg";
import { DisciplinaInfo } from "../../models/DisciplinaInfo";

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
    <View className="pt-10">
      <Text className=" mt-3 font-bold text-center text-5xl">
        Escolha uma Turma!
      </Text>
      <Background
        style={{
          position: "absolute",
          width: 450,
          height: 550,
          right: 0,
        }}
      />
      <View className="mt-36 h-72 rounded-lg m-3 bg-black items-center justify-center">
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

        <TouchableOpacity
          disabled={proxDisabled}
          className={`${
            proxDisabled ? "opacity-50" : ""
          } bg-green-500 mt-5 w-32 rounded-md p-3`}
        >
          <Text className=" text-center text-base font-bold">Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DadosProvaCriar;
