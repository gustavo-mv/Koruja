import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  userGlobalData: User | null;
  isLoading: boolean;
  login: (userData: string) => void;
  dataUser: (tokenInfoFromFetch: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userGlobalData: null,
  isLoading: true,
  login: () => {},
  dataUser: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userGlobalData, setUserGlobalData] = useState<User | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const tokenFromStorage = await AsyncStorage.getItem("token");
      if (tokenFromStorage) {
        setToken(JSON.parse(tokenFromStorage));
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dataUser = async (tokenInfoFromFetch: User) => {
    try {
      setUserGlobalData(tokenInfoFromFetch);
    } catch (error) {
      console.error("Erro ao definir Informações do Usuário", error);
    }
  };

  const login = async (userData: string) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(userData));
      setToken(userData);
      router.replace("/home/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      setUserGlobalData(null);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userGlobalData,
        isLoading,
        dataUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
