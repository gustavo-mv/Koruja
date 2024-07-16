import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ correct, incorrect, blank, total }) => {
  const nota = ((correct / total) * 10).toFixed(2);

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Nota: {nota}</Text>
      <Text style={styles.headerText}>Acertos: {correct}</Text>
      <Text style={styles.headerText}>Erros: {incorrect}</Text>
      <Text style={styles.headerText}>Nulos/Em branco: {blank}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
});

export default Header;
