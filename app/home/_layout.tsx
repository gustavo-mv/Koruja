import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(turmas)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(scan)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(conf)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
