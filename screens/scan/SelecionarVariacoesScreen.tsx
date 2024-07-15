import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
import { Link } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

const SelecionarVariacoesScreen: React.FC<CriarProvaInfo> = (disciplina) => {
  const [variacoes, setVariacoes] = React.useState<null | number>(1);
  const [letras, setLetras] = React.useState<string>("");

  const variacoesOptions = [
    { label: "Sem Variações, Gabarito Único", value: 1 },
    { label: "2 Variações", value: 2 },
    { label: "3 Variações", value: 3 },
    { label: "4 Variações", value: 4 },
    { label: "5 Variações", value: 5 },
  ];

  const gerarLetras = () => {
    if (
      disciplina.nAlternativas &&
      disciplina.nAlternativas > 0 &&
      disciplina.nAlternativas <= 6
    ) {
      const letrasArray = "ABCDEF".split("");
      setLetras(letrasArray.slice(0, disciplina.nAlternativas).join(""));
    }
  };

  React.useEffect(() => {
    gerarLetras();
  }, [disciplina.nAlternativas]);

  return (
    <View className="h-full w-full bg-ciano">
      <View className=" h-full w-full bg-ciano items-center pt-10">
        <Text className="bg-orange-300 text-3xl text-center mb-5 p-5 rounded-md font-bold">
          {disciplina.nomeProva}
        </Text>
        <Text className="w-44 text-center text-gray-100 rounded-md font-bold text-2xl mb-2">
          {disciplina.assunto}
        </Text>
        <View className="flex-row items-center justify-center mb-10">
          <Text className="w-28 text-center border-r-gray-200 border-r-2 text-gray-300 font-bold text-md">
            {disciplina.nQuestoes} Questões
          </Text>
          <Text className="w-20 text-center text-gray-300 font-bold text-md">
            {letras}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text className=" p-2 font-bold">
            Deseja que o gabarito tenha variações?
          </Text>
          <RNPickerSelect
            placeholder={{}}
            value={variacoes}
            onValueChange={(value) => setVariacoes(value)}
            items={variacoesOptions}
            style={{
              inputAndroid: {
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                height: 50,
                width: 300,
                textAlign: "center",
              },
            }}
          />
        </View>
        <Link
          asChild
          href={{
            pathname: "/home/(scan)/telaGabarito",
            params: {
              turmaId: disciplina.turmaId,
              disciplinaNome: disciplina.disciplinaNome,
              disciplinaId: disciplina.disciplinaId,
              assunto: disciplina.assunto,
              nomeProva: disciplina.nomeProva,
              nQuestoes: disciplina.nQuestoes,
              nAlternativas: disciplina.nAlternativas,
              nVariacoes: variacoes,
              index: 1,
            },
          }}
        >
          <TouchableOpacity
            className={`
               bg-laranja mt-5 w-32 rounded-md p-3`}
          >
            <Text className="text-white text-center text-base font-bold">
              Próximo
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SelecionarVariacoesScreen;
