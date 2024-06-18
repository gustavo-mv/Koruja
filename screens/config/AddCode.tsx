import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

const AddCode = ({ token }: any) => {
  const [disabled, setDisabled] = React.useState(true);
  const [codigoAtivado, setCodigoAtivado] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [code, setCode] = React.useState("");
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const animationHand = React.useRef<LottieView>(null);
  const animationConfetti = React.useRef<LottieView>(null);
  const animationChecked = React.useRef<LottieView>(null);

  React.useEffect(() => {
    setTimeout(() => {
      animationHand.current?.play(0, 120);

      const timer = setTimeout(() => {
        animationHand.current?.pause();
        animationHand.current?.play(120, 120);
      }, 1900);

      return () => clearTimeout(timer);
    }, 600);
  }, []);

  async function handleNext() {
    setDisabled(true);
    const response = await fetch(`${API_URL}/professores/resgatar-codigo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        codigo: code,
      }),
    });

    if (response.ok) {
      setCodigoAtivado(true);
      setTimeout(() => {
        router.replace("/");
      }, 3500);
    } else {
      switch (response.status) {
        case 401:
          setError("Você não possui autorização para usar o código.");
          break;
        case 400:
          setError("O código utilizado não existe.");
          break;
        case 406:
          setError("Código já resgatado pela sua conta.");
          break;
        case 500:
          setError("Erro no servidor, por favor tente mais tarde.");
          break;
        default:
          setError("Um erro inesperado aconteceu, tente mais tarde.");
      }
    }
  }

  React.useEffect(() => {
    if (code.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [code]);

  React.useEffect(() => {
    if (codigoAtivado) {
      setTimeout(() => {
        animationConfetti.current?.play(0, 241);
        animationChecked.current?.play(0, 71);

        const timer = setTimeout(() => {
          animationConfetti.current?.pause();
          animationChecked.current?.pause();

          animationConfetti.current?.play(241, 241);
          animationChecked.current?.play(71, 71);
        }, 1900);

        return () => clearTimeout(timer);
      }, 600);
    }
  }, [codigoAtivado]);

  return (
    <View className="h-full bg-white">
      <Modal visible={codigoAtivado} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              autoPlay={false}
              ref={animationConfetti}
              style={{
                width: 700,
                height: 1200,
                backgroundColor: "transparent",
                position: "absolute",
                top: -470,
              }}
              source={require("./../../assets/lotties/confetti.json")}
            />
            <LottieView
              autoPlay={false}
              ref={animationChecked}
              style={{
                width: 350,
                height: 200,
                backgroundColor: "transparent",
                top: -20,
              }}
              source={require("./../../assets/lotties/checked.json")}
            />
            <Text className="font-bold text-xl w-52 text-center">
              Código Resgatado com Sucesso!
            </Text>
          </View>
        </View>
      </Modal>

      <LottieView
        autoPlay={false}
        ref={animationHand}
        style={{
          width: 350,
          height: 300,
          backgroundColor: "transparent",
          position: "absolute",
          top: -70,
        }}
        source={require("./../../assets/lotties/codeVerification.json")}
      />
      <View className="p-5 mt-48">
        <Text className="text-xl font-bold text-center">
          Insira o código pra resgatar uma Assinatura Patrocinada!
        </Text>
        <TextInput
          className="bg-gray-200 w-52 h-12 self-center mt-5 text-2xl p-2 font-extrabold rounded-md text-center"
          autoCapitalize="characters"
          autoFocus={true}
          onChangeText={(value) => setCode(value)}
        ></TextInput>
        {error && (
          <Text className="text-red-500 font-bold text-center pt-2">
            {error}
          </Text>
        )}
        <TouchableOpacity
          disabled={disabled}
          style={{ backgroundColor: "#1CBA38", opacity: disabled ? 0.4 : 1 }}
          onPress={handleNext}
          className="self-center m-4 mt-2 w-40 rounded-md items-center justify-center p-3 flex-row space-x-4"
        >
          <Text
            className="font-bold text-xl"
            style={{ color: disabled ? "black" : "white" }}
          >
            Verificar
          </Text>
          <FontAwesome5
            name="chevron-circle-right"
            size={24}
            color={disabled ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 119,
    height: 122,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatarOption: {
    margin: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedAvatarOption: {
    borderColor: "blue",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 7,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddCode;
