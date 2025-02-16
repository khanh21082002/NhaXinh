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
import SearchItem from "./SearchItem";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

export const Header = ({ products, navigation, style }) => {
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

  const searchFilterFunction = (searchText) => {
    const data = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setKeyword(searchText);
    setFilteredProducts(data);
  };

  const _onFocus = () => {
    setIsFocused(true);
  };

  const _onBlur = () => {
    setIsFocused(false);
    setKeyword("");
    setFilteredProducts([]);
    console.log("Back button pressed!");
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
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{ width: 40, resizeMode: "contain" }}
            />
            <TouchableOpacity onPress={_onFocus} style={styles.search_icon_box}>
              <Icon name="magnify" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Input */}
        {isFocused && (
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={_onBlur} style={styles.backButton}>
              <Icon name="arrow-left" size={32} color={Colors.black} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChangeText={searchFilterFunction}
              autoFocus
            />
          </View>
        )}

        {/* Search Results */}
        {isFocused && (
          <Animated.FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SearchItem item={item} navigation={navigation} />
            )}
            style={styles.resultList}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          />
        )}
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
    top: 0,
  },
  header_inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light_grey,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 55,
  },
  backButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 12,
    paddingHorizontal: 16,
  },
  resultList: {
    backgroundColor: Colors.white,
    marginTop: 5,
    maxHeight: 200,
  },
});

export default Header;
