import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = () => {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela Home!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
