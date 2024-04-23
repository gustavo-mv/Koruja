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
      <View className=" h-full  bg-black items-center">
        <Text className="w-44 text-center bg-green-200 text-3xl rounded-md p-3 text-black font-bold mb-4">
          {disciplina.nomeProva}
        </Text>
        <Text className="w-44 text-center text-gray-300 rounded-md font-bold text-md mb-8">
          {disciplina.assunto}
        </Text>
        <View className=" items-end mb-7">
          <View className=" flex-row justify-center">
            <Text className=" p-2 text-3xl font-bold text-white tracking-wider">
              Questões:
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Selecione", value: null }}
              value={questoes}
              onValueChange={(value) => setQuestoes(value)}
              items={questoesOptions}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: "purple",
                  borderRadius: 8,
                  color: "black",
                  paddingRight: 30,
                },
                placeholder: {
                  color: "gray",
                },
                iconContainer: {
                  top: 10,
                  right: 12,
                },

                viewContainer: {
                  borderWidth: 1,
                  borderRadius: 8,
                  width: 180,
                  backgroundColor: "white",
                },

                chevronContainer: {
                  display: "none",
                },
                modalViewMiddle: {
                  backgroundColor: "yellow",
                },
                done: {
                  color: "green",
                },
              }}
            />
          </View>

          <View className="flex-row mt-5">
            <Text className=" p-2 font-bold text-white text-3xl">
              Alternativas:
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Selecione", value: null }}
              value={alternativas}
              onValueChange={(value) => setAlternativas(value)}
              items={alternativasOptions}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: "purple",
                  borderRadius: 8,
                  color: "black",
                  paddingRight: 30,
                },
                placeholder: {
                  color: "gray",
                },

                viewContainer: {
                  borderWidth: 1,
                  borderRadius: 8,
                  width: 180,
                  backgroundColor: "white",
                },
                chevronContainer: {
                  display: "none",
                },
                modalViewMiddle: {
                  backgroundColor: "yellow",
                },
                done: {
                  color: "green",
                },
              }}
            />
          </View>
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
