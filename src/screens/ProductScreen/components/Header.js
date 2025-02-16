import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Image,
  Animated,
} from "react-native";

import ShareItem from "../../../components/UI/ShareItem";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 180;
const HEADER_MIN = 90;
const HEADER_DISTANCE = HEADER_HEIGHT - HEADER_MIN;

export const Header = ({ navigation, searchFilterFunction, scrollY }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [0, -HEADER_MIN / 2],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [0, -HEADER_MIN + 10],
    extrapolate: "clamp",
  });

  const searchScaleX = scrollY.interpolate({
    inputRange: [0, HEADER_DISTANCE],
    outputRange: [1, 1.1], 
    extrapolate: "clamp",
  });

  return (
    <>
      <View style={styles.topBar}>
        <View style={{ position: "absolute", left: 0, top: 40, zIndex: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
            <Image
              source={require("../../../assets/images/icons/arrow_back.png")}
              style={{ width: 35, height: 35 }}
              borderRadius={8}
              backgroundColor={AppColors.primaryLight}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.shareItem}>
          <ShareItem
            imageURL="https://www.facebook.com/daquyankhangthinhvuong/"
            title="Share our facebook page"
            message="Our Facebook Link"
            color="black"
          />
        </View>
        <Animated.View
          style={[styles.searchContainer, { transform: [{ translateY: searchTranslateY }] }]}
        >
          <Animated.View
            style={[styles.searchBox, { transform: [{ scaleX: searchScaleX }] }]}
          >
            <TextInput
              placeholder="Tìm kiếm sản phẩm"
              placeholderTextColor={Colors.white}
              clearButtonMode="always"
              onChangeText={searchFilterFunction}
              style={styles.textInput}
            />
          </Animated.View>
        </Animated.View>
      </View>
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <Animated.View style={[styles.titleContainer, { opacity }]}>
          <CustomText style={styles.title}>Tất cả sản phẩm</CustomText>
        </Animated.View>
      </Animated.View>
    </>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
  scrollY: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "center", // Adjusted to space elements evenly
    paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_MIN,
    zIndex: 100,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    height: HEADER_HEIGHT,
    backgroundColor: AppColors.primary,
    zIndex: 1,
  },
  titleContainer: {
    height: 50,
  },
  title: {
    marginTop: Platform.OS === "android" ? 0 : 5,
    fontSize: 30,
    color: Colors.white,
  },
  shareItem: {
    position: "absolute",
    right: 0,
    top: 40,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    position: "absolute",
    bottom: -HEADER_MIN + 20,
    width: "80%", // Adjust width to 80% for better display
    alignSelf: "center", // Center the search bar horizontally
    borderRadius: 5,
    zIndex: 5,
  },
  searchBox: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  textInput: {
    height: 50,
    color: Colors.white,
    fontSize: 16, // Increased font size for better readability
  },
});

export default Header;
