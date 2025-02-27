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
} from "@reactvision/react-viro";
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { NativeModules } from "react-native";

// Kiểm tra ARCore (Android) hoặc ARKit (iOS)
const checkARSupport = async () => {
  if (Platform.OS === "android") {
    try {
      const { isARSupported } = NativeModules.ARSupportChecker || {};
      if (isARSupported) {
        return await isARSupported(); // Kiểm tra ARCore trên thiết bị Android
      }
      // Fallback nếu module native không tồn tại
      console.warn("Module ARSupportChecker không tìm thấy, sử dụng fallback");
      return true; // Giả định hỗ trợ và để AR Scene tự xử lý lỗi
    } catch (error) {
      console.warn("Lỗi kiểm tra ARCore:", error);
      return false;
    }
  } else if (Platform.OS === "ios") {
    return true; // ARKit có sẵn trên iOS (iPhone 6S trở lên)
  }
  return false;
};

// Yêu cầu quyền Camera trên Android
async function requestCameraPermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cấp quyền Camera",
          message: "Ứng dụng cần quyền camera để sử dụng AR",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("Lỗi khi yêu cầu quyền camera:", err);
      return false;
    }
  }
  return true; // iOS xử lý quyền khác
}

// Định nghĩa vật liệu cho các object 3D
ViroMaterials.createMaterials({
  blue: {
    diffuseColor: "#0088FF",
  },
  green: {
    diffuseColor: "#00FF88",
  },
  red: {
    diffuseColor: "#FF0088",
  },
});

// Định nghĩa animation
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90",
    },
    duration: 1000,
  },
  bounce: {
    properties: {
      positionY: "+=0.2",
    },
    easing: "Bounce",
    duration: 500,
  },
  sequence: [
    ["rotate"],
    ["bounce"],
  ],
});

// Scene hiển thị AR
const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Đang khởi tạo AR...");
  const [isTracking, setIsTracking] = useState(false);
  const [showObject, setShowObject] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Hiển thị object sau 2 giây khi tracking ổn định
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function onInitialized(state, reason) {
    console.log("Tracking state:", state, "Reason:", reason);

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setIsTracking(true);
      setText("Nhấn vào màn hình để tạo vật thể 3D");
      
      // Tự động hiển thị object sau 2 giây khi tracking ổn định
      timerRef.current = setTimeout(() => {
        setShowObject(true);
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
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      
      {showObject && (
        <ViroNode position={[0, -0.5, -1]} animation={{name: "sequence", loop: true, run: true}}>
          <ViroBox
            position={[0, 0.25, 0]}
            scale={[0.3, 0.3, 0.3]}
            materials={["blue"]}
          />
        </ViroNode>
      )}
    </ViroARScene>
  );
};

// Màn hình chính để chạy AR
const ARScreen = () => {
  const [key, setKey] = useState(0);
  const [isARSupported, setIsARSupported] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRequirements = async () => {
      setIsLoading(true);
      
      // Kiểm tra quyền Camera
      const hasPermission = await requestCameraPermission();
      setHasCameraPermission(hasPermission);
      
      if (!hasPermission) {
        setIsLoading(false);
        return;
      }

      // Kiểm tra thiết bị có hỗ trợ AR không
      const arSupported = await checkARSupport();
      console.log("AR Supported:", arSupported);
      setIsARSupported(arSupported);
      setIsLoading(false);
    };

    checkRequirements();
  }, []);

  // Hàm reset bằng cách tạo lại key mới
  const resetARSession = () => {
    console.log("🔄 Đang reset phiên AR...");
    if (Platform.OS === 'android') {
      ToastAndroid.show('Đang reset phiên AR...', ToastAndroid.SHORT);
    }
    setKey((prevKey) => prevKey + 1);
  };

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Đang khởi tạo AR...</Text>
      </View>
    );
  }

  // Hiển thị thông báo không có quyền camera
  if (hasCameraPermission === false) {
    return (
      <View style={styles.notSupportedContainer}>
        <Text style={styles.notSupportedText}>
          Vui lòng cấp quyền camera để sử dụng AR
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => checkRequirements()}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Nếu thiết bị không hỗ trợ AR */}
      {isARSupported === false ? (
        <View style={styles.notSupportedContainer}>
          <Text style={styles.notSupportedText}>
            Thiết bị của bạn không hỗ trợ AR
          </Text>
        </View>
      ) : (
        <>
          <ViroARSceneNavigator
            key={key}
            autofocus={true}
            initialScene={{ scene: HelloWorldSceneAR }}
            style={styles.f1}
          />
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetARSession}
            >
              <Text style={styles.resetButtonText}>🔄 Reset AR</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ARScreen;

// Style
const styles = StyleSheet.create({
  f1: { 
    flex: 1 
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "rgba(255, 71, 87, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notSupportedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  notSupportedText: {
    color: "#ff4757",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 16,
  },
  retryButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});