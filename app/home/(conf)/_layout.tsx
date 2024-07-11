import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="code"
        options={{
          title: "",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="assinarPremium"
        options={{
          title: "",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="creditCard"
        options={{
          headerStyle: { backgroundColor: "black" },
          title: "",
          headerShown: true,
          headerTintColor: "white",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
