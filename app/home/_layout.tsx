import { Stack, useGlobalSearchParams } from "expo-router";
import React from "react";

export default function HomeLayout() {
  const { nome } = useGlobalSearchParams();
  const titulo = nome ? nome.toString() : "";
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
          title: titulo,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
