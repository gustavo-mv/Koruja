import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import KorujaLogo from "@/assets/KorujaLogo.svg";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function CorrigirScreen() {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [onOffFlash, setOnOffFlash] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [firstCapture, setFirstCapture] = useState(true);
  const [dataQR, setDataQR] = useState<null | string>(null);

  const cameraRef = useRef<Camera>(null);
  const router = useRouter();

  useEffect(() => {
    if (dataQR !== null) {
      setDisabled(false);
    }
  }, [dataQR]);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const capturar = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const cacheDirectory = FileSystem.cacheDirectory;
        const files = await FileSystem.readDirectoryAsync(cacheDirectory);

        const deletePromises = files.map((file) => {
          const filePath = `${cacheDirectory}${file}`;
          return FileSystem.deleteAsync(filePath);
        });

        await Promise.all(deletePromises);

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
        setDataQR(null);
        setDisabled(true);
        setFirstCapture(true);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (permission === null) {
    return <View />;
  }

  if (permission === false) {
    return <Text>Não obtivemos acesso pela câmera</Text>;
  }

  if (!permission.granted) {
    return (
      <View className="h-full w-full items-center justify-center bg-ciano">
        <LottieView
          autoPlay
          speed={0.5}
          style={styles.lottie}
          source={require("@/assets/lotties/camera.json")}
        />
        <Text style={styles.text} className="mb-4">
          Para conseguirmos corrigir o gabarito precisaremos da sua câmera!
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Permitir uso da Câmera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-ciano h-full w-full items-center justify-end">
      <View className="z-20 top-32">
        <KorujaLogo style={styles.logo} />
      </View>
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={CameraType.back}
          onCameraReady={onCameraReady}
          onBarCodeScanned={({ data }) => setDataQR(data)}
          flashMode={onOffFlash ? "torch" : "off"}
        />
      )}

      <View className="mt-5 flex-row items-center justify-center mb-5 ">
        <TouchableOpacity
          disabled={disabled}
          style={[styles.captureButton, { opacity: disabled ? 0.5 : 1 }]}
          onPress={() => {
            setFirstCapture(false);
            setDisabled(true);
            capturar();
          }}
        >
          <Text style={styles.captureButtonText}>
            {disabled
              ? firstCapture
                ? "Capturar"
                : "Transferindo"
              : "Capturar"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOnOffFlash(!onOffFlash)}
          style={styles.flashButton}
        >
          <MaterialIcons
            name={onOffFlash ? "flash-on" : "flash-off"}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Para ambientes escuros, ative o Flash.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: width,
    height: width * (4 / 3), // Ajuste para manter a proporção da câmera 4:3
    top: 0,
  },
  lottie: {
    width: 400,
    height: 250,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  permissionButton: {
    backgroundColor: "#e86800",
    padding: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  structure: {
    position: "absolute",
    left: 30,
    top: 130,
    opacity: 0.7,
  },
  mask: {
    position: "absolute",
    top: "-22%",
    left: "-81%",
    width: "262%",
    height: "145%",
    backgroundColor: "gray",
    opacity: 0.5,
    borderRadius: 10,
    borderWidth: 350,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  logo: {
    height: 20,
    width: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  captureButton: {
    height: 56,
    width: 208,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e86800",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  captureButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  flashButton: {
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
