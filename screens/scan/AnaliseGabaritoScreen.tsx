import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as FileSystem from "expo-file-system";
import AuthContext from "@/app/AuthContext";
import { Picker } from "@react-native-picker/picker";
import LottieView from "lottie-react-native";
import { Animated } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";

const { width, height } = Dimensions.get("window");

const AnaliseGabaritoScreen = ({ URI, dataQR }: any) => {
  const imageWidth = width * 0.8;
  const imageHeight = height * 0.8;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [leitura, setLeitura] = useState<any>({});
  const [score, setScore] = useState<{
    correct: number;
    incorrect: number;
    blank: number;
  }>({ correct: 0, incorrect: 0, blank: 0 });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  // Use useFocusEffect to reset state when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      // Reset state when screen is focused
      setLoading(false);
      setError(null);
      setResultData(null);
      setLeitura({});
      setScore({ correct: 0, incorrect: 0, blank: 0 });
    }, [])
  );

  useEffect(() => {
    if (resultData) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [resultData]);

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

  const calculateScore = React.useCallback(() => {
    if (!resultData || !resultData.dadosProva) return;

    const { dadosProva } = resultData;
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
  }, [resultData, leitura]);

  useEffect(() => {
    if (resultData) {
      calculateScore();
    }
  }, [resultData, leitura, calculateScore]);

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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {error && (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-2xl text-center p-4 mt-10 text-white font-bold">
                Não foi possível encontrar os pontos do gabarito {":("}
              </Text>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-laranja p-3 rounded-md mt-5"
              >
                <Text className="text-white font-bold text-xl">
                  Tente novamente
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {loading && (
            <View style={styles.loadingContainer}>
              <LottieView
                autoPlay
                loop
                style={styles.loadingAnimation}
                source={require("@/assets/lotties/loadingCorrect.json")}
              />
              <Text style={styles.loadingText}>Carregando correção...</Text>
              <ActivityIndicator size={60} color={"orange"} />
            </View>
          )}
          {!loading && resultData && (
            <View style={styles.resultsContainer}>
              <View className="flex-row space-x-4">
                <View className="self-start pt-4 w-52 p-2">
                  <Text className="text-white text-3xl font-bold">
                    {resultData.dadosProva.nomeProva}
                  </Text>
                  <Text style={styles.headerSubject}>
                    {resultData.dadosProva.assunto}
                  </Text>
                </View>
                <View className=" w-44">
                  <Text
                    className="text-6xl text-center p-2 font-bold text-white w-full"
                    style={[
                      {
                        backgroundColor:
                          (score.correct /
                            resultData.dadosProva.respostas.length) *
                            10 >=
                          8
                            ? "#28a745"
                            : (score.correct /
                                resultData.dadosProva.respostas.length) *
                                10 >=
                              5
                            ? "#ffc107"
                            : "#dc3545",
                      },
                    ]}
                  >
                    {(
                      (score.correct / resultData.dadosProva.respostas.length) *
                      10
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View className="flex-row m-5 space-x-12 self-center items-center justify-center w-full">
                <View className="flex-col">
                  <Text className="text-white font-bold text-lg">
                    Acertos: {score.correct}
                  </Text>
                  <Text className="text-white font-bold text-lg">
                    Erros: {score.incorrect}
                  </Text>
                </View>
                <Text className="text-white font-bold text-lg">
                  Nulos / Em branco: {score.blank}
                </Text>
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
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            router.back();
          }}
        >
          <Text className="font-bold text-white text-lg mr-2">
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
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#0B2438",
    marginBottom: 80,
  },
  content: {
    flex: 1,
  },
  errorText: {
    color: "red",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingAnimation: {
    width: 500,
    height: 350,
  },
  loadingText: {
    marginBottom: 14,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  resultsContainer: {
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  headerSubject: {
    fontSize: 18,
    color: "gray",
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 50,
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  scoreDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  scoreDetailText: {
    fontSize: 18,
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
  retryButton: {
    backgroundColor: "#FFA500",
    position: "absolute",
    bottom: 10,
    padding: 10,
    height: 60,
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  retryButtonText: {
    fontSize: 18,
    color: "white",
  },
  downloadButton: {
    backgroundColor: "#007BFF",
    width: 150,
    position: "absolute",
    bottom: 10,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButtonText: {
    fontSize: 18,
    color: "white",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
});

export default AnaliseGabaritoScreen;
