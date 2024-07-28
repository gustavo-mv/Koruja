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
import { MaterialIcons } from "@expo/vector-icons";

export default function CorrigirScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [onOffFlash, setOnOffFlash] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [firstCapture, setFirstCapture] = useState(true);
  const [dataQR, setDataQR] = useState<null | string>(null);

  const cameraRef = React.useRef(null);

  interface FlashToggleButtonProps {
    onOffFlash: boolean;
    toggleFlash: () => void;
  }

  interface CaptureButtonProps {
    disabled: boolean;
    onPress: () => void;
    firstCapture: boolean;
  }

  const CaptureButton: React.FC<CaptureButtonProps> = ({
    disabled,
    onPress,
    firstCapture,
  }) => (
    <TouchableOpacity
      disabled={disabled}
      className="left-4 items-center h-14 w-52 justify-center rounded-md"
      style={[{ backgroundColor: "#e86800", opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
    >
      <Text className="font-bold text-white text-2xl">
        {disabled ? (firstCapture ? "Capturar" : "Transferindo") : "Capturar"}
      </Text>
    </TouchableOpacity>
  );

  const FlashToggleButton: React.FC<FlashToggleButtonProps> = ({
    onOffFlash,
    toggleFlash,
  }) => (
    <TouchableOpacity onPress={toggleFlash} className="left-7">
      <MaterialIcons
        name={onOffFlash ? "flash-on" : "flash-off"}
        size={30}
        color="#fff"
      />
    </TouchableOpacity>
  );

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
      <View className="w-full h-full items-center bg-ciano justify-center">
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
          className="font-semibold text-lg mb-5 text-white"
        >
          Para conseguirmos corrigir o gabarito precisaremos da sua câmera!
        </Text>
        <TouchableOpacity
          className="bg-laranja rounded-md p-2"
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
              requestPermission;
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
    <View className="justify-end">
      <CameraView
        ref={cameraRef}
        onCameraReady={onCameraReady}
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({ data }) => setDataQR(data)}
        flash={onOffFlash ? "on" : "off"}
      />

      <Structure
        height={"80%"}
        width={"80%"}
        style={{ position: "absolute", left: 30, top: 130, opacity: 0.7 }}
      />

      <View style={styles.mask} />

      <View className="justify-end h-full w-full pb-20 items-center">
        <KorujaLogo
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            bottom: 340,
          }}
        />
      </View>
      <View className="mb-3 z-50 flex-row items-center self-center">
        <CaptureButton
          disabled={disabled}
          firstCapture={firstCapture}
          onPress={() => {
            setFirstCapture(false);
            setDisabled(true);
            capturar();
          }}
        />
        <FlashToggleButton
          onOffFlash={onOffFlash}
          toggleFlash={() => setOnOffFlash(!onOffFlash)}
        />
      </View>
      <View className="self-center">
        <Text className="font-bold text-white mb-20">
          Para ambientes escuros, ative o Flash.
        </Text>
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
    top: "-15%",
    left: "-81%",
    width: "262%",
    height: "135%",
    backgroundColor: "gray",
    opacity: 0.5,
    borderRadius: 10,
    borderWidth: 350,
  },
});
