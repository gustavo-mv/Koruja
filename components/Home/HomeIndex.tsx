import { View, Text, ScrollView } from "react-native";
import React from "react";
import IndexCard from "./IndexCard";
import GabaritosCard from "./GabaritosCard";
import AtividadeCard from "./AtividadeCard";

const HomeIndex = () => {
  return (
    <View>
      <GabaritosCard />
      <View className=" mt-3">
        <Text className=" text-4xl font-extrabold pl-2 pb-2">Atividades:</Text>
        <ScrollView horizontal={true} className=" ml-2">
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
      <IndexCard />
      <IndexCard />
      <IndexCard />
      <IndexCard />
    </View>
  );
};
export default HomeIndex;
