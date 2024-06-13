import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const HeaderHome: React.FC<{ nome: string }> = ({ nome }) => {
  const nomeFormt = nome.split(" ")[0];

  const horaAtual = moment().hour();
  let saudacao;

  if (horaAtual >= 6 && horaAtual < 12) {
    saudacao = "Bom dia";
  } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  return (
    <View className=" h-36 bg-black flex justify-end items-center pl-6 pr-6 pb-10 rounded-b-3xl">
      <Text className=" font-extralight text-3xl text-white tracking-wider">
        {saudacao},{" "}
        <Text className="font-bold text-3xl text-green-500 tracking-wider">
          {nomeFormt}!
        </Text>{" "}
      </Text>
    </View>
  );
};

export default HeaderHome;
