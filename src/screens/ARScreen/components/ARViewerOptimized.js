import React, { useState, useEffect, useRef } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingStateConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { NativeModules } from "react-native";
import RNFS from 'react-native-fs';

// Scene hiển thị AR
const ARViewerOptimized = () => {
  const [text, setText] = useState("Đang khởi tạo AR...");
  const [isTracking, setIsTracking] = useState(false);
  const [showObject, setShowObject] = useState(false);
  const timerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowObject(false); // Stop showing 3D object when component unmounts
    };
  }, []);

  const load3DModel = async () => {
    const fileName = 'Koltuk.obj';
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
    const modelUrl = 'https://github.com/nainglynndw/react-native-ar-viewer/releases/download/v1/AR-Code-1678076062111.usdz';
    try {
      await RNFS.downloadFile({
        fromUrl: modelUrl,
        toFile: localPath,
      }).promise;
      console.log(`Downloaded model to: ${localPath}`);
    } catch (error) {
      console.warn('Lỗi khi tải mô hình:', error);
    }
  };

  function onInitialized(state, reason) {
    console.log("Tracking state:", state, "Reason:", reason);

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setIsTracking(true);
      setText("Nhấn vào màn hình để tạo vật thể 3D");

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // setShowObject(true);
        load3DModel();
      }, 2000);
    } else {
      setIsTracking(false);
      setShowObject(false);

      if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
        setText("Không thể tracking - Kiểm tra camera và môi trường");
      } else if (state === ViroTrackingStateConstants.TRACKING_LIMITED) {
        setText("Tracking hạn chế - Di chuyển camera để quét môi trường");
      }
    }
  }

  function onTap() {
    if (isTracking) {
      setShowObject(!showObject);
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized} onTap={onTap}>
      <ViroAmbientLight />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      
      {showObject && (
        <Viro3DObject
          source={{ uri: `file://${RNFS.DocumentDirectoryPath}/Koltuk.obj` }}
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.3]}
          type="OBJ"
        />
      )}
    </ViroARScene>
  );
};

export default ARViewerOptimized;

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
