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
    </Stack>
  );
}
