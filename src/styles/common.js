import { Platform, StatusBar, StyleSheet } from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
  },
  loadingIndicator: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function logoSize(width, height) {
  let maxWidth = 110;
  let maxHeight = 30;
  let ret;

  if (width >= height) {
    let ratio = maxWidth / width;
    let h = Math.ceil(ratio * height);

    if (h > maxHeight) {
      // Too tall, resize
      let ratio = maxHeight / height;
      let w = Math.ceil(ratio * width);
      ret = {
        width: w,
        height: maxHeight,
      };
    } else {
      ret = {
        width: maxWidth,
        height: h,
      };
    }
  } else {
    let ratio = maxHeight / height;
    let w = Math.ceil(ratio * width);

    if (w > maxWidth) {
      let ratio = maxWidth / width;
      let h = Math.ceil(ratio * height);
      ret = {
        width: maxWidth,
        height: h,
      };
    } else {
      ret = {
        width: w,
        height: maxHeight,
      };
    }
  }

  return ret;
}