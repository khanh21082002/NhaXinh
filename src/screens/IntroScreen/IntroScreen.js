import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
// Redux
import { useDispatch } from "react-redux";
// Action
import * as CheckFirstTimeAction from "../../reducers/product/checkFirstTimeActions";
// Slides
import { Slide, SubSlide, Ticker, Pagination } from "./components";
import slides from "../../db/IntroSlides";
import Loader from "../../components/Loaders/Loader";

const { height, width } = Dimensions.get("window");

export const IntroScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollClick = useRef(null);
  const unmounted = useRef(false);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const textTranslate = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, width * -1, width * -2],
    extrapolate: "clamp",
  });

  const EnterApp = async () => {
    setLoading(true);
    await dispatch(CheckFirstTimeAction.firstOpen());
    if (!unmounted.current) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider]}>
        <Animated.ScrollView
          ref={scrollClick}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {slides.map((slide) => {
            return <Slide key={slide.id} imageUrl={slide.imageUrl} />;
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          <Pagination slides={slides} scrollX={scrollX} />
        </View>
        <View style={styles.spacing} />
        <Animated.View style={styles.footerContent}>
          <Animated.View
            style={{
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: textTranslate }],
            }}
          >
            {slides.map((id, index) => {
              return (
                <SubSlide
                  key={id}
                  last={index === slides.length - 1}
                  EnterApp={EnterApp}
                  scrollX={scrollX}
                  NextSlide={() => {
                    if (scrollClick.current) {
                      scrollClick.current.scrollTo({ x: width * (index + 1) });
                    }
                  }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  slider: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    height: height,
    borderBottomEndRadius: 75,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 20,  // Added some bottom padding to avoid overlap
    zIndex: 1,
  },
  footerContent: {
    flex: 1,
  },
  spacing: {
    height: 60,  // Adjust this height to control the space between Pagination and SubSlide
  },
  paginationContainer: {
    position: "absolute",
    left: 100,  // Adjust this to control the distance from the left edge
    top: 20,  // Adjust the top positioning if needed
    zIndex: 2,  // Make sure it appears above other elements
  },
});
