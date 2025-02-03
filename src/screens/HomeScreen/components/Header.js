import React, { useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors';
import SearchItem from './SearchItem';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export const Header = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [productsFilter, setProductsFilter] = useState([]);

  // animation values using reanimated v3
  const input_box_translate_x = useSharedValue(width);
  const back_button_opacity = useSharedValue(0);
  const content_translate_y = useSharedValue(height);
  const content_opacity = useSharedValue(0);

  const searchFilterFunction = (searchText) => {
    const data = props.products.filter((product) =>
      product.filename.toLowerCase().includes(searchText.toLowerCase())
    );
    setKeyword(searchText);
    setProductsFilter(data);
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

    input_box_translate_x.value = withTiming(width, { duration: 50 });
    back_button_opacity.value = withTiming(0, { duration: 50 });
    content_translate_y.value = withTiming(height, { duration: 0 });
    content_opacity.value = withTiming(0, { duration: 200 });
  };

  // Replace scrollY with props.scrollPoint
  const scrollY = props.scrollPoint;

  const headerPlatform = 50; // The height at which the header should disappear

  // Use interpolate to animate header's opacity and translate
  // const _header_translate_y = interpolate(scrollY || 0, {
  //   inputRange: [0, headerPlatform],
  //   outputRange: [0, -headerPlatform],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  // const _header_opacity = interpolate(scrollY, {
  //   inputRange: [0, headerPlatform],
  //   outputRange: [1, 0],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  // // Animated style for the header
  // const animatedHeaderStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       translateY: _header_translate_y,
  //     },
  //   ],
  //   opacity: _header_opacity,
  // }));

  return (
    <>
      <SafeAreaView style={{ ...styles.header_safe_area, ...props.style }}>
      {/* <Animated.View style={[styles.header, animatedHeaderStyle]}> */}
          <View style={styles.header_inner}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Ionicons name='ios-menu' size={30} color={Colors.lighter_green} />
            </TouchableOpacity>
            <View>
              <Image
                source={require('../../../assets/images/logoNoText.png')}
                style={{ width: height < 668 ? 130 : 120, resizeMode: 'contain' }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              underlayColor={'#ccd0d5'}
              onPress={_onFocus}
              style={styles.search_icon_box}
            >
              <Ionicons name='ios-search' size={20} color={Colors.white} />
            </TouchableOpacity>
            <Animated.View style={[styles.input_box, { transform: [{ translateX: input_box_translate_x }] }]}>
              <Animated.View style={{ opacity: back_button_opacity }}>
                <TouchableOpacity
                  activeOpacity={1}
                  underlayColor={'#ccd0d5'}
                  onPress={_onBlur}
                  style={styles.back_icon_box}
                >
                  <Ionicons name='ios-arrow-back' size={25} color={Colors.light_green} />
                </TouchableOpacity>
              </Animated.View>
              <TextInput
                placeholder='Tìm kiếm sản phẩm'
                clearButtonMode='always'
                value={keyword}
                onChangeText={(value) => searchFilterFunction(value)}
                style={styles.input}
              />
            </Animated.View>
          </View>
        {/* </Animated.View> */}
      </SafeAreaView>
      <Animated.View
        style={[styles.content, { opacity: content_opacity, transform: [{ translateY: content_translate_y }] }]}
      >
        <View style={styles.content_safe_area}>
          {keyword === '' ? (
            <View style={styles.image_placeholder_container}>
              <Image
                source={require('../../../assets/images/logo1.png')}
                style={styles.image_placeholder}
              />
              <Text style={styles.image_placeholder_text}>
                Nhập vào từ khóa{'\n'}để tìm kiếm :D
              </Text>
            </View>
          ) : (
            <View style={{ marginHorizontal: 20, marginTop: Platform.OS === 'android' ? 0 : height < 668 ? 0 : 60 }}>
              {productsFilter && productsFilter.length === 0 ? (
                <Text style={styles.image_placeholder_text}>Không tìm thấy sản phẩm</Text>
              ) : (
                <FlatList
                  data={productsFilter}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <SearchItem item={item} navigation={props.navigation} />}
                />
              )}
            </View>
          )}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    position: 'absolute',
    backgroundColor: Colors.white,
    width,
    height: 50,
    top: Platform.OS === 'android' ? StatusBar.currentHeight : height > 736 ? 40 : 20,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: Colors.lighter_green,
    borderWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.white,
    width: width,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 80 : 40,
    paddingBottom: 80,
    backgroundColor: Colors.white,
  },
  image_placeholder_container: {
    flexDirection: 'column',
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
});

export default Header;
