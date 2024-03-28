import React from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AuthContext from "./../AuthContext";

import { useRouter } from "expo-router";

const router = useRouter();

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { login } = React.useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        setError("Usuário ou Senha Incorretos.");
        throw new Error("Usuário ou Senha Incorretos.");
      } else {
        const data = await response.json();
        console.log(data.access_token);
        const token = data.access_token;
        login(token);
      }
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
        setError(e || "Erro ao fazer login");
      } else if (e instanceof Error) {
        e.message;
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center w-100">
      <View style={styles.imageContainer}>
        <Image
          source={require("./../../assets/attlasAssistente.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View className="mb-5 ">
        {error && (
          <Text className="text-center text-lg font-medium text-red-500">
            {error}
          </Text>
        )}
        <Text className="mb-2 text-sm font-medium text-gray-900">Usuário</Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5"
          placeholder="Nome de usuário"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View className="mb-5 ">
        <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Senha
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-80 p-2.5"
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>
      <View className="flex flex-row w-100 items-center">
        <TouchableOpacity>
          <Text className="mr-5">Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-32"
          disabled={email.length > 4 && senha.length > 4 ? false : true}
          onPress={handleLogin}
        >
          <Text
            className={` w-32 ${
              email.length > 4 && senha.length > 4
                ? "opacity-100"
                : "opacity-40"
            } bg-green-500 text-gray-900  pt-1 rounded-xl h-10 text-lg font-bold text-center`}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default LoginForm;
