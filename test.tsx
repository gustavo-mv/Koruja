/*

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera/legacy";
import * as cv from "@techstark/opencv-js";

const App = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Permissão para acessar a câmera negada");
      }
    })();
  }, []);

  const handleCameraStream = async (imageData) => {
    try {
      const src = new cv.Mat(
        imageData.height,
        imageData.width,
        cv.CV_8UC4,
        imageData.data
      );
      const dst = new cv.Mat();

      // Converte para escala de cinza
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
    } catch (error) {
      console.error("Erro ao processar o stream da câmera:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default App;

*/
