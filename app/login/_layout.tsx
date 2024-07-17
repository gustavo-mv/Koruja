import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loginForm"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          title: "Esqueceu a senha",
          headerTitleAlign: "center",
          headerTitleStyle: { fontWeight: "bold" },
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />

      <Stack.Screen
        name="awaitingCode"
        options={{
          headerShown: false,
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="criarConta"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="validationToGoToPassword"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="validationToGoToEmail"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="validationToGoToTelephone"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />

      <Stack.Screen
        name="contaCriada"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
    </Stack>
  );
}
