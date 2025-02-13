import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
//Components
import { SignupForm } from "./components";
import Colors from "../../utils/Colors";

const { height, width } = Dimensions.get("window");

export const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        style={{ flex: 1, position: "absolute", height, width }}
        source={require("../../assets/images/flower3.jpg")}
        blurRadius={10}
      ></ImageBackground> */}
      <SignupForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
