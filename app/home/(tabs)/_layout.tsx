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
          backgroundColor: "#0b1c36",
          borderColor: "black",
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#e86800",
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
          tabBarActiveTintColor: "#e86800",
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
          tabBarActiveTintColor: "#e86800",
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
          tabBarActiveTintColor: "#e86800",
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
          unmountOnBlur: true,
          headerShown: false,
          title: "Configurações",
          tabBarActiveTintColor: "#e86800",
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
    backgroundColor: "#e86800",
    borderRadius: 50,
    width: 80,
    height: 60,
    paddingLeft: 18,
    paddingTop: 7,
    marginBottom: 30,
  },
});
