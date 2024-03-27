import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface UserProps {
  nome: string | null;
}

const HeaderHome = (props: UserProps) => {
  return (
    <View className="h-32 bg-cyan-100">
      <Text className=" font-sans md:font-serif">Olá {props.nome}! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default HeaderHome;
