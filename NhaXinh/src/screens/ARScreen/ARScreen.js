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
import RNFS from 'react-native-fs';
import ARViewerOptimized from "./components/ARViewerOptimized";

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

// // Scene hiển thị AR
// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState("Đang khởi tạo AR...");
//   const [isTracking, setIsTracking] = useState(false);
//   const [showObject, setShowObject] = useState(false);
//   const timerRef = useRef(null);
//   const animationRef = useRef(null);

//   useEffect(() => {
//     // Cleanup function
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//       // Đảm bảo dừng mọi animation hoặc xử lý đang diễn ra
//       setShowObject(false);
//     };
//   }, []);

//   const load3DModel = async () => {
//     const path = RNFS.DocumentDirectoryPath + '/Koltuk.obj'; 
//     try {
//       const fileContents = await RNFS.readFile(path, 'utf8');
//       console.log(fileContents); // Kiểm tra nội dung tệp .obj
//       // Tiến hành xử lý mô hình 3D hoặc chuẩn bị tải vào AR
//     } catch (error) {
//       console.warn('Lỗi khi đọc tệp 3D:', error);
//     }
//   };

//   function onInitialized(state, reason) {
//     console.log("Tracking state:", state, "Reason:", reason);

//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setIsTracking(true);
//       setText("Nhấn vào màn hình để tạo vật thể 3D");

//       // Tự động hiển thị object sau 2 giây khi tracking ổn định
//       if (timerRef.current) clearTimeout(timerRef.current);
//       timerRef.current = setTimeout(() => {
//         setShowObject(true);
//         load3DModel();
//       }, 2000);
//     } else {
//       setIsTracking(false);

//       // Ẩn object khi tracking không tốt
//       setShowObject(false);

//       if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//         setText("Không thể tracking - Kiểm tra camera và môi trường");
//       } else if (state === ViroTrackingStateConstants.TRACKING_LIMITED) {
//         setText("Tracking hạn chế - Di chuyển camera để quét môi trường");
//       }
//     }
//   }

//   function onTap() {
//     if (isTracking) {
//       setShowObject(!showObject);
//     }
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized} onTap={onTap}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />

//       {showObject && (
//         // <ViroNode 
//         //   position={[0, -0.5, -1]} 
//         //   // animation={{name: "sequence", loop: true, run: true}}
//         //   ref={animationRef}
//         // >
//         //   <ViroBox
//         //     position={[0, 0.25, 0]}
//         //     scale={[0.3, 0.3, 0.3]}
//         //     materials={["blue"]}
//         //   />
//         // </ViroNode>
//         <Viro3DObject
//           source={{ uri: '../../../assets/sofa/Koltuk.obj'}}  // Bạn có thể thử sử dụng URI
//           position={[0, -0.5, -1]}
//           scale={[0.3, 0.3, 0.3]}
//           type="OBJ"
//         />

//       )}
//     </ViroARScene>
//   );
// };

// // Màn hình chính để chạy AR
const ARScreen = ({ navigation }) => {
  const [isARSupported, setIsARSupported] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isARVisible, setIsARVisible] = useState(true);
  const arNavigatorRef = useRef(null);


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

  useEffect(() => {
    checkRequirements();
  }, []);

  const handleClose = () => {
    // Nếu bạn đang sử dụng navigation để mở AR screen
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      // Bạn có thể tùy chỉnh hành động này tùy theo ứng dụng của bạn
      console.log("Closing AR experience");
      // Có thể ẩn AR view nếu cần
      setIsARVisible(false);
    }
  };

  // Hàm reset bằng cách sử dụng phương thức reset của Navigator
  const resetARSession = () => {
    console.log(" Đang reset phiên AR...");
    if (Platform.OS === 'android') {
      ToastAndroid.show('Đang reset phiên AR...', ToastAndroid.SHORT);
    }

    if (arNavigatorRef.current && arNavigatorRef.current.reset) {
      try {
        // Sử dụng phương thức có sẵn của thư viện
        arNavigatorRef.current.reset();
      } catch (error) {
        console.warn("Lỗi khi reset AR:", error);
        // Fallback nếu reset() gây lỗi
        handleManualReset();
      }
    } else {
      // Fallback cho trường hợp không có phương thức reset
      handleManualReset();
    }
  };

  // Phương thức reset thủ công trong trường hợp reset() không hoạt động
  const handleManualReset = () => {
    setIsARVisible(false);
    // Chờ một chút để AR session có thể dọn dẹp tài nguyên
    setTimeout(() => {
      setIsARVisible(true);
    }, 500);
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
          onPress={checkRequirements}
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
          {isARVisible && (
            <ViroARSceneNavigator
              ref={arNavigatorRef}
              autofocus={true}
              initialScene={{ scene: ARViewerOptimized}}
              style={styles.f1}
            />
          )}
          <View style={styles.controlsContainer}>
            {/* Thêm nút đóng */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetARSession}
              >
                <Text style={styles.buttonText}>Reset AR</Text>
              </TouchableOpacity>
            </View>
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: "rgba(52, 73, 94, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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