import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import LottieView from "lottie-react-native";
import Structure from "@/assets/structure.svg";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";
import KorujaLogo from "@/assets/KorujaLogo.svg";

export default function CorrigirScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [onOffFlash, setOnOffFlash] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [firstCapture, setFirstCapture] = useState(true);
  const [dataQR, setDataQR] = useState<null | string>(null);

  const cameraRef = React.useRef(null);

  useEffect(() => {
    console.log(dataQR);

    if (dataQR !== null) {
      setDisabled(false);
    }
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
          quality: 1,
        });

        router.push({
          pathname: "/home/(scan)/analiseGabarito",
          params: {
            URI: imageData.uri,
            dataQR: dataQR,
          },
        });
        setDisabled(false);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  if (!permission?.granted) {
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
          style={{
            backgroundColor: disabled ? "#ccc" : "#4CAF50",
          }}
          onPress={requestPermission}
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
  if (!permission) {
    return (
      <>
        <Text>Você não permitiu acesso a câmera.</Text>

        <TouchableOpacity
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "#ccc" : "#4CAF50",
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
      </>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        onCameraReady={onCameraReady}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ data }) => setDataQR(data)}
        flash={onOffFlash ? "on" : "off"}
      />

      <Structure
        height={"70%"}
        width={"70%"}
        style={{ position: "absolute", left: 50, top: 140, opacity: 0.7 }}
      />

      {/* Máscara retangular para a área de scan */}
      <View style={styles.mask} />

      <View className="justify-end h-full w-full pb-20 items-center">
        <TouchableOpacity
          disabled={disabled}
          className={`${disabled ? "opacity-50" : ""}`}
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
        <TouchableOpacity
          className=""
          onPress={() => setOnOffFlash(!onOffFlash)}
        >
          <Text className="text-xl text-white">Flash</Text>
        </TouchableOpacity>
        <KorujaLogo
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            bottom: 620,
          }}
        />
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
  mask: {
    position: "absolute",
    top: "-10%",
    left: "-73%",
    width: "245%",
    height: "125%",
    backgroundColor: "gray",
    opacity: 0.5,
    borderRadius: 10,
    borderWidth: 350,
  },
});
