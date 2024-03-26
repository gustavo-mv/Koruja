import { Slot } from "expo-router";
import { AuthProvider } from "./AuthContext";

export default function HomeLayout() {
  return (
    <>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </>
  );
}
