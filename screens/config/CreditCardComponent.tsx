import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { CreditCard, CARD_SIDE } from "@/components/credit-card";
import { Input } from "@/components/input";
import AuthContext from "@/app/AuthContext";
import { router } from "expo-router";

export function CreditCardComponent({ cpfParam, nomeCompletoParam }) {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState(cpfParam || "");
  const [nomeCompleto, setNomeCompleto] = useState(nomeCompletoParam || "");
  const [endereco, setEndereco] = useState("");
  const [nEndereco, setNEndereco] = useState("");
  const [cep, setCEP] = useState("");
  const [telefone, setTelefone] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [nameValid, setNameValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [cpfValid, setCpfValid] = useState(false);
  const [nomeCompletoValid, setNomeCompletoValid] = useState(false);
  const [enderecoValid, setEnderecoValid] = useState(false);
  const [nEnderecoValid, setNEnderecoValid] = useState(false);
  const [cepValid, setCepValid] = useState(false);
  const [telefoneValid, setTelefoneValid] = useState(false);

  const scrollViewRef = useRef(null);
  const cardSide = useSharedValue(CARD_SIDE.front);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const nomeCompletoRef = useRef(null);
  const emailRef = useRef(null);
  const numberCard = useRef(null);

  const cpfRef = useRef(null);
  const cepRef = useRef(null);
  const enderecoRef = useRef(null);
  const nEnderecoRef = useRef(null);
  const telefoneRef = useRef(null);

  function handleCpfChange(value) {
    const maskedCpf = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCPF(maskedCpf);
    setCpfValid(maskedCpf.length === 14); // Verifica se o CPF tem 11 dígitos
  }

  function maskCpf(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function maskDate(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d{1,2})$/, "$1/$2");
  }

  function handleDateChange(value) {
    const maskedDate = maskDate(value);
    setDate(maskedDate);
    setDateValid(maskedDate.length === 5); // Verifica se a data tem o formato MM/AA
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  async function handleCreate() {
    console.log("Creating with data: ", {
      name,
      number,
      date,
      code,
      email,
      cpf,
      nomeCompleto,
      endereco,
      nEndereco,
      cep,
      telefone,
    });

    try {
      const response = await fetch(`${API_URL}/pagamentos/mensal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: "Assinatura Attlas Assistente Mensal",
          creditCard: {
            holderName: name,
            number: number,
            expiryMonth: date.split("/")[0],
            expiryYear: `20${date.split("/")[1]}`,
            ccv: code,
          },
          creditCardHolderInfo: {
            name: nomeCompleto,
            email: email,
            cpfCnpj: cpf.replace(/\D/g, ""), // Remove a máscara do CPF
            postalCode: cep,
            addressNumber: nEndereco,
            addressComplement: endereco,
            phone: telefone,
            mobilePhone: telefone,
          },
        }),
      });

      if (!response.ok) {
        setError("Algo inesperado aconteceu, erro na criação de assinatura.");
        throw new Error("Erro na resposta da API /provas");
      } else {
        router.replace("/");
      }
    } catch (e) {
      if (typeof e === "string") {
        setError(e.toUpperCase() || "Erro ao fazer login");
      } else if (e instanceof Error) {
        setError(e.message || "Erro ao fazer login");
      }
    }
  }

  useEffect(() => {
    if (
      nameValid &&
      numberValid &&
      dateValid &&
      codeValid &&
      emailValid &&
      cpfValid &&
      nomeCompletoValid &&
      enderecoValid &&
      nEnderecoValid &&
      cepValid &&
      telefoneValid
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    nameValid,
    numberValid,
    dateValid,
    codeValid,
    emailValid,
    cpfValid,
    nomeCompletoValid,
    enderecoValid,
    nEnderecoValid,
    cepValid,
    telefoneValid,
  ]);

  function scrollToEnd() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }

  useEffect(() => {
    if (cpfParam) {
      const mask = maskCpf(cpfParam);
      setCPF(mask);
    }
  }, [cpfParam]);

  function validateName(value) {
    setName(value);
    setNameValid(value.trim().length > 0);
  }

  function validateNumber(value) {
    setNumber(value);
    setNumberValid(value.trim().length === 16);
  }

  function validateCode(value) {
    setCode(value);
    setCodeValid(value.trim().length === 3);
  }

  function validateEmail(value) {
    setEmail(value);
    setEmailValid(/\S+@\S+\.\S+/.test(value));
  }

  function validateNomeCompleto(value) {
    setNomeCompleto(value);
    setNomeCompletoValid(value.trim().length > 0);
  }

  function validateEndereco(value) {
    setEndereco(value);
    setEnderecoValid(value.trim().length > 0);
  }

  function validateNEndereco(value) {
    setNEndereco(value);
    setNEnderecoValid(value.trim().length > 0);
  }

  function validateCEP(value) {
    setCEP(value);
    setCepValid(value.trim().length === 8);
  }

  function validateTelefone(value) {
    setTelefone(value);
    setTelefoneValid(value.trim().length > 0);
  }

  return (
    <ScrollView ref={scrollViewRef}>
      <View className="bg-black p-2">
        <View className="mb-20 mt-5">
          <Text className="text-white text-3xl font-extrabold">
            Dados de Pagamento
          </Text>
          <View className="bg-green-500 w-96 top-10 h-2 rounded-br-lg absolute right-20"></View>
        </View>
        <CreditCard
          cardSide={cardSide}
          data={{
            name,
            number: number.replace(/(\d{4})(?=\d)/g, "$1 "),
            date,
            code,
          }}
        />
        <View style={styles.form} className="mt-10">
          <Text className="text-white font-bold">Nome do Titular:</Text>
          <Input
            placeholder="Nome do titular"
            onFocus={showFrontCard}
            onChangeText={validateName}
            returnKeyType="next"
            style={[
              styles.input,
              nameValid ? styles.inputValid : styles.inputInvalid,
            ]}
          />
          <Text className="text-white font-bold">Número do Cartão:</Text>
          <Input
            placeholder="Número do cartão"
            keyboardType="numeric"
            maxLength={16}
            onFocus={showBackCard}
            onChangeText={validateNumber}
            returnKeyType="next"
            onSubmitEditing={() => dateRef.current.focus()}
            style={[
              styles.input,
              numberValid ? styles.inputValid : styles.inputInvalid,
            ]}
          />
          <View style={styles.inputInLine}>
            <View className="flex-col mt-3 space-y-3 justify-center items-center ml-5 mr-20">
              <Text className="text-white font-bold">Data Expiração:</Text>
              <Input
                placeholder="01/02"
                keyboardType="numeric"
                maxLength={5}
                style={[
                  styles.inputSmall,
                  styles.input,
                  dateValid ? styles.inputValid : styles.inputInvalid,
                ]}
                onFocus={showBackCard}
                onChangeText={handleDateChange}
                returnKeyType="next"
              />
            </View>
            <View className="flex-col mt-3 space-y-3 justify-center items-center">
              <Text className="text-white font-bold">CVV:</Text>
              <Input
                placeholder="123"
                keyboardType="numeric"
                maxLength={3}
                style={[
                  styles.inputSmall,
                  styles.input,
                  codeValid ? styles.inputValid : styles.inputInvalid,
                ]}
                onFocus={showBackCard}
                onChangeText={validateCode}
                returnKeyType="done"
                onSubmitEditing={() => nomeCompletoRef.current.focus()}
              />
            </View>
          </View>
        </View>
        <View className="bg-black p-2 mt-10 mb-2">
          <View className="mb-3">
            <Text className="text-white text-3xl font-extrabold">
              Dados de Cobrança
            </Text>
            <View className="bg-yellow-400 w-96 top-10 h-2 rounded-br-lg absolute right-20"></View>
          </View>
          <View className="pl-1">
            <Text className="text-white font-bold mt-5">Nome Completo:</Text>
            <TextInput
              value={nomeCompleto}
              ref={nomeCompletoRef}
              autoCapitalize="sentences"
              placeholder="Nome Completo"
              className="p-1 w-80 text-xl mb-4 h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateNomeCompleto}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              style={[
                styles.input,
                nomeCompletoValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">E-mail:</Text>
            <TextInput
              ref={emailRef}
              keyboardType="email-address"
              placeholder="E-mail"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateEmail}
              returnKeyType="next"
              onSubmitEditing={() => cpfRef.current.focus()}
              style={[
                styles.input,
                emailValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">CPF:</Text>
            <TextInput
              ref={cpfRef}
              value={cpf}
              placeholder="CPF"
              keyboardType="numeric"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={handleCpfChange}
              returnKeyType="next"
              onSubmitEditing={() => cepRef.current.focus()}
              style={[
                styles.input,
                cpfValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">CEP:</Text>
            <TextInput
              ref={cepRef}
              placeholder="CEP"
              keyboardType="numeric"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateCEP}
              returnKeyType="next"
              onSubmitEditing={() => enderecoRef.current.focus()}
              style={[
                styles.input,
                cepValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">Endereço:</Text>
            <TextInput
              ref={enderecoRef}
              autoCapitalize="sentences"
              placeholder="Endereço"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateEndereco}
              returnKeyType="next"
              onFocus={scrollToEnd}
              onSubmitEditing={() => nEnderecoRef.current.focus()}
              style={[
                styles.input,
                enderecoValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">
              Número de Endereço:
            </Text>
            <TextInput
              ref={nEnderecoRef}
              placeholder="Número de Endereço"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateNEndereco}
              returnKeyType="next"
              onFocus={scrollToEnd}
              onSubmitEditing={() => telefoneRef.current.focus()}
              style={[
                styles.input,
                nEnderecoValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
            <Text className="text-white font-bold mt-5">Telefone:</Text>
            <TextInput
              ref={telefoneRef}
              placeholder="Telefone"
              keyboardType="numeric"
              className="p-1 w-80 text-xl h-12 rounded-md m-1 font-bold bg-blue-100"
              onChangeText={validateTelefone}
              returnKeyType="done"
              onFocus={scrollToEnd}
              style={[
                styles.input,
                telefoneValid ? styles.inputValid : styles.inputInvalid,
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            disabled ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          onPress={handleCreate}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: 32,
    padding: 15,
    borderRadius: 5,
  },
  buttonEnabled: {
    backgroundColor: "#1CBA38",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    gap: 12,
  },
  inputInLine: {
    flexDirection: "row",
    gap: 12,
  },
  inputSmall: {
    width: 74,
  },
  input: {
    padding: 10,
    borderRadius: 5,
  },
  inputValid: {
    backgroundColor: "rgba(138, 232, 128, 0.7)",
  },
  inputInvalid: {
    backgroundColor: "rgba(255, 217, 233, 0.7)",
  },
});
