import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Text
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../../utils/Colors";
import { _pickImage } from "../../../utils/Tools";
import CustomText from "../../../components/UI/CustomText";
import { SheetManager } from "react-native-actions-sheet";
import PropTypes from "prop-types";
import { registerSheet } from 'react-native-actions-sheet';
import '../../../utils/actionSheets';
import { AppColors } from "../../../styles";

export const ProfilePic = ({
  user,
  imageUri,
  setImageUri,
  setFilename,
  setType,
  setUploadButton,
}) => {
  // Sửa lỗi gọi SheetManager mà không dùng ref
  const UploadProfileHandler = async () => {
    try {
      const result = await SheetManager.show('profile-pic-options', {
        payload: {
          handler: async (buttonIndex) => {

            let pickerResult;
            if (buttonIndex === 0) {
              pickerResult = await _pickImage('camera');
            } else if (buttonIndex === 1) {
              pickerResult = await _pickImage('library');
            }

            if (result && !result.cancelled) {
              let localUri = result.uri;
              let filename = localUri.split("/").pop();
              setImageUri(localUri);
              setFilename(filename);
              setType(result.type);
              setUploadButton(false);
            }
          }
        },
      });
    } catch (error) {
      console.error("Lỗi khi mở ActionSheet:", error);
    }
  };

  return (
    <View>
      <View style={{ height: 50, alignItems: "center" }}>
        <Image
          style={styles.profilePic}
          source={
            imageUri
              ? { uri: imageUri }
              : user.profilePicture
                ? { uri: user.profilePicture }
                : require("../../../assets/images/defaultprofile.png") // Default image
          }
        />
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            transform: [{ translateY: -110 }, { translateX: -5 }],
          }}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={UploadProfileHandler}>
              <FontAwesome name="camera" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomText style={styles.userName}>{user.name.firstname + " " + user.name.lastname}</CustomText>
      <View style={styles.priceCard}>
        <Text style={styles.label}>Tổng chi tiêu</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>8.450.000</Text>
          <Text style={styles.balanceType}> | Hạng Bạc</Text>
        </View>
      </View>
    </View>
  );
};

ProfilePic.propTypes = {
  user: PropTypes.object.isRequired,
  imageUri: PropTypes.string.isRequired,
  setImageUri: PropTypes.func.isRequired,
  setFilename: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setUploadButton: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [{ translateY: -70 }],
    borderWidth: 3,
    borderColor: "#fff",
  },
  cameraContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:AppColors.primary,
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    color: AppColors.primary,
    textAlign: "center",
  },
  priceCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    marginVertical:20
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500",
  },
  balanceType: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProfilePic;
