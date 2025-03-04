import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { AppColors } from "../../../styles";

export default function OTPField({ input, meta: { touched, error }, ...inputProps }) {
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const currentValue = input.value || ''; // Tránh lỗi nếu giá trị ban đầu là undefined
    let newValue = currentValue.split('');
    newValue[index] = text;

    input.onChange(newValue.join(''));

    // Chuyển focus sang ô tiếp theo nếu nhập xong
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    const currentValue = input.value || '';
    const key = event.nativeEvent.key;

    if (key === 'Backspace' && !currentValue[index]) {
      // Khi xóa và ô hiện tại rỗng, focus sang ô trước đó
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        let newValue = currentValue.split('');
        newValue[index - 1] = ''; // Xóa giá trị của ô trước
        input.onChange(newValue.join(''));
      }
    }
  };

  return (
    <View style={styles.otpInputContainer}>
      <View style={styles.otpInputWrapper}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            value={input.value ? input.value[index] : ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
            editable={true}
            scrollEnabled={false}
          />
        ))}
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  otpInputContainer: {
    marginBottom: 20,
  },
  otpInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: AppColors.primary,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: AppColors.primaryLight,
    color: AppColors.text,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
