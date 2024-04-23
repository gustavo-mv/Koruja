import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { CriarProvaInfo, Resposta } from "@/models/CriarProvaInfo";
import { Link, router } from "expo-router";
import Checkbox from "expo-checkbox";

const MarcarGabaritoScreen: React.FC<CriarProvaInfo> = (gabarito) => {
  const todasAlternativas = "ABCDEF";
  const alternativas = todasAlternativas.slice(0, gabarito.nAlternativas);
  const [respostas, setRespostas] = React.useState<string[]>([]);
  const [proximoDisabled, setProximoDisabled] = React.useState<boolean>(true);

  function verificarArray(arr: string[]) {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i] !== "A" &&
        arr[i] !== "B" &&
        arr[i] !== "C" &&
        arr[i] !== "D"
      ) {
        return false;
      }
    }
    return true;
  }

  React.useEffect(() => {
    if (
      (gabarito.nQuestoes && respostas.length < gabarito.nQuestoes) ||
      verificarArray(respostas) === false
    ) {
      setProximoDisabled(true);
    } else {
      setProximoDisabled(false);
    }
  }, [respostas]);

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
            paddingLeft: 25,
          }}
        >
          {alternativas.split("").map((alternativa, index) => (
            <Text
              className=" text-4xl ml-7 mr-7 font-bold"
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
    const selecionarResposta = (
      questaoIndex: number,
      respostaSelecionada: string
    ) => {
      setRespostas((prevRespostas) => {
        const novasRespostas = [...prevRespostas];
        novasRespostas[questaoIndex] = respostaSelecionada;
        return novasRespostas;
      });
    };
    return (
      <ScrollView>
        <View className=" h-24 bg-green-600 w-full justify-center items-center mb-5">
          <Text className=" font-bold text-white text-4xl">Gabarito Único</Text>
        </View>
        {renderizarCheckboxes()}
        <View className=" items-center bg-green-200 rounded-md p-3">
          <Text className=" font-extrabold">Respostas selecionadas:</Text>

          {respostas.map((resposta, index) => (
            <Text className=" font-bold" key={`resposta-${index}`}>{`Questão ${
              index + 1
            }: ${resposta || "Nenhuma resposta selecionada"}`}</Text>
          ))}
        </View>
        <Link
          asChild
          href={{
            pathname: "/home/(scan)/provaCriada",
            params: {
              turmaId: gabarito.turmaId,
              disciplinaNome: gabarito.disciplinaNome,
              disciplinaId: gabarito.disciplinaId,
              assunto: gabarito.assunto,
              nomeProva: gabarito.nomeProva,
              nQuestoes: gabarito.nQuestoes,
              nAlternativas: gabarito.nAlternativas,
              nVariacoes: gabarito.nVariacoes,
              respostas: JSON.stringify(respostas),
              index: 1,
            },
          }}
        >
          <TouchableOpacity
            disabled={proximoDisabled}
            className={`
         ${proximoDisabled ? "opacity-40" : ""}
         bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
          >
            <Text className=" text-center text-base font-bold">
              Criar Prova
            </Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    );
  }

  if (gabarito.index !== gabarito.nVariacoes) {
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
            paddingLeft: 25,
          }}
        >
          {alternativas.split("").map((alternativa, index) => (
            <Text
              className=" text-4xl ml-7 mr-7 font-bold"
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
    const selecionarResposta = (
      questaoIndex: number,
      respostaSelecionada: string
    ) => {
      setRespostas((prevRespostas) => {
        const novasRespostas = [...prevRespostas];
        novasRespostas[questaoIndex] = respostaSelecionada;
        return novasRespostas;
      });
    };

    const respostasObjeto: Resposta = {
      questoes: {
        create: respostas.map((resposta, index) => ({
          numero: index + 1,
          resposta: resposta,
        })),
      },
    };

    const handleSave = async () => {
      if (respostas.length === gabarito.nQuestoes) {
        gabarito.respostas?.push(respostasObjeto);
        router.push({
          pathname: "/home/(scan)/telaGabarito",
          params: {
            turmaId: gabarito.turmaId,
            disciplinaNome: gabarito.disciplinaNome,
            disciplinaId: gabarito.disciplinaId,
            assunto: gabarito.assunto,
            nomeProva: gabarito.nomeProva,
            nQuestoes: gabarito.nQuestoes,
            nAlternativas: gabarito.nAlternativas,
            nVariacoes: gabarito.nVariacoes,
            respostas: JSON.stringify(gabarito.respostas),
            index: gabarito.index ? gabarito.index + 1 : null,
          },
        });
      }
    };

    return (
      <ScrollView>
        <View className=" justify-center items-center">
          <View className="flex-col h-32 bg-green-600 w-full justify-center items-center mb-5">
            <Text className=" font-bold text-white text-7xl">
              {gabarito.index}º
            </Text>
            <Text className=" font-bold text-white text-3xl mb-5 tracking-wider">
              Variação
            </Text>
          </View>
          {renderizarCheckboxes()}
          <View className=" items-center bg-green-200 rounded-md p-3">
            <Text className=" font-extrabold">Respostas selecionadas:</Text>

            {respostas.map((resposta, index) => (
              <Text
                className=" font-bold"
                key={`resposta-${index}`}
              >{`Questão ${index + 1}: ${
                resposta || "Nenhuma resposta selecionada"
              }`}</Text>
            ))}
          </View>
          <TouchableOpacity
            disabled={proximoDisabled}
            onPress={handleSave}
            className={`
         ${proximoDisabled ? "opacity-40" : ""}
         bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
          >
            <Text className=" text-center text-base font-bold">Próxima</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (gabarito.index === gabarito.nVariacoes && gabarito.index !== 1) {
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
            paddingLeft: 25,
          }}
        >
          {alternativas.split("").map((alternativa, index) => (
            <Text
              className=" text-4xl ml-7 mr-7 font-bold"
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
    const selecionarResposta = (
      questaoIndex: number,
      respostaSelecionada: string
    ) => {
      setRespostas((prevRespostas) => {
        const novasRespostas = [...prevRespostas];
        novasRespostas[questaoIndex] = respostaSelecionada;
        return novasRespostas;
      });
    };

    const respostasObjeto: Resposta = {
      questoes: {
        create: respostas.map((resposta, index) => ({
          numero: index + 1,
          resposta: resposta,
        })),
      },
    };

    const handleSave = async () => {
      if (respostas.length === gabarito.nQuestoes) {
        gabarito.respostas?.push(respostasObjeto);
        router.replace({
          pathname: "/home/(scan)/provaCriada",
          params: {
            turmaId: gabarito.turmaId,
            disciplinaNome: gabarito.disciplinaNome,
            disciplinaId: gabarito.disciplinaId,
            assunto: gabarito.assunto,
            nomeProva: gabarito.nomeProva,
            nQuestoes: gabarito.nQuestoes,
            nAlternativas: gabarito.nAlternativas,
            nVariacoes: gabarito.nVariacoes,
            respostas: JSON.stringify(gabarito.respostas),
            index: gabarito.index ? gabarito.index + 1 : null,
          },
        });
      }
    };

    return (
      <ScrollView>
        <View className=" justify-center items-center">
          <View className="flex-col h-32 bg-green-600 w-full justify-center items-center mb-5">
            <Text className=" font-bold text-white text-7xl">
              {gabarito.index}º
            </Text>
            <Text className=" font-bold text-white text-3xl mb-5 tracking-wider">
              Última Variação
            </Text>
          </View>
          {renderizarCheckboxes()}
          <View className=" items-center bg-green-200 rounded-md p-3">
            <Text className=" font-extrabold">Respostas selecionadas:</Text>

            {respostas.map((resposta, index) => (
              <Text
                className=" font-bold"
                key={`resposta-${index}`}
              >{`Questão ${index + 1}: ${
                resposta || "Nenhuma resposta selecionada"
              }`}</Text>
            ))}
          </View>
          <TouchableOpacity
            disabled={proximoDisabled}
            onPress={handleSave}
            className={`
         ${proximoDisabled ? "opacity-40" : ""}
         bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
          >
            <Text className=" text-center text-base font-bold">Próxima</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default MarcarGabaritoScreen;
