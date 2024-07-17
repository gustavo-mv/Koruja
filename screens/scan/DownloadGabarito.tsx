import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/app/AuthContext";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export const storage = new MMKV();

const DownloadGabarito = ({ variacaoId }) => {
  const [image, setImage] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { token } = useContext(AuthContext);

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Desculpe, nós precisamos da permissão para acessar a biblioteca de mídia."
      );
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

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
        throw new Error("Erro ao Buscar Imagem do Servidor.");
      }

      const blob = await response.blob();
      console.log("Blob recebido:", blob);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
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

  useEffect(() => {
    checkIfExists();
  }, []);

  const downloadImage = async () => {
    if (!image) return;

    setIsDownloading(true);

    try {
      const fileUri = FileSystem.documentDirectory + `${variacaoId}.png`;
      await FileSystem.writeAsStringAsync(fileUri, image.split(",")[1], {
        encoding: FileSystem.EncodingType.Base64,
      });

      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Koruja", asset, false);

      alert("Imagem baixada com sucesso!");
    } catch (error) {
      console.error("Permissão negada ao baixar a imagem.");
      alert("Permissão negada ao baixar a imagem.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View className="h-full">
      {image ? (
        <View className="items-center w-full h-full bg-chumbo">
          <View className="h-90 w-full">
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "80%", objectFit: "contain" }}
            />
          </View>
          <TouchableOpacity
            className="rounded-lg p-3 h-14 justify-center items-center bg-laranja "
            onPress={downloadImage}
            disabled={isDownloading}
          >
            <Text className="text-2xl font-bold text-white">
              {isDownloading ? "Baixando..." : "Baixar"}
            </Text>
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
