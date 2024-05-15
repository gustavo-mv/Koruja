import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";

const AnaliseGabaritoScreen = ({ base64 }: any) => {
  const [convertedBase64, setConvertedBase64] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [imageUri, setImageUri] = React.useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  async function enviarFoto() {
    try {
      const response = await fetch(`${API_URL}/gabaritos/upload-imagem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: convertedBase64 }),
      });

      if (!response.ok) {
        setError("Formato Inválido.");
        setLoading(false);
        console.log(response);

        throw new Error("Formato Inválido.");
      } else {
        console.log("DEU BOM O ENVIO DA FOTO");
        const data = await response.json();
        console.log(data.result);

        const imageFilePath =
          FileSystem.cacheDirectory + "image.jpg" + `${Date.now()}`;
        await FileSystem.deleteAsync(imageFilePath, { idempotent: true });
        await FileSystem.writeAsStringAsync(imageFilePath, data.result, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageUri(imageFilePath);
        console.log(imageFilePath);

        setLoading(false);
      }
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
        setError(e || "Erro ao fazer upload da imagem");
        setLoading(false);
      } else if (e instanceof Error) {
        e.message;
      }
    }
  }

  React.useEffect(() => {
    async function conv() {
      if (base64 !== null) {
        const convertedString = await FileSystem.readAsStringAsync(base64, {
          encoding: "base64",
        });
        setConvertedBase64(convertedString);
      }
    }
    conv();
  }, [base64]);

  React.useEffect(() => {
    if (convertedBase64 !== "") {
      setLoading(true);
      enviarFoto();
    }
  }, [convertedBase64]);

  return (
    <View className="h-full items-center justify-center">
      {error && <Text>{error}</Text>}
      {loading && <Text>Processando imagem...</Text>}
      {imageUri && (
        <Image height={700} width={400} source={{ uri: `${imageUri}` }}></Image>
      )}
    </View>
  );
};

export default AnaliseGabaritoScreen;
