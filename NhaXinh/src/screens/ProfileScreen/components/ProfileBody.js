import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import MenuItem from "./MenuItem";

export const ProfileBody = ({ user }) => {
  const menuItems = [
    { icon: "person-outline", title: "Thông tin cá nhân", screen: "PersonalInfo" },
    { icon: "time-outline", title: "Lịch sử mua hàng" , screen: "Order"},
    { icon: "card-outline", title: "Liên kết ngân hàng", screen: "PaymentMethod"},
    { icon: "help-circle-outline", title: "Hỗ trợ" },
    { icon: "settings-outline", title: "Cài đặt" , screen: "Setting"},
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
            onPress={() => navigation.navigate(item.screen , { user })}
          />
        ))}
      </View>
    </View>
  );
};

ProfileBody.propTypes = {
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1, // Thay flex: 1 bằng flexGrow
    width: "100%", // Đảm bảo chiếm hết chiều rộng
  },
  menuContainer: {
    paddingVertical: 10,
    width: "100%", // Đảm bảo nó không bị bó hẹp
    alignSelf: "center", // Căn giữa danh sách
  },
});

export default ProfileBody;
