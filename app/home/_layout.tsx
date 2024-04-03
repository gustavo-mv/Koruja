import { Stack, useGlobalSearchParams } from "expo-router";
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
        name="novaturma"
        options={{ title: "Adicionar Turma", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="[idturma]"
        options={{
          title: "",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "#1CBA38",
        }}
      />
    </Stack>
  );
}
