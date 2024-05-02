import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CriarProvaInfoFinal } from "@/models/CriarProvaInfoFinal";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import disciplina from "@/app/home/(turmas)/disciplina";

const EditarGabaritoScreen = (prova) => {
  const [letras, setLetras] = React.useState<string>("");
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

      // Função para atualizar o gabarito editado conforme o usuário seleciona ou desmarca as respostas
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

          console.log(gabaritoFinal[0].questoes.create);

          if (!response.ok) {
            console.log("Erro ao editar o Gabarito");
            throw new Error("Erro na resposta da API /criarProva");
          } else {
            router.replace("/");
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
          <View>
            {questoes.map((questao, index) => (
              <View
                key={questao.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text>{`Questão ${index + 1}: `}</Text>
                {Array.from({ length: 6 }, (_, i) =>
                  String.fromCharCode(65 + i)
                ).map((alternativa, i) => (
                  <Checkbox
                    key={alternativa}
                    style={{
                      marginLeft: 5,
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
                <Text>{`Resposta correta: ${gabaritoOriginal[index]}`}</Text>
              </View>
            ))}
            <Text className="text-black">Oi {prova.assunto}</Text>

            <View>
              {questoes.map((item, index) => (
                <View key={index} className=" text-xl text-black">
                  <Text>{item.id}</Text>
                </View>
              ))}
              <TouchableOpacity
                disabled={disabled}
                onPress={handleEdit}
                className={`
         ${disabled ? "opacity-40" : ""}
         bg-green-500 mt-5 w-32 rounded-md p-3 mb-5`}
              >
                <Text className=" text-center text-base font-bold">
                  Criar Prova
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        // Trate o caso em que não há questões
        return (
          <View>
            <Text className="text-black">Oi {prova.assunto}</Text>
            <Text>Não há questões disponíveis.</Text>
          </View>
        );
      }
    } else {
      // Trate o caso em que gabaritos não é um array
      return (
        <View>
          <Text className="text-black">Oi {prova.assunto}</Text>
          <Text>Os gabaritos não estão disponíveis.</Text>
        </View>
      );
    }
  }

  return null;
};

export default EditarGabaritoScreen;
