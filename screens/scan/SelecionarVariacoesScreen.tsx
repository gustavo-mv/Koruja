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

const SelecionarVariacoesScreen: React.FC<CriarProvaInfo> = (disciplina) => {
  const [variacoes, setVariacoes] = React.useState<null | number>(1);

  const variacoesOptions = [
    { label: "Sem Variações, Gabarito Único", value: 1 },
    { label: "2 Variações", value: 2 },
    { label: "3 Variações", value: 3 },
    { label: "4 Variações", value: 4 },
    { label: "5 Variações", value: 5 },
  ];

  return (
    <View className="h-full w-full">
      <View className=" h-full  bg-black items-center pt-20">
        <Text className="w-44 text-center bg-green-200 text-3xl rounded-md p-3 text-black font-bold mb-4">
          {disciplina.nomeProva} {disciplina.nQuestoes}{" "}
          {disciplina.nAlternativas}
        </Text>
        <Text className="w-44 text-center text-gray-300 rounded-md font-bold text-md mb-8">
          {disciplina.assunto}
        </Text>

        <View
          style={{
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text className=" p-2 font-bold">
            Deseja que o gabarito tenha variações?
          </Text>
          <RNPickerSelect
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
             
         bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
          >
            <Text className=" text-center text-base font-bold">Próximo</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SelecionarVariacoesScreen;
