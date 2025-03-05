import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import CustomText from "../../../components/UI/CustomText";
import Icon from 'react-native-vector-icons/Feather';
//Colors
import Colors from "../../../utils/Colors";
import { AppColors } from "../../../styles";

export default renderField = ({
  keyboardType,
  icon,
  label,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View style={{ marginTop: 30 }}>
      <Icon
        name={icon} // Sử dụng icon do Field truyền vào
        size={20}
        color={AppColors.primary}
        style={{
          position: "absolute",
          top: 23,
          left: 18,
          zIndex: 10,
        }}
      />
      <TextInput
        placeholder={label}
        autoCapitalize='none'
        clearButtonMode='always'
        mode='outlined'
        selectionColor={Colors.leave_green}
        theme={{
          roundness: 10,
          colors: { primary: AppColors.primary }
        }}
        left={
          <TextInput.Icon
            name={icon}
            size={24}
            color={AppColors.primary}
            style={{ paddingRight: 10 }}
          />
        }
        style={{
          fontSize: 12,
          backgroundColor: AppColors.blackLight,
          marginVertical: 5,
        }}
        keyboardType={keyboardType}
        onChangeText={onChange}
        {...restInput}
      />
      {touched &&
        ((error && (
          <CustomText style={{ color: Colors.red }}>{error}</CustomText>
        )) ||
          (warning && (
            <CustomText style={{ color: Colors.red }}>{warning}</CustomText>
          )))}
    </View>
  );
};
