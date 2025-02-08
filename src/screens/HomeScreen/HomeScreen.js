import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../reducers';
// Colors
import Colors from '../../utils/Colors';
// Animation
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
// Components
import { Carousel, Header, CategorySection, FloatButton, Categories } from './components';
import Skeleton from '../../components/Loaders/SkeletonLoading';
import Snackbar from '../../components/Notification/Snackbar';
// FloatButton
import { Portal, Provider } from 'react-native-paper';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// height
const { height } = Dimensions.get('window');



export const HomeScreen = ({ navigation }) => {


  const dispatch = useDispatch();
  // Header Animation
  let scrollY = useSharedValue(0);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const isLoading = useSelector((state) => state.store.isLoading);
  const notification = useSelector((state) => state.auth.notification);
  // Fetch API
  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, [user.id]);

  // Animated Scroll Handler
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const groupedProducts = products.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        <View style={styles.container}>
          {/* <Header
            scrollPoint={scrollY}
            navigation={navigation}
            products={products}
          /> */}
          <Portal>
            <FloatButton />
          </Portal>
          <AnimatedFlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel />
              </View>
            )}
            scrollEventThrottle={1}
            onScroll={onScroll}
            data={Object.keys(groupedProducts)} 
            keyExtractor={(item) => item} 
            renderItem={({ item }) => (
              <CategorySection
              name={item} // `item` là category name
              data={groupedProducts[item]} 
              navigation={navigation}
              />
            )}
          />
          {Object.keys(notification).length === 0 ? (
            <View />
          ) : (
            <Snackbar
              checkVisible={true}
              message={
                Object.keys(user).length === 0
                  ? notification
                  : notification + ' ' + user.name
              }
            />
          )}
        </View>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  banner: {
    marginBottom: 10,
  },
  list: {
    width: '100%',
    marginTop: 50,
    paddingBottom: 20,
  },
});
