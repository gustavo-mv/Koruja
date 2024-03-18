import React from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useAuth } from "./../../authContext";

import { useRouter } from "expo-router";

const router = useRouter();

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [error, setError] = React.useState("");
  const { login } = useAuth();
  const [loginDisable, setLoginDisable] = React.useState(true);
  const [color, setColor] = React.useState("opacity-20");

  React.useEffect(() => {
    if (email.length > 4 && senha.length > 4) {
      setColor("opacity-100 ");
      setLoginDisable(false);
    } else {
      setColor("opacity-50");
      setLoginDisable(true);
    }
  }, [email, senha]);

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
        throw new Error("Usuário ou Senha Incorretos.");
      }

      const data = await response.json();
      console.log(data.access_token);
      const token = data.access_token;
      router.replace("/(tabs)/home");
      login(token);
    } catch (error) {
      setError(error.message || "Erro ao fazer login");
      console.log("chegou aqui");
      console.log(API_URL);
      console.log(email, senha);
      console.log(process.env);
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
          title="Login"
          disabled={loginDisable}
          onPress={handleLogin}
        >
          <Text
            style={styles.text}
            className={` w-32 ${color} bg-green-500 text-gray-900  pt-1 rounded-xl h-10 text-lg font-bold text-center`}
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
