import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import RNFS from "react-native-fs";
import { ArViewerView } from "react-native-ar-viewer";

const ARViewerOptimized = () => {
  const [localModelPath, setLocalModelPath] = useState([]);

  const modelLinks = [
    "https://github.com/nainglynndw/react-native-ar-viewer/releases/download/v1/AR-Code-1678076062111.usdz",
    "https://github.com/nainglynndw/react-native-ar-viewer/releases/download/v1/Elk_Free.usdz",
  ];

  const getFileName = (url) => {
    const arr = url.split("/");
    const fileName = arr[arr.length - 1];
    return fileName;
  };

  const checkModelExisted = (url) => {
    const fileName = getFileName(url);
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    RNFS.exists(localPath).then((res) => {
      if (!res) {
        downloadModels(url, localPath);
      } else {
        const arr = [...localModelPath, localPath];
        const uniqueArray = [...new Set(arr)];
        setLocalModelPath([...uniqueArray]);
      }
    });
  };

  console.log(localModelPath.length);

  const downloadModels = async (url, localPath) => {
    await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise;
    const arr = [...localModelPath, localPath];
    const uniqueArray = [...new Set(arr)];
    setLocalModelPath([...uniqueArray]);
  };

  useEffect(() => {
    modelLinks.forEach((link) => {
      checkModelExisted(link);
    });
  }, [modelLinks.length]);



  return (
    <View style={styles.container}>
      {/* <ArViewerView
        style={{ flex: 1 }}
        // model={localModelPath}
        lightEstimation
        manageDepth
        allowRotate
        allowScale
        allowTranslate
        disableInstantPlacement
        onStarted={() => console.log('started')}
        onEnded={() => console.log('ended')}
        onModelPlaced={() => console.log('model displayed')}
        onModelRemoved={() => console.log('model not visible anymore')}
        planeOrientation="both" /> */}
        <View style={styles.title}>AR</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ARViewerOptimized;
