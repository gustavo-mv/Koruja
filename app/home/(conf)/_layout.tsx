import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="code"
        options={{
          headerStyle: { backgroundColor: "#0B2438" },
          title: "",
          headerShown: true,
          headerTintColor: "#e86800",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="logs"
        options={{
          title: "Registros da Conta",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white", fontWeight: "bold" },
          headerStyle: { backgroundColor: "#0B2438" },
          headerTintColor: "#e86800",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="assinarPremium"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerTintColor: "#e86800",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="creditCard"
        options={{
          headerStyle: { backgroundColor: "#0B2438" },
          title: "",
          headerShown: true,
          headerTintColor: "#e86800",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
