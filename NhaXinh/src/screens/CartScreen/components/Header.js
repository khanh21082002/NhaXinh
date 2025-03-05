import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity , Image } from "react-native";
//Text
import CustomText from "../../../components/UI/CustomText";
//Icon
//import { Ionicons } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
//Colors
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
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
      <CustomText style={styles.titleHeader}>
        Giỏ Hàng{" "}
        {Object.keys(user).length === 0
          ? ""
          : carts.products?.length === 0
          ? ""
          : `(${carts.products?.length})`}
      </CustomText>
      <View style={{ width: 15 }} />
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
