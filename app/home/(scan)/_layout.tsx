import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="criarProva"
        options={{
          title: "Criar Prova",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="dadosProvaCriar"
        options={{
          title: "Nome e Assunto",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="infoCriarQuestoes"
        options={{
          title: "Questões e Alternativas",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="telaGabarito"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#16a34a" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
