import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="criarProva"
        options={{
          title: "Criar Gabarito",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="corrigir"
        options={{
          title: "",
          headerStyle: {},
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="dadosProvaCriar"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="infoCriarQuestoes"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="telaGabarito"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#e86800" },
          headerShadowVisible: false,
          headerTintColor: "#0B2438",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="provaCriada"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="selecionarVariacoes"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },

          headerShadowVisible: false,
          headerTintColor: "#e86800",
          headerTitleAlign: "center",
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="listaDeGabaritos"
        options={{
          title: "",
          headerStyle: { backgroundColor: "black" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="provaInfo"
        options={{
          title: "",
          headerStyle: {},
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="editarGabarito"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="downloadProva"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="analiseGabarito"
        options={{
          title: "",
          headerStyle: { backgroundColor: "#0B2438" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
