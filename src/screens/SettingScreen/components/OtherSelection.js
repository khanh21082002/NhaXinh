import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItem from "./MenuItem";
import { AppColors } from "../../../styles";


export const OtherSelection = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      icon: "notifications-outline",
      title: "Thông báo",
      screen: "",
      isSwitch: true,
      value: isNotificationsEnabled,
      onValueChange: setIsNotificationsEnabled, // Update state when switch toggles
    },
    { icon: "information-circle-outline", title: "Điều khoản sử dụng", screen: "" },
    { icon: "lock-open-outline", title: "Chính sách bảo mật", screen: "" },
    { icon: "cash-outline", title: "Chính sách thanh toán", screen: "" },
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={() => navigation.navigate(item.screen)}
            isSwitch={item.isSwitch}
            value={item.value}
            onValueChange={item.onValueChange}
          />
        ))}
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
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: "100%", // Đảm bảo nó không bị bó hẹp
    alignSelf: "center", // Căn giữa danh sách
  },
  titleHeader: {
    color: AppColors.primary,
    fontSize: 20,
    paddingHorizontal: 20,
    fontFamily: "Roboto-Medium",
  },
});
