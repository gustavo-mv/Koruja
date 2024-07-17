import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as FileSystem from "expo-file-system";
import AuthContext from "@/app/AuthContext";
import { Picker } from "@react-native-picker/picker";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const AnaliseGabaritoScreen = ({ URI, dataQR }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [leitura, setLeitura] = useState<any>({});
  const [score, setScore] = useState<{
    correct: number;
    incorrect: number;
    blank: number;
  }>({ correct: 0, incorrect: 0, blank: 0 });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [leitura]);

  const enviarFoto = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      const fileInfo = await FileSystem.getInfoAsync(URI);
      if (!fileInfo.exists) {
        throw new Error("Arquivo não encontrado.");
      }

      formData.append("file", {
        uri: URI,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      formData.append("dataQR", dataQR);

      const response = await fetch(`${API_URL}/gabaritos/upload-imagem`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError("Formato Inválido.");
        throw new Error("Formato Inválido.");
      }
      console.log(responseData);

      setResultData(responseData);
      setLeitura(responseData.leitura || {});
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Erro ao fazer upload da imagem"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (URI) {
      enviarFoto();
    }
  }, [URI]);

  useEffect(() => {
    if (resultData) {
      calculateScore();
    }
  }, [resultData, leitura]);

  const calculateScore = () => {
    const { leitura, dadosProva } = resultData;
    let correct = 0,
      incorrect = 0,
      blank = 0;

    dadosProva.respostas.forEach((resposta: string) => {
      const [questao, gabarito] = resposta.split("-");
      const respostaAluno = leitura[questao];

      if (respostaAluno === gabarito) {
        correct += 1;
      } else if (respostaAluno === null || respostaAluno === "") {
        blank += 1;
      } else {
        incorrect += 1;
      }
    });

    setScore({ correct, incorrect, blank });
  };

  const renderResponses = () => {
    if (!resultData) return null;

    const { dadosProva } = resultData;

    return dadosProva.respostas.map((resposta: string, index: number) => {
      const [questao, gabarito] = resposta.split("-");
      const respostaAluno = leitura[questao] || null;

      let cellStyle = styles.cell;
      if (respostaAluno === gabarito) {
        cellStyle = [styles.cell, styles.correct];
      } else if (respostaAluno === null || respostaAluno === "") {
        cellStyle = [styles.cell, styles.blank];
      } else {
        cellStyle = [styles.cell, styles.incorrect];
      }

      return (
        <View key={index} style={styles.row}>
          <View style={[cellStyle, styles.leftCell]}>
            <Text style={styles.cellText}>{questao}</Text>
          </View>
          <View style={cellStyle}>
            <Picker
              selectedValue={respostaAluno}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setLeitura((prev) => ({
                  ...prev,
                  [questao]: itemValue,
                }));
              }}
            >
              <Picker.Item label="Nulo / Em branco" value={null} />
              {["A", "B", "C", "D", "E", "F"].map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          <View style={[styles.cell, styles.rightCell]}>
            <Text style={styles.cellText}>{gabarito}</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View className="h-full bg-ciano">
      <ScrollView className="h-full bg-ciano mb-8">
        <View className="h-full bg-ciano">
          {error && <Text style={styles.errorText}>{error}</Text>}
          {loading && (
            <View className="items-center h-full w-full justify-center">
              <LottieView
                autoPlay
                loop
                style={{ width: 500, height: 350 }}
                source={require("@/assets/lotties/loadingCorrect.json")}
              />
              <Text className="mb-14 text-2xl font-bold text-white">
                Carregando correção...
              </Text>
              <ActivityIndicator size={60} color={"orange"} />
            </View>
          )}
          {!loading && resultData && (
            <View className="w-full items-center">
              <View className="flex-row space-x-3">
                <View className="flex-col p-2">
                  <View className="rounded-md mb-2">
                    <Text className="font-extrabold text-3xl text-white">
                      {resultData.dadosProva.nomeProva}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-200 font-bold text-lg">
                      {resultData.dadosProva.assunto}
                    </Text>
                  </View>
                </View>
                <View style={styles.header}>
                  <Text
                    className={`text-7xl text-white font-bold rounded-md ${
                      (score.correct / resultData.dadosProva.respostas.length) *
                        10 >=
                      8
                        ? "bg-green-500"
                        : (score.correct /
                            resultData.dadosProva.respostas.length) *
                            10 >=
                          5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } p-2 rounded`}
                  >
                    {(
                      (score.correct / resultData.dadosProva.respostas.length) *
                      10
                    ).toFixed(2)}
                  </Text>
                  <View className="flex-row space-x-3 pr-3 mt-2">
                    <Text style={styles.headerText}>
                      Acertos: {score.correct}
                    </Text>
                    <Text style={styles.headerText}>
                      Erros: {score.incorrect}
                    </Text>
                  </View>
                  <Text style={styles.headerText}>
                    Nulos / Em branco: {score.blank}
                  </Text>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={[styles.cell, styles.headerCell]}>
                    <Text style={styles.headerText}>Questão</Text>
                  </View>
                  <View style={[styles.cell, styles.headerCell]}>
                    <Text style={styles.headerText}>Aluno</Text>
                  </View>
                  <View style={[styles.cell, styles.headerCell]}>
                    <Text style={styles.headerText}>Gabarito</Text>
                  </View>
                </View>
                {renderResponses()}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity className="bg-laranja w-80 fixed bottom-6 h-16 self-center rounded-md items-center justify-center flex-row space-x-3">
          <Text className="font-bold text-lg text-white">
            Corrigir Novamente
          </Text>
          <FontAwesome6 name="camera-rotate" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B2438",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
  loadingText: {
    color: "white",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  table: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#e86800",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  leftCell: {
    borderRightWidth: 0,
  },
  rightCell: {
    borderLeftWidth: 0,
  },
  headerCell: {
    backgroundColor: "#345e5e",
  },
  cellText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 100,
  },
  correct: {
    backgroundColor: "#d4edda",
  },
  incorrect: {
    backgroundColor: "#f8d7da",
  },
  blank: {
    backgroundColor: "#fff3cd",
  },
});

export default AnaliseGabaritoScreen;
