import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="novaturma"
        options={{
          title: "Adicionar Turma",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="[turmaId]"
        options={{
          title: "",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "#1CBA38",
        }}
      />
      <Stack.Screen
        name="disciplina"
        options={{
          title: "",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "#1CBA38",
        }}
      />
      <Stack.Screen
        name="criarDisciplina"
        options={{
          title: "Adicionar Disciplina",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
