import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";

const EditarGabaritoScreen = (prova) => {
  const todasAlternativas = "ABCDEF";
  const alternativas = todasAlternativas.slice(0, prova.nAlternativas);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [gabaritoFinal, setGabaritoFinal] = React.useState<[]>();

  if (typeof prova.index !== "undefined") {
    const gabaritos = prova.gabaritos[prova.index];

    if (gabaritos && gabaritos.gabaritos) {
      const questoes = gabaritos.gabaritos[0].questoes;

      const gabaritoOriginal = questoes.map(
        (questao) => questao.respostaCorreta
      );
      const [gabaritoEditado, setGabaritoEditado] = React.useState([
        ...gabaritoOriginal,
      ]);

      React.useEffect(() => {
        const saoIguais = gabaritoOriginal.every(
          (elemento, index) => elemento === gabaritoEditado[index]
        );

        setDisabled(saoIguais);
      }, [gabaritoEditado]);

      const toggleRespostaSelecionada = (questaoIndex, resposta) => {
        setGabaritoEditado((prevGabaritoEditado) => {
          const novoGabaritoEditado = [...prevGabaritoEditado];
          novoGabaritoEditado[questaoIndex] = resposta;
          return novoGabaritoEditado;
        });
      };

      React.useEffect(() => {
        const novoFormato = prova.gabaritos.flatMap((item) => {
          return item.gabaritos.map((gabarito) => {
            const questoes = gabarito.questoes.map((questao) => ({
              numero: questao.numero,
              resposta: questao.respostaCorreta,
            }));

            return { questoes: { create: questoes } };
          });
        });

        const corpoGabarito = [];
        for (let i = 0; i < prova.nQuestoes; i++) {
          corpoGabarito.push({
            numero: i + 1,
            resposta: gabaritoEditado[i],
          });
        }

        novoFormato[prova.index].questoes.create = corpoGabarito;

        setGabaritoFinal(novoFormato);
      }, [gabaritoEditado]);

      let modelos = [];

      for (let i = 0; i < prova.nVariacoes; i++) {
        modelos.push({ modelo: i + 1 });
      }
      const API_URL = process.env.EXPO_PUBLIC_API_URL;

      const handleEdit = async () => {
        try {
          const response = await fetch(`${API_URL}/provas/${prova.idProva}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prova: {
                nome: prova.nomeProva,
                assunto: prova.assunto,
                nQuestoes: prova.nQuestoes,
                nAlternativas: prova.nAlternativas,
                nVariacoes: prova.nVariacoes,
                disciplinaId: prova.disciplinaId,
              },
              variacoes: modelos,
              gabaritos: gabaritoFinal,
            }),
          });

          if (!response.ok) {
            console.log("Erro ao editar o Gabarito");
            throw new Error("Erro na resposta da API /criarProva");
          } else {
            router.replace("home/(tabs)/scan");

            router.push("home/(scan)/listaDeGabaritos");
          }
        } catch (e) {
          if (typeof e === "string") {
            e.toUpperCase();
          } else if (e instanceof Error) {
            e.message;
          }
        }
      };

      if (questoes) {
        return (
          <ScrollView>
            <View className="bg-green-600 h-40 pb-7 items-center justify-center mb-7">
              <Text className="text-white text-7xl font-bold">
                {prova.index + 1}º
              </Text>
              <Text className="text-white text-4xl font-bold">
                Editar Variação
              </Text>
            </View>
            <View className=" items-center">
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
              {questoes.map((questao, index) => (
                <View
                  key={questao.id}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    className=" text-4xl mr-7 font-bold"
                    key={`cabecalho-${index}`}
                    style={{ marginRight: 5 }}
                  >{` ${index + 1}: `}</Text>
                  {Array.from({ length: prova.nAlternativas }, (_, i) =>
                    String.fromCharCode(65 + i)
                  ).map((alternativa, i) => (
                    <Checkbox
                      key={alternativa}
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
                        backgroundColor:
                          gabaritoOriginal[index] === alternativa
                            ? "gray"
                            : "transparent",
                      }}
                      value={gabaritoEditado[index] === alternativa}
                      onValueChange={() =>
                        toggleRespostaSelecionada(index, alternativa)
                      }
                    />
                  ))}
                </View>
              ))}

              <View>
                <TouchableOpacity
                  disabled={disabled}
                  onPress={handleEdit}
                  className={`
         ${disabled ? "opacity-40" : ""}
         bg-green-500 mt-5 w-44 rounded-md p-3 mb-5`}
                >
                  <Text className=" text-center text-base font-bold">
                    Alterar Gabarito
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <View>
            <Text>Não há questões disponíveis.</Text>
          </View>
        );
      }
    } else {
      return (
        <View>
          <Text>Os gabaritos não estão disponíveis.</Text>
        </View>
      );
    }
  }

  return null;
};

export default EditarGabaritoScreen;
