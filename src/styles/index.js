/**
 * @flow
 * Centralized styles management
 */

import { Dimensions, Platform } from 'react-native';

import colors from './colors';
import fonts from './fonts';
import commonStyles from './common';
import AppSizes from './sizes';
import AppColors from './colors';
import AppFonts from './fonts';
import AppStyles from './common';

const { width } = Dimensions.get('window');

// Base width for scaling sizes
const guidelineBaseWidth = 375;

// Custom Colors
const AppColorsCustom = {
  ...colors, 
  primary: '#ECAC33',
  primaryLight : '#FDF7EB',
  secondary: '#6c757d',
  background: '#ffffff',
  yellowLight: '#533C12',
};

// Typography Styles
const AppTypography = {
  title: {
    fontSize: 35,
    fontFamily: Platform.select({
      ios: fonts.primary,
      android: fonts.primaryBold,
    }),
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 34,
    fontFamily: Platform.select({
      ios: fonts.primary,
      android: fonts.primaryBold,
    }),
    fontWeight: 'bold',
  },
  rubik18: { fontFamily: fonts.primary, fontSize: 18, lineHeight: 22 },
  rubik20Bold: { fontFamily: fonts.primary, fontSize: 20, lineHeight: 22, fontWeight: 'bold' },
  h2: { fontSize: 18, fontFamily: fonts.primaryBold, lineHeight: 22 },
  p: {
    fontSize: 14,
    fontFamily: Platform.select({
      ios: fonts.primary,
      android: fonts.primaryAndroid,
    }),
    lineHeight: 20,
  },
  default: { fontFamily: fonts.primary, fontSize: 18 },
};

// Scale helper
const scale = (size, base = guidelineBaseWidth) => (width / base) * size;

// Assets Placeholder
const AppAssets = {
  images: {}, // Add your images here
  icons: {}, // Add your icons here
};

// Exports
export {
  AppStyles,
  AppSizes,
  AppFonts,
  AppColorsCustom as AppColors,
  AppTypography,
  AppAssets,
  colors,
  fonts,
  commonStyles,
  scale,
};
