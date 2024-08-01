import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import IndexCard from "./IndexCard";
import GabaritosCard from "./GabaritosCard";
import AtividadeCard from "./AtividadeCard";
import { router } from "expo-router";
import HowToCards from "./HowToCards";

const HomeIndex = () => {
  return (
    <View className="bg-ciano mt-8">
      <View className="pb-3">
        <View className="flex-row w-full">
          <Text className="w-full text-4xl font-extrabold pl-2 pb-2 text-white border-b-2 border-laranja mb-2">
            Como Usar
          </Text>
          <Text className="absolute self-center right-3 font-bold text-white">
            Arraste para direita {">"}
          </Text>
        </View>
        <HowToCards />
      </View>

      <View>
        <Text className="w-full text-4xl font-extrabold pl-2 pb-2 text-white border-b-2 border-laranja mb-2">
          Assine o Premium
        </Text>
        <TouchableOpacity>
          <View className="flex-row items-center bg-yellow-400 p-2rounded-lg">
            <Image
              source={require("@/assets/trophy.png")}
              className="w-40 h-40 mr-2"
            />
            <Text className="text-2xl font-bold p-5 w-60 text-center">
              Assine o Premium e crie provas ilimitadas!
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mt-3">
        <Text className="text-4xl font-extrabold pl-2 pb-2 text-white border-b-2 border-laranja mb-3">
          Provas
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.replace("/home/(tabs)/scan");
            router.push("/home/(scan)/criarProva");
          }}
        >
          <GabaritosCard />
        </TouchableOpacity>
      </View>

      <View className="mt-3 mb-5">
        <Text className="text-4xl font-extrabold pl-2 pb-2 text-white border-b-2 border-laranja mb-3">
          Atividades
        </Text>
        <ScrollView horizontal={true} className="ml-2">
          <AtividadeCard
            nomeMateria="Biologia"
            cor="red"
            dia="04"
            ext="Quarta"
            completa="04/06/2024"
            descricao="Experimento para observar o processo de fotossíntese em plantas. Documente suas observações e discuta os principais conceitos envolvidos na produção de energia nas células vegetais."
          />
          <AtividadeCard
            nomeMateria="Literatura"
            cor="brown"
            dia="17"
            ext="Segundas"
            completa="17/06/2024"
            descricao="Resumo de um romance clássico da literatura brasileira e analise os principais temas, personagens e estilos literários presentes na obra. Escreva um ensaio crítico discutindo o impacto cultural e social do romance."
          />
          <AtividadeCard
            nomeMateria="Matemática"
            cor="orange"
            dia="15"
            ext="Segunda"
            completa="15/06/2024"
            descricao="Resolva uma série de problemas de trigonometria envolvendo os conceitos de seno, cosseno e tangente. Apresente suas soluções passo a passo e explique os princípios trigonométricos utilizados."
          />
          <AtividadeCard
            nomeMateria="Física"
            cor="green"
            dia="19"
            ext="Sexta"
            completa="19/06/2024"
            descricao="Investigar as leis do movimento de Newton. Utilize um carrinho e uma rampa inclinada para analisar a relação entre força, massa e aceleração."
          />
          <AtividadeCard
            nomeMateria="Química"
            cor="blue"
            dia="23"
            ext="Quinta"
            completa="23/06/2024"
            descricao="Escolher uma reação química e determine a ordem da reação, a constante de velocidade e os fatores que afetam a taxa de reação."
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeIndex;
