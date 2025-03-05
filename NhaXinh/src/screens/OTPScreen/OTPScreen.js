import React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
//Components
 import { OTPForm } from "./components";

const { height, width } = Dimensions.get("window");

export const OTPScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <OTPForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
