import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import AuthContext from "@/app/AuthContext";
import { Picker } from "@react-native-picker/picker";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnaliseGabaritoScreen = ({ base64, dataQR }: any) => {
  const [convertedBase64, setConvertedBase64] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultData, setResultData] = React.useState<any>(null);
  const [leitura, setLeitura] = React.useState<any>({});

  const buttonY = useSharedValue(100); // Começa fora da tela

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  async function enviarFoto() {
    const base64WithPrefix = `data:image/jpeg;base64,${convertedBase64}`;
    console.log(base64WithPrefix.substring(0, 100));

    try {
      const response = await fetch(`${API_URL}/gabaritos/upload-imagem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dataQR: dataQR,
          imageBase64: base64WithPrefix,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError("Formato Inválido.");
        setLoading(false);
        console.log(errorResponse);
        throw new Error("Formato Inválido.");
      } else {
        const data = await response.json();
        setResultData(data);
        setLeitura(data.leitura || {});
        setLoading(false);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Erro ao fazer upload da imagem"
      );
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function conv() {
      if (base64 !== null) {
        const convertedString = await FileSystem.readAsStringAsync(base64, {
          encoding: "base64",
        });
        setConvertedBase64(convertedString);
      }
    }
    conv();
  }, [base64]);

  React.useEffect(() => {
    if (convertedBase64 !== "") {
      setLoading(true);
      enviarFoto();
    }
  }, [convertedBase64]);

  React.useEffect(() => {
    if (resultData) {
      buttonY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    }
  }, [resultData]);

  const calculateScore = () => {
    if (!resultData) return { correct: 0, incorrect: 0, blank: 0 };

    const { leitura, respostas } = resultData;
    let correct = 0;
    let incorrect = 0;
    let blank = 0;

    respostas.forEach((resposta: string) => {
      const [questao, gabarito] = resposta.split("-");
      const respostaAluno = leitura[questao];

      if (respostaAluno === gabarito) {
        correct += 1;
      } else if (!respostaAluno) {
        blank += 1;
      } else {
        incorrect += 1;
      }
    });

    return { correct, incorrect, blank };
  };

  const { correct, incorrect, blank } = calculateScore();

  const renderResponses = () => {
    if (!resultData) return null;

    const { respostas } = resultData;

    return respostas.map((resposta: string, index: number) => {
      const questao = resposta.split("-")[0];
      const gabarito = resposta.split("-")[1];
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
                setLeitura((prev: any) => {
                  const updatedLeitura = { ...prev, [questao]: itemValue };
                  return updatedLeitura;
                });
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

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonY.value }],
      position: "fixed",
      bottom: 30,
      left: "50%",
      marginLeft: -75, // Ajusta para centralizar
    };
  });

  return (
    <ScrollView className="h-full bg-ciano">
      <View className="h-full bg-ciano">
        {error && <Text style={styles.errorText}>{error}</Text>}
        {loading && (
          <Text style={styles.loadingText}>Processando imagem...</Text>
        )}
        {!loading && resultData && (
          <View className="w-full items-center">
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Nota:{" "}
                {((correct / resultData.respostas.length) * 10).toFixed(2)}
              </Text>
              <Text style={styles.headerText}>Acertos: {correct}</Text>
              <Text style={styles.headerText}>Erros: {incorrect}</Text>
              <Text style={styles.headerText}>Nulos/Em branco: {blank}</Text>
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
        <Text>{dataQR}</Text>
        <Animated.View style={[animatedButtonStyle]}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Escanear novamente</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B2438", // Fundo ciano
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
    width: "85%", // Ocupa 85% da tela
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
    fontWeight: "bold", // Negrito
  },
  picker: {
    height: 50,
    width: 100,
  },
  correct: {
    backgroundColor: "#d4edda", // Verde
  },
  incorrect: {
    backgroundColor: "#f8d7da", // Vermelho
  },
  blank: {
    backgroundColor: "#fff3cd", // Amarelo
  },
  button: {
    backgroundColor: "#e86800",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AnaliseGabaritoScreen;
