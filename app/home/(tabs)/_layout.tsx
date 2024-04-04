import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          height: 90,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#10b505",
          tabBarIconStyle: { color: "#FF6464" },
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={32} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="turmas"
        options={{
          title: "Turmas",
          headerShown: false,
          tabBarActiveTintColor: "#10b505",
          tabBarIconStyle: { color: "#FF6464" },
          tabBarIcon: ({ color }) => (
            <Icon name="groups" size={32} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarActiveTintColor: "#10b505",
          tabBarIconStyle: { color: "white" },
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="qr-code-scanner"
              size={44}
              style={styles.qr}
              color={"black"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ativ"
        options={{
          title: "Atividades",
          tabBarActiveTintColor: "#10b505",
          tabBarIconStyle: { color: "#FF6464" },
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="event-note" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="conf"
        options={{
          title: "Configurações",
          tabBarActiveTintColor: "#10b505",
          tabBarIconStyle: { color: "#FF6464" },
          tabBarIcon: ({ color }) => (
            <Icon name="settings" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  qr: {
    backgroundColor: "#10b505",
    borderRadius: 50,
    width: 80,
    height: 60,
    paddingLeft: 18,
    paddingTop: 7,
    marginBottom: 30,
  },
});
