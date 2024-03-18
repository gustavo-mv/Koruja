import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="new-entry-modal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
