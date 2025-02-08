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
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../utils/Colors';
import SearchItem from './SearchItem';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedStyle,
  Extrapolate
} from 'react-native-reanimated';
import { AppColors } from '../../../styles';

const { width, height } = Dimensions.get('window');

export const Header = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [productsFilter, setProductsFilter] = useState([]);

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

  const scrollY = props.scrollPoint || useSharedValue(0);
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
      <SafeAreaView style={{ ...styles.header_safe_area, ...props.style }}>
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <View style={styles.header_inner}>
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
              <Icon name='magnify' size={20} color={Colors.white} />
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
