import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import cv from "@techstark/opencv-js";
import LottieView from "lottie-react-native";
import Structure from "@/assets/structure.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function CorrigirScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const imageData = await cameraRef.current.takePictureAsync();

      onPictureSaved(imageData);
    }
  };

  const onPictureSaved = async (imageData) => {
    try {
      console.log("oi");
      console.log(imageData);
      setPreviewVisible(true);
      setCapturedImage(imageData);
      /* 
      const imagem = cv.imread(imageData.uri);

      const src = cv.matFromImageData(imagem);
      const dst = new cv.Mat();

      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

      // Aplica threshold adaptativo
      const blockSize = 11;
      const C = 2;
      cv.adaptiveThreshold(
        dst,
        dst,
        255,
        cv.ADAPTIVE_THRESH_MEAN_C,
        cv.THRESH_BINARY,
        blockSize,
        C
      );

      // Encontra os contornos
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(
        dst,
        contours,
        hierarchy,
        cv.RETR_EXTERNAL,
        cv.CHAIN_APPROX_SIMPLE
      );

      // Filtra os contornos para encontrar as marcações
      const markers = [];
      for (let i = 0; i < contours.size(); i++) {
        const contour = contours.get(i);
        const approx = new cv.Mat();
        cv.approxPolyDP(
          contour,
          approx,
          0.02 * cv.arcLength(contour, true),
          true
        );

        if (approx.rows === 4) {
          const area = cv.contourArea(contour);
          const perimeter = cv.arcLength(contour, true);
          const ratio = area / (perimeter * perimeter);

          if (ratio > 0.02 && ratio < 0.05) {
            markers.push(contour);
          }
        }

        approx.delete();
      }

      // Verifica se todas as marcações foram encontradas
      if (markers.length === 6) {
        console.log("OK - Marcações encontradas");

        // Extrai a região de interesse (ROI) dentro das marcações
        const corners = cv.Mat.zeros(4, 1, cv.CV_32FC2);
        for (let i = 0; i < 4; i++) {
          const point = markers[i].data32F;
          corners.data32F[i * 2] = point[0];
          corners.data32F[i * 2 + 1] = point[1];
        }

        const dsize = new cv.Size(500, 500);
        const dst_corners = cv.Mat.zeros(4, 1, cv.CV_32FC2);
        dst_corners.data32F[0] = 0;
        dst_corners.data32F[1] = 0;
        dst_corners.data32F[2] = dsize.width;
        dst_corners.data32F[3] = 0;
        dst_corners.data32F[4] = dsize.width;
        dst_corners.data32F[5] = dsize.height;
        dst_corners.data32F[6] = 0;
        dst_corners.data32F[7] = dsize.height;

        const M = cv.getPerspectiveTransform(corners, dst_corners);
        const roi = new cv.Mat();
        cv.warpPerspective(src, roi, M, dsize);

        // Aqui você pode processar a ROI extraída conforme necessário
        // Por exemplo, você pode salvar a ROI em uma variável para uso posterior
        const roiData = roi.data;
        // ...

        roi.delete();
        M.delete();
        dst_corners.delete();
        corners.delete();
      }

      src.delete();
      dst.delete();
      hierarchy.delete();
      contours.delete();
      */
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
          className=" bg-green-500 rounded-md w-64 items-center p-3"
          onPress={requestPermission}
        >
          <Text className="text-lg font-bold">Permitir uso da Câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const CameraPreview = ({ photo }: any) => {
    console.log("sdsfds", photo);
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  };
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <Structure
            width={"110%"}
            height={"110%"}
            opacity={0.6}
            style={{ bottom: -15, left: -10 }}
            className=" self-center absolute"
          />
          <View className=" w-full h-full justify-end">
            <TouchableOpacity
              className=" w-40 bg-green-400 flex-row justify-center self-center mb-20 items-center h-16  rounded-md"
              onPress={takePicture}
            >
              <Text className="mr-3 font-semibold text-2xl">Corrigir</Text>
              <FontAwesome5 name="check" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="absolute self-end right-5 top-14"
            onPress={toggleCameraFacing}
          >
            <MaterialIcons name="cameraswitch" size={35} color="white" />
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
});
