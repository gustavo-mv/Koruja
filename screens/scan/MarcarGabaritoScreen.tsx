import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { CriarProvaInfo } from "@/models/CriarProvaInfo";
import { Link } from "expo-router";
import Checkbox from "expo-checkbox";

const MarcarGabaritoScreen: React.FC<CriarProvaInfo> = (gabarito) => {
  const todasAlternativas = "ABCDEF";
  const alternativas = todasAlternativas.slice(0, gabarito.nAlternativas);
  const [respostas, setRespostas] = React.useState([]);

  if (gabarito && gabarito.nVariacoes === 1 && gabarito.index === 1) {
    const renderizarCheckboxes = () => {
      const checkboxesArray = [];
      checkboxesArray.push(
        <View
          key="cabecalho"
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "center",
            paddingLeft: 12,
          }}
        >
          {alternativas.split("").map((alternativa, index) => (
            <Text
              className=" text-3xl ml-8 mr-8 font-bold"
              key={`cabecalho-${index}`}
              style={{ marginRight: 5 }}
            >
              {alternativa}
            </Text>
          ))}
        </View>
      );
      for (let i = 0; i < (gabarito.nQuestoes || 0); i++) {
        const questao = [];
        for (let j = 0; j < (gabarito.nAlternativas || 0); j++) {
          questao.push(
            <Checkbox
              key={`${i}-${j}`}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 20,
                width: 45,
                height: 45,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
              }}
              value={respostas[i] === alternativas[j]}
              onValueChange={() => selecionarResposta(i, alternativas[j])}
            >
              <Text>{alternativas[j]}</Text>
            </Checkbox>
          );
        }
        checkboxesArray.push(
          <View className=" flex-row m-2 justify-center" key={`questao-${i}`}>
            <Text className=" w-14 text-center pl-1 text font-bold text-4xl pt-2">{`${
              i + 1
            }. `}</Text>
            {questao}
          </View>
        );
      }
      return checkboxesArray;
    };
    const selecionarResposta = (questaoIndex, respostaSelecionada) => {
      setRespostas((prevRespostas) => {
        const novasRespostas = [...prevRespostas];
        novasRespostas[questaoIndex] = respostaSelecionada;
        return novasRespostas;
      });
    };

    return (
      <ScrollView>
        <View className=" h-24 bg-black w-full justify-center items-center mb-5">
          <Text className=" font-bold text-white text-3xl">Gabarito Único</Text>
        </View>
        {renderizarCheckboxes()}
        <Text>Respostas selecionadas:</Text>
        {respostas.map((resposta, index) => (
          <Text key={`resposta-${index}`}>{`Questão ${index + 1}: ${
            resposta || "Nenhuma resposta selecionada"
          }`}</Text>
        ))}
      </ScrollView>
    );
  }

  return (
    <View className="h-full w-full">
      <View className=" h-full  bg-black items-center pt-20">
        <Text className="w-44 text-center bg-green-200 text-3xl rounded-md p-3 text-black font-bold mb-4">
          Gabarito Não Único {gabarito.index} e {gabarito.nVariacoes}
        </Text>
      </View>
      <Link
        asChild
        href={{
          pathname: "/home/(scan)/selecionarVariacoes",
          params: {
            turmaId: gabarito.turmaId,
            disciplinaNome: gabarito.disciplinaNome,
            disciplinaId: gabarito.disciplinaId,
            assunto: gabarito.assunto,
            nomeProva: gabarito.nomeProva,
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
  );
};

export default MarcarGabaritoScreen;
