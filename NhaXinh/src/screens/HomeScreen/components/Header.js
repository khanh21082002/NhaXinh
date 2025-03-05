import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../utils/Colors";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

export const Header = ({ user, products, navigation, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Animated values
  const inputBoxTranslateX = new Animated.Value(width);
  const backButtonOpacity = new Animated.Value(0);
  const contentTranslateY = new Animated.Value(height);
  const contentOpacity = new Animated.Value(0);
  const scrollY = new Animated.Value(0); // Using Animated.Value for scroll position

  useEffect(() => {
    if (isFocused) {
      Animated.timing(inputBoxTranslateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(backButtonOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(inputBoxTranslateX, {
        toValue: width,
        duration: 50,
        useNativeDriver: true,
      }).start();
      Animated.timing(backButtonOpacity, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
      Animated.timing(contentTranslateY, {
        toValue: height,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  const _onFocus = () => {
    setIsFocused(true);
  };

  const headerPlatform = 50;

  const _headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [0, -headerPlatform],
    extrapolate: "clamp",
  });

  const _headerOpacity = scrollY.interpolate({
    inputRange: [0, headerPlatform],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <SafeAreaView style={{ ...styles.header_safe_area, ...style }}>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: _headerTranslateY }],
              opacity: _headerOpacity,
            },
          ]}
        >
          <View style={styles.header_inner}>
            {/* Profile Image */}
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                source={user.profilePicture?.length === 0 ? { uri: user.profilePicture } || require("../../../assets/images/defaultprofile.png") : require("../../../assets/images/defaultprofile.png")}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            {/* Chat Bubble Icon
            <TouchableOpacity onPress={_onFocus} style={styles.chatIconBox}>
              <Icon name="message-processing-outline" size={28} color={Colors.black} />
            </TouchableOpacity> */}
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: Colors.white,
  },
  header: {
    position: "absolute",
    backgroundColor: Colors.white,
    width,
    height: 50,
    top: 10,
  },
  header_inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    resizeMode: "cover",
  },
  chatIconBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
