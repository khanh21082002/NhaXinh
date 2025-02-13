import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../utils/Colors";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import SearchItem from "./SearchItem";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

export const Header = ({ products, navigation, scrollPoint, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const input_box_translate_x = useSharedValue(width);
  const back_button_opacity = useSharedValue(0);
  const content_translate_y = useSharedValue(height);
  const content_opacity = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const searchFilterFunction = (searchText) => {
    const data = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setKeyword(searchText);
    setFilteredProducts(data);
  };

  const _onFocus = () => {
    setIsFocused(true);
    input_box_translate_x.value = withTiming(0, { duration: 200 });
    back_button_opacity.value = withTiming(1, { duration: 200 });
    content_translate_y.value = withTiming(0, { duration: 0 });
    content_opacity.value = withTiming(1, { duration: 200 });
  };

  const _onBlur = () => {
    setIsFocused(false);
    setKeyword("");
    setFilteredProducts([]);
    console.log("Back button pressed!")
    input_box_translate_x.value = withTiming(width, { duration: 50 });
    back_button_opacity.value = withTiming(0, { duration: 50 });
    content_translate_y.value = withTiming(height, { duration: 0 });
    content_opacity.value = withTiming(0, { duration: 200 });
  };

  const scrollY = scrollPoint || useSharedValue(0);
  const headerPlatform = 50;

  const _header_translate_y = useDerivedValue(() =>
    withTiming(scrollY.value > headerPlatform ? -headerPlatform : 0, { duration: 200 })
  );

  const _header_opacity = useDerivedValue(() =>
    withTiming(scrollY.value > headerPlatform ? 0 : 1, { duration: 200 })
  );

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: _header_translate_y.value }],
    opacity: _header_opacity.value,
  }));

  return (
    <>
      <SafeAreaView style={{ ...styles.header_safe_area, ...style }}>
        <Animated.View
          style={[
            styles.header,
            animatedHeaderStyle,
            { zIndex: scrollY.value > headerPlatform ? -1 : 1000 } // Khi ẩn thì zIndex < 0
          ]}
          pointerEvents={scrollY.value > headerPlatform ? "none" : "auto"}

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
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SearchItem item={item} navigation={navigation} />
            )}
            style={styles.resultList}
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
