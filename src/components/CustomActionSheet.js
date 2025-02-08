// CustomActionSheet.js
import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { AppColors } from '../styles';

const CustomActionSheet = (props) => {
  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{ padding: 20 }}
      indicatorStyle={{ backgroundColor: 'grey' }}
      gestureEnabled={true}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.payload.handler(0); // Chụp ảnh mới
          SheetManager.hide(props.sheetId);
        }}
      >
        <Text style={styles.buttonText}>Chụp ảnh mới</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.payload.handler(1); // Chọn ảnh từ thư viện
          SheetManager.hide(props.sheetId);
        }}
      >
        <Text style={styles.buttonText}>Chọn từ thư viện</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomActionSheet;
