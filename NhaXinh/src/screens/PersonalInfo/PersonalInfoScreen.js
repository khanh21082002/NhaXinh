import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert  } from "react-native";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Actions
import { UploadProfilePic } from "../../reducers";
import { EditButton, ProfilePic, ProfileBody } from "./components";
// Import SheetManager từ react-native-actions-sheet
import { SheetProvider } from "react-native-actions-sheet";
// Loader
//Loader
import SkeletonLoading from "../../components/Loaders/SkeletonLoading";
//Header
import {Header , PersonalInfoBody} from "./components";
import Colors from '../../utils/Colors';



const { width, height } = Dimensions.get("window");

export const PersonalInfoScreen = (props) => {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.isLoading);
    const [imageUri, setImageUri] = useState("");
    const [filename, setFilename] = useState("");
    const [type, setType] = useState("");
    const [uploadButton, setUploadButton] = useState(true);

    const dispatch = useDispatch();

    // const UploadProfile = async () => {
    //     try {
    //       await dispatch(UploadProfilePic(imageUri, filename, type));
    //       setUploadButton(true);
    //       Alert.alert("Cập nhật", "Cập nhật thành công", [{ text: "OK" }]);
    //     } catch (err) {
    //       alert(err);
    //     }
    //   };

      return (
        <View style={styles.container}>
          {loading ? (
            <SkeletonLoading />
          ) : (
            <PersonalInfoBody
              user={user}
            />
          )}
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default PersonalInfoScreen;