import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity , Image } from "react-native";
//PropTypes check
import PropTypes from "prop-types";
import App from "../../../../App";
import { AppColors } from "../../../styles";

const { height } = Dimensions.get("window");

export const Header = ({ navigation, user, carts }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  titleHeader: {
    textAlign: "center",
    color: AppColors.primary,
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium",
  },
});
