import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

const SIZE = 160;
const MARGIN = 30;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SIZE + 4 * MARGIN;

const items = [
  {
    color: "#FFE780",
    text: "Crie uma Turma!",
    sticker: require("@/assets/howTo/howTo1.png"),
  },
  {
    color: "#87CCE8",
    text: "Adicione uma disciplina",
    sticker: require("@/assets/howTo/howTo2.png"),
  },
  {
    color: "#FFA3A1",
    text: "Crie um gabarito para a disciplina",
    sticker: require("@/assets/howTo/howTo3.png"),
  },
  {
    color: "#B1DFD0",
    text: "Corrija usando seu celular!",
    sticker: require("@/assets/howTo/howTo4.png"),
  },
];

const HowToCard = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        snapToInterval={ITEM_WIDTH} // Alinhar os cartões durante o scroll
        decelerationRate="fast" // Para fazer o snap mais rápido
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={[styles.card, { backgroundColor: item.color }]}
          >
            <Image source={item.sticker} style={styles.sticker} />
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
        <View style={{ width: SCREEN_WIDTH - ITEM_WIDTH }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B2438",
  },
  scrollViewContainer: {
    alignItems: "center",
    paddingLeft: MARGIN, // Para que o primeiro card encoste do lado esquerdo
  },
  card: {
    width: ITEM_WIDTH - MARGIN, // Ajusta a largura do card para que o próximo card seja visível
    height: SIZE,
    marginRight: MARGIN,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Para esconder parte do sticker
    position: "relative",
  },
  sticker: {
    position: "absolute",
    top: 15,
    left: -40, // Ajuste conforme necessário para esconder parte do sticker
    width: 160, // Ajuste conforme o tamanho da imagem
    height: 160, // Ajuste conforme o tamanho da imagem
    resizeMode: "contain",
  },
  cardText: {
    alignSelf: "flex-end",
    textAlign: "center",
    marginRight: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    width: 120,
    zIndex: 1,
  },
});

export default HowToCard;
