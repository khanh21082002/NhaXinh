import React, { useEffect, useState } from "react";
import { View, StyleSheet, Switch, Image } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import userMessages from "../../../messages/user";
// Authentiation Touch ID Face ID
import TouchID from "react-native-touch-id";
import * as Keychain from "react-native-keychain";
// PropTypes check
import PropTypes from "prop-types";

export const AuthBody = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const switchHandler = async () => {
    setIsEnabled((previousState) => !previousState);
    if (!isEnabled) {
      await Keychain.setGenericPassword(user.email, user.password);
    } else {
      await Keychain.resetGenericPassword();
    }
  };

  const getData = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials === false) {
      return;
    } else if (credentials.username !== user.email) {
      await Keychain.resetGenericPassword();
      return setIsEnabled(false);
    }
    setIsEnabled(true);
  };

  useEffect(() => {
    checkDeviceForHardware();
    checkForFingerprints();
    getData();
  }, [user.id]);

  const checkDeviceForHardware = async () => {
    TouchID.isSupported()
      .then(() => setIsSupport(true))
      .catch(() => setIsSupport(false));
  };

  const checkForFingerprints = async () => {
    TouchID.isSupported()
      .then(() => setIsSupport(true))
      .catch(() => setIsSupport(false));
  };

  return (
    <View style={styles.container}>
      {!isSupport ? (
        <CustomText style={styles.error}>
          {userMessages["user.touchid.fail"]}!
        </CustomText>
      ) : (
        <></>
      )}
      <View style={styles.circleImage}>
        <Image
          source={require("../../../assets/images/faceid.png")}
          style={styles.faceid}
        />
      </View>
      <View style={styles.contentContainer}>
        <CustomText style={styles.text}>
          Mở khóa bằng vân tay hoặc khuôn mặt
        </CustomText>
        <Switch
          trackColor={{ false: "#767577", true: "#60c46b" }}
          thumbColor={isEnabled ? Colors.white : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchHandler}
          value={isEnabled}
          disabled={!isSupport}
        />
      </View>
    </View>
  );
};

AuthBody.propTypes = {};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  error: {
    marginVertical: 10,
    color: "red",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
  },
  circleImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 70,
    borderStyle: "dashed",
    borderColor: Colors.grey,
  },
  faceid: {
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    color: Colors.lighter_green,
  },
});
