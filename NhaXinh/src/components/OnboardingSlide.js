import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const OnboardingSlide = ({ image }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} style={styles.image}>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

 image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default OnboardingSlide;
