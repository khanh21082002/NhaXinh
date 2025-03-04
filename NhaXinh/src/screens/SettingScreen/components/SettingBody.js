import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import MenuItem from "./MenuItem";
import { Header } from "./Header";
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from "../../../styles";
import { LanguageSelection } from "./LanguageSelection";
import { OtherSelection } from "./OtherSelection";

export const SettingBody = () => {


  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.menuContainer}>
        <CustomText style={styles.titleHeader}>Ngôn ngữ</CustomText>
        <LanguageSelection />
        <CustomText style={styles.titleHeader}>Khác</CustomText>
        <OtherSelection />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Thay flex: 1 bằng flexGrow
    width: "100%", // Đảm bảo chiếm hết chiều rộng
  },
  menuContainer: {
    paddingVertical: 10,
    width: "100%", // Đảm bảo nó không bị bó hẹp
    alignSelf: "center", // Căn giữa danh sách
  },
  titleHeader: {
    color: AppColors.primary,
    fontSize: 20,
    padding: 10,
    fontFamily: "Roboto-Medium",
  },
});
