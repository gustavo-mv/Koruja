import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="novaturma"
        options={{
          title: "Adicionar Turma",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="[turmaId]"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
        }}
      />
      <Stack.Screen
        name="criarDisciplina"
        options={{
          title: "Adicionar Disciplina",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="disciplina"
        options={{
          title: "",
          headerStyle: {},
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
