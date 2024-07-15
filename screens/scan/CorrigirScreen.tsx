import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import LottieView from "lottie-react-native";
import Structure from "@/assets/structure.svg";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";

export default function CorrigirScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [firstCapture, setFirstCapture] = useState(true);

  const [dataQR, setDataQR] = useState<null | string>(null);

  const cameraRef = React.useRef(null);

  useEffect(() => {
    if (dataQR !== null) {
      setDisabled(false);
    }
  }, [dataQR]);

  useEffect(() => {
    console.log(dataQR);
  }, [dataQR]);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  async function capturar() {
    if (isCameraReady) {
      try {
        const cacheDirectory = FileSystem.cacheDirectory;
        const files = await FileSystem.readDirectoryAsync(cacheDirectory);

        const deletePromises = files.map((file) => {
          const filePath = `${cacheDirectory}${file}`;
          return FileSystem.deleteAsync(filePath);
        });

        await Promise.all(deletePromises);
        console.log("Cache cleared successfully.");

        const imageData = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });

        router.push({
          pathname: "/home/(scan)/analiseGabarito",
          params: {
            base64: imageData.uri,
            dataQR: dataQR,
          },
        });
        setDisabled(false);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }
  useEffect(() => {
    const getCameraPermissions = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.error("Error requesting camera permissions:", error);
      }
    };

    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container} className="items-center">
        <LottieView
          autoPlay
          speed={0.5}
          style={{
            width: 400,
            height: 250,
            right: 5,
          }}
          source={require("@/assets/lotties/camera.json")}
        />
        <Text
          style={{ textAlign: "center" }}
          className="font-semibold text-lg mb-5"
        >
          Para conseguirmos corrigir o gabarito precisaremos da sua câmera!
        </Text>
        <TouchableOpacity
          disabled={disabled}
          style={{
            opacity: disabled ? 0.5 : 1,
            backgroundColor: disabled ? "#ccc" : "#4CAF50",
            ...styles.button,
          }}
          onPress={async () => {
            setDisabled(true);
            try {
              await Camera.requestCameraPermissionsAsync();
            } catch (error) {
              console.error("Error requesting camera permissions:", error);
            }
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Permitir uso da Câmera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        onCameraReady={onCameraReady}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ data }) => setDataQR(data)}
      />
      <Structure
        height={"110%"}
        width={"110%"}
        style={{ position: "absolute", left: -15, opacity: 0.7 }}
      />
      <View className="justify-end h-full w-full pb-20 items-center">
        <TouchableOpacity
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "#e86800" : "#e86800",
            ...styles.button,
          }}
          onPress={() => {
            setFirstCapture(false);
            setDisabled(true);
            capturar();
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {disabled
              ? firstCapture
                ? "Capturar"
                : "Transferindo"
              : "Capturar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
  },
});
