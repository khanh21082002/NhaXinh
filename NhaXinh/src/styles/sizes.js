/**
 * App Theme - Sizes
 */

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
    // Window Dimensions
    screen: {
        height: screenHeight,
        width: screenWidth,
    },

    paddingXLarge:40,
    paddingLarge: 32,
    paddingMedium: 24,
    paddingXSMedium : 20,
    padding: 16,
    paddingXXMedium:12,
    paddingSmall: 8,
    paddingXSmall:4,

    marginXLarge:40,
    marginLarge: 32,
    marginXXMedium:28,
    marginMedium: 24,
    margin: 16,
    marginXMedium:12,
    marginSml: 8,
    marginXSmall:4,

    fontXSmall: 6,
    fontSmall: 12,
    fontBase: 14,
    fontMedium: 16,
    fontXMedium: 18,
    fontLarge: 20,
    fontXLarge: 24,
    fontXXLarge:30,
    fontXXXLarge:40,

};