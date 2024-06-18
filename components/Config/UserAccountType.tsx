import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const UserAccountType = ({ tipoConta, data }: any) => {
  const [isFree, setIsFree] = React.useState(true);

  const dateObj = new Date(data);

  const dia = dateObj.getDate().toString().padStart(2, "0"); // Dia com zero à esquerda se necessário
  const mes = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Mês com zero à esquerda se necessário
  const ano = dateObj.getFullYear().toString().slice(-2); // Ano como dois dígitos

  const dataFormatada = `${dia}/${mes}/${ano}`;

  React.useEffect(() => {
    if (tipoConta !== "free") {
      setIsFree(false);
    } else {
      setIsFree(true);
    }
  }, [tipoConta]);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <View className="m-2">
      {isFree ? (
        <View className="bg-green-500 flex-row rounded-md">
          <Text className="m-2 text-lg font-bold text-black">
            Plano Gratuito
          </Text>
        </View>
      ) : (
        <View className="items-center justify-center">
          <View className="bg-yellow-400 flex-row rounded-md">
            <Text className="m-2 text-lg font-bold">
              {capitalizeFirstLetter(tipoConta)}
            </Text>
            <LottieView
              autoPlay
              speed={0.8}
              style={{
                width: 30,
                height: 30,
                right: 0,
                top: 6,
                zIndex: 10,
              }}
              source={require("@/assets/lotties/star.json")}
            />
          </View>
          <Text className="text-gray-100 mt-1 font-bold">
            Válido até: {dataFormatada}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserAccountType;
