import React, { createContext, useState, useEffect } from "react";
import { MMKV } from "react-native-mmkv";
import { router } from "expo-router";
import User from "@/models/User";

export const storage = new MMKV();

interface AuthContextType {
  token: string | null;
  userGlobalData: User | null;
  isLoading: boolean;
  login: (userData: string) => void;
  dataUser: (tokenInfoFromFetch: User) => void;
  updateProvasGeradas: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userGlobalData: null,
  isLoading: true,
  login: () => {},
  dataUser: () => {},
  updateProvasGeradas: () => {},
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
      const tokenFromStorage = await storage.getString("token");
      if (tokenFromStorage) {
        setToken(JSON.parse(tokenFromStorage));
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dataUser = async (tokenInfoFromFetch: any) => {
    try {
      console.log(tokenInfoFromFetch);
      setUserGlobalData(tokenInfoFromFetch);
    } catch (error) {
      console.error("Erro ao definir Informações do Usuário", error);
    }
  };

  const loginFromCreation = async (userData: string) => {
    try {
      await storage.set("token", JSON.stringify(userData));
      setToken(userData);
      router.replace("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const login = async (userData: string) => {
    try {
      await storage.set("token", JSON.stringify(userData));
      setToken(userData);
      router.replace("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      router.replace("/login");
      await storage.clearAll();
      setToken(null);
      setUserGlobalData(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateProvasGeradas = () => {
    setUserGlobalData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          provasGeradas: prevData.provasGeradas + 1,
        };
      }
      return prevData;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userGlobalData,
        isLoading,
        dataUser,
        updateProvasGeradas, // Passa a função pelo contexto
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
