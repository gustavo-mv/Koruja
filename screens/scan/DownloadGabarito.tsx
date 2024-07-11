import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import React from "react";
export const storage = new MMKV();
import AuthContext from "@/app/AuthContext";

const DownloadGabarito = ({ variacaoId }: any) => {
  const [image, setImage] = React.useState<string | null>(null);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = React.useContext(AuthContext);

  const fetchImageFromServer = async () => {
    try {
      const response = await fetch(
        `${API_URL}/gabaritos/gerar-imagem/${variacaoId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Erro ao Buscar Imagem do Servidor..");
      }

      const blob = await response.blob();
      console.log("Blob recebido:", blob);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        console.log("Data URL criada:", dataUrl);
        setImage(dataUrl);
        storage.set(`${variacaoId}`, dataUrl);
      };
      reader.onerror = (error) => {
        console.error("Erro ao ler blob como Data URL", error);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Erro ao buscar imagem no servidor", error);
    }
  };

  const checkIfExists = async () => {
    try {
      const imgFromStorage = storage.getString(`${variacaoId}`);

      if (imgFromStorage) {
        setImage(imgFromStorage);
      } else {
        fetchImageFromServer();
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  React.useEffect(() => {
    checkIfExists();
  }, []);

  return (
    <View className="h-full">
      {image ? (
        <View className="items-center w-full h-full pt-8">
          <Image source={{ uri: image }} style={{ width: 350, height: 500 }} />
          <TouchableOpacity className="rounded-lg w-28 h-14 mt-8 justify-center items-center bg-green-500">
            <Text className="text-2xl font-bold">Baixar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="h-full items-center justify-center">
          <ActivityIndicator size={90} color={"green"} />
          <Text className="text-2xl font-bold pt-7">Carregando imagem...</Text>
        </View>
      )}
    </View>
  );
};

export default DownloadGabarito;
