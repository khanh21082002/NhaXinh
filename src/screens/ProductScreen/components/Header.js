import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from "../../../styles";
import FilterModal from "./FilterModal"; // Import FilterModal

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleApplyFilter = () => {
    console.log("Filters applied");
    toggleModal();
  };

  const handleClearFilter = () => {
    console.log("Filters cleared");
    toggleModal();
  };

  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 10, left: 15, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/icons/arrow_back.png")}
            style={{ width: 35, height: 35 }}
            borderRadius={8}
            backgroundColor={AppColors.primaryLight}
          />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.title}>Tất cả sản phẩm</CustomText>
      <TouchableOpacity style={styles.icon} onPress={toggleModal}>
        <Icon name="filter-menu-outline" size={30} color={AppColors.primary} />
      </TouchableOpacity>

      {/* Filter Modal */}
      <FilterModal
        visible={modalVisible}
        toggleModal={toggleModal}
        onApply={handleApplyFilter}
        onClear={handleClearFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: AppColors.primary,
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    paddingBottom: 5,
  },
  icon: {
    position: "absolute",
    bottom: 10,
    right: 15,
    zIndex: 10,
  },
});

export default Header;
