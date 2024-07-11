import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();
import AuthContext from "@/app/AuthContext";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

import { router } from "expo-router";

const AwaitingCode = ({ telefone, isTryingReset }) => {
  const { token } = React.useContext(AuthContext);

  async function handleResendSms() {
    storage.set("isSmsSent", true);
    storage.set("onValidation", true);
    storage.set("smsSentTime", Date.now());

    const response = await fetch(`${API_URL}/professores/sms/reenviar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(
        "Algo inesperado aconteceu, reenvio de token não realizado."
      );
      throw new Error("Erro na resposta da API /professores/sms/reenviar");
    } else {
      console.log("deu bom!");
      router.replace("/");
    }
  }

  const [isSMSSent, setIsSMSSent] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timer, setTimer] = useState(90);
  const [lastFourDigits, setLastFourDigits] = useState("");
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchPhoneDigits = async () => {
      const digits = storage.getString("phoneLastFourDigits");
      setLastFourDigits(digits);
    };

    fetchPhoneDigits();
  }, []);

  useEffect(() => {
    setTimer(timeRemaining / 1000);
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    if (timer === 0) {
      storage.delete("isSmsSent");
      storage.delete("smsSentTime");
    }
  }, [timer]);

  useEffect(() => {
    const isSMSSent = storage.getBoolean("isSmsSent");
    const smsSentTime = storage.getNumber("smsSentTime");
    const currentTime = Date.now();

    if (isSMSSent && smsSentTime) {
      const elapsedTime = currentTime - smsSentTime;
      const remainingTime = 90000 - elapsedTime;

      if (remainingTime > 0) {
        setIsSMSSent(true);
        setTimeRemaining(remainingTime);
      } else {
        storage.delete("isSmsSent");
        storage.delete("smsSentTime");
        storage.delete("phoneLastFourDigits");
      }
    }
  }, []);

  const [code, setCode] = useState(new Array(6).fill(""));
  const [reseting, setReseting] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const inputRefs = useRef([]);
  useEffect(() => {
    const allFieldsFilled = code.every((digit) => digit !== "");
    setDisabled(!allFieldsFilled);
  }, [code]);

  useEffect(() => {
    if (isTryingReset !== undefined) {
      setReseting(true);
    }
  }, [isTryingReset]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const optionsButtons = () => {
    if (reseting) {
      return (
        <>
          <TouchableOpacity
            className="mt-40 rounded-md w-80 h-12 items-center bg-orange-400 mb-8 justify-center"
            onPress={() => handleResendSms()}
          >
            <Text className="text-xl font-bold">Reenviar Código</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <View className=" flex-row space-x-5 mb-8 mt-40">
          {timer === 0 ? (
            <TouchableOpacity
              className=" rounded-md bg-yellow-200 w-40 h-12 items-center justify-center"
              onPress={() => handleResendSms()}
            >
              <Text className="text-lg font-bold">Reenviar Código</Text>
            </TouchableOpacity>
          ) : (
            <View className=" rounded-md bg-yellow-200 w-40 h-12 items-center justify-center">
              <Text>
                Reenviar em: {Math.floor(timer / 60)}:
                {(timer % 60).toString().padStart(2, "0")}
              </Text>
            </View>
          )}
          <TouchableOpacity className=" rounded-md bg-yellow-200 w-40 h-12 items-center justify-center">
            <Text className="text-lg font-bold">Alterar Número</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0 && code[index] === "") {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  async function handleSubmit() {
    const smsCode = code.join("");
    const response = await fetch(`${API_URL}/professores/verificar-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code: smsCode,
      }),
    });

    if (!response.ok) {
      console.log(response);

      console.error("Algo inesperado aconteceu, erro na validação do token.");
      throw new Error("Erro na resposta da API /professor");
    } else {
      storage.delete("isSmsSent");
      storage.delete("onValidation");
      storage.delete("smsSentTime");
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  }

  return (
    <View className="h-full w-full items-center justify-end bg-white">
      <View className="self-center w-80 mb-5">
        <Text className="font-bold text-lg text-center">
          Enviamos um código via SMS para seu número <Text>{telefone}</Text>,
          insira abaixo para validarmos sua conta:
        </Text>
      </View>
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            className="h-12 w-10 rounded-md bg-slate-300 text-black font-bold text-center text-2xl"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </View>
      <TouchableOpacity
        disabled={disabled}
        className="p-3 rounded-md mt-5"
        style={{ backgroundColor: disabled ? "gray" : "green" }}
        onPress={handleSubmit}
      >
        <Text className="font-bold text-lg text-white">Verificar Código</Text>
      </TouchableOpacity>
      {optionsButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1CBA38",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AwaitingCode;
