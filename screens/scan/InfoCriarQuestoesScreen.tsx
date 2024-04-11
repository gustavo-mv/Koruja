import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
import { Link } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

const InfoCriarQuestoesScreen: React.FC<CriarProvaInfo> = (disciplina) => {
  const [questoes, setQuestoes] = React.useState<null | number>(null);
  const [alternativas, setAlternativas] = React.useState<null | string>(null);
  const [disabledNext, setDisabledNext] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (questoes === null || alternativas === null) {
      setDisabledNext(true);
    } else {
      setDisabledNext(false);
    }
  }, [questoes, alternativas]);

  const questoesOptions = Array.from({ length: 20 }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1,
  }));
  const alternativasOptions = [
    { label: "A, B", value: 2 },
    { label: "A, B, C", value: 3 },
    { label: "A, B, C, D", value: 4 },
    { label: "A, B, C, D, E", value: 5 },
    { label: "A, B, C, D, E, F", value: 6 },
  ];

  return (
    <View className="h-full w-full">
      <View className=" h-full  bg-black items-center pt-20">
        <Text className="w-44 text-center bg-green-200 text-3xl rounded-md p-3 text-black font-bold mb-4">
          {disciplina.nomeProva}
        </Text>
        <Text className="w-44 text-center text-gray-300 rounded-md font-bold text-md mb-8">
          {disciplina.assunto}
        </Text>
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text className=" p-2 font-bold">Quantidade de questões:</Text>
          <RNPickerSelect
            placeholder={{ label: "Selecione", value: null }}
            value={questoes}
            onValueChange={(value) => setQuestoes(value)}
            items={questoesOptions}
            style={{
              inputAndroid: {
                height: 50,
                width: 200,
              },
            }}
          />
        </View>

        <View
          style={{
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text className=" p-2 font-bold">Quantidade de alternativas:</Text>
          <RNPickerSelect
            placeholder={{ label: "Selecione", value: null }}
            value={alternativas}
            onValueChange={(value) => setAlternativas(value)}
            items={alternativasOptions}
            style={{
              inputAndroid: {
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                height: 50,
                width: 200,
                textAlign: "center",
              },
            }}
          />
        </View>
        <Link
          asChild
          href={{
            pathname: "/home/(scan)/selecionarVariacoes",
            params: {
              turmaId: disciplina.turmaId,
              disciplinaNome: disciplina.disciplinaNome,
              disciplinaId: disciplina.disciplinaId,
              assunto: disciplina.assunto,
              nomeProva: disciplina.nomeProva,
              nQuestoes: questoes,
              nAlternativas: alternativas,
            },
          }}
        >
          <TouchableOpacity
            disabled={disabledNext}
            className={`${
              disabledNext ? "opacity-50" : ""
            } bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
          >
            <Text className=" text-center text-base font-bold">Próximo</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default InfoCriarQuestoesScreen;
