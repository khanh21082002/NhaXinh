import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

// Skeleton Loading Component
const Skeleton = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Create fade animation for loading effect

  useEffect(() => {
    // Animate the fade-in effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Banner Placeholder */}
      <View style={styles.banner}>
        <Animated.View
          style={[styles.placeholder, { opacity: fadeAnim, width: '100%', height: 130 }]}
        />
      </View>
      {/* Text Placeholder */}
      <View style={styles.text}>
        <Animated.View
          style={[styles.placeholder, { opacity: fadeAnim, width: '60%', height: 30 }]}
        />
      </View>
      {/* Content Placeholder */}
      <View style={styles.content}>
        <View style={{ width: '49%' }}>
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '95%', height: 95 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '80%', height: 20, marginTop: 5 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '30%', height: 20, marginTop: 5 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '95%', height: 40, marginTop: 5 }]}
          />
        </View>
        <View style={{ width: '49%' }}>
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '95%', height: 95 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '80%', height: 20, marginTop: 5 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '30%', height: 20, marginTop: 5 }]}
          />
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '95%', height: 40, marginTop: 5 }]}
          />
        </View>
      </View>
      {height < 668 ? (
        <View />
      ) : (
        <View style={{ ...styles.text, marginTop: 10 }}>
          <Animated.View
            style={[styles.placeholder, { opacity: fadeAnim, width: '100%', height: 50 }]}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    position: 'absolute',
    width,
    backgroundColor: '#fff',
    height,
    marginTop: 80,
  },
  placeholder: {
    backgroundColor: '#eeeeee',
    borderRadius: 5,
  },
  banner: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Skeleton;
