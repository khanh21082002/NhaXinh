import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import { UploadProfilePic } from "../../reducers";
import { EditButton, ProfilePic, ProfileBody } from "./components";
// Import SheetManager từ react-native-actions-sheet
import { SheetProvider } from "react-native-actions-sheet";
// Loader
import Loader from "../../components/Loaders/Loader";

const { width, height } = Dimensions.get("window");

export const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading);
  const [imageUri, setImageUri] = useState("");
  const [filename, setFilename] = useState("");
  const [type, setType] = useState("");
  const [uploadButton, setUploadButton] = useState(true);

  const dispatch = useDispatch();

  const UploadProfile = async () => {
    try {
      await dispatch(UploadProfilePic(imageUri, filename, type));
      setUploadButton(true);
      Alert.alert("Cập nhật", "Cập nhật thành công", [{ text: "OK" }]);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SheetProvider context="global">
      <View style={styles.container}>
        <View style={styles.header}></View>
        {loading && <Loader />}
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            <EditButton navigation={props.navigation} user={user} />
            <ProfilePic
              user={user}
              imageUri={imageUri}
              setImageUri={setImageUri}
              setType={setType}
              setFilename={setFilename}
              setUploadButton={setUploadButton}
            />
            <ProfileBody user={user} />
          </View>
        </View>
      </View>
    </SheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: "row",
    height: 0.15 * height,
    justifyContent: "center",
  },
  profileContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width,
    height,
    alignItems: "center",
  },
});

export default ProfileScreen;
