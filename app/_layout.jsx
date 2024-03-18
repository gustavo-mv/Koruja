import { SplashScreen, Stack } from "expo-router";

import "../global.css";
import { AuthProvider } from "../authContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
