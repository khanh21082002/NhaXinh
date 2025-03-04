import React, { useState, useEffect, useRef } from "react";
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroNode,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroDirectionalLight,
  ViroARPlaneSelector,  // Import ARPlaneSelector
  ViroSpotLight
} from "@reactvision/react-viro";
import { StyleSheet } from "react-native";

// Tạo vật liệu cho đối tượng 3D
ViroMaterials.createMaterials({
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require("../../../assets/3D/Heart_D3.jpg"),
    specularTexture: require("../../../assets/3D/Heart_S2.jpg"),
    writesToDepthBuffer: true,
    readsFromDepthBuffer: true,
  },
});

const ARViewerWithGestures = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [showObject, setShowObject] = useState(false);
  const [position, setPosition] = useState([0, 0, -1]);
  const [scale, setScale] = useState([1, 1, 1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const timerRef = useRef(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowObject(false);
    };
  }, []);

  const load3DModel = async () => {
    const fileName = "Koltuk.obj";
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      const fileExists = await RNFS.exists(localPath);
      if (!fileExists) {
        console.log(`File not found at path: ${localPath}. Downloading...`);
        await downloadModels(localPath);
      } else {
        console.log(`Model found locally at: ${localPath}`);
      }
    } catch (error) {
      console.warn("Lỗi khi kiểm tra tệp 3D:", error);
    }
  };

  const downloadModels = async (localPath) => {
    const modelUrl =
      "https://github.com/nainglynndw/react-native-ar-viewer/releases/download/v1/AR-Code-1678076062111.usdz";
    try {
      await RNFS.downloadFile({
        fromUrl: modelUrl,
        toFile: localPath,
      }).promise;
      console.log(`Downloaded model to: ${localPath}`);
    } catch (error) {
      console.warn("Lỗi khi tải mô hình:", error);
    }
  };

  function onInitialized(state, reason) {
    console.log("Tracking state:", state, "Reason:", reason);

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setIsTracking(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowObject(true);
        load3DModel();
      }, 2000);
    } else {
      setIsTracking(false);
      setShowObject(false);
    }
  }

  // Xử lý sự kiện kéo (drag)
  const handleDrag = (dragToPos, source) => {
    setPosition(dragToPos);
  };

  // Xử lý sự kiện pinch (phóng to/thu nhỏ)
  const handlePinch = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) { // STATE_CHANGED
      setScale([scale[0] * scaleFactor, scale[1] * scaleFactor, scale[2] * scaleFactor]);
    }
  };

  // Xử lý sự kiện xoay
  const handleRotate = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) { // STATE_CHANGED
      let currentRotation = [rotation[0] - rotationFactor, rotation[1] - rotationFactor, rotation[2]- rotationFactor];
      setRotation(currentRotation);
    }
  };

  // Điều chỉnh vị trí của vật thể khi chọn mặt phẳng
  const onPlaneUpdate = (plane) => {
    if (plane && plane.center) {
      setPosition(plane.center);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" />
      {/* Selector for planes */}
      <ViroARPlaneSelector onPlaneUpdate={onPlaneUpdate} />
      
      {showObject && (
        <Viro3DObject
          source={require("../../../assets/3D/heart.obj")}
          materials={["heart"]}
          position={position}
          scale={scale}
          rotation={rotation}
          onDrag={handleDrag}
          onPinch={handlePinch}
          onRotate={handleRotate}
          type="OBJ"
          shadowCastingBitMask={2}
        />
      )}
    </ViroARScene>
  );
};

export default ARViewerWithGestures;

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
