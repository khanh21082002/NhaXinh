import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Icon from "react-native-vector-icons/MaterialIcons";  // Sử dụng react-native-vector-icons thay vì @expo/vector-icons
import Colors from "../../utils/Colors";
import { AppColors } from "../../styles";

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: AppColors.primary,
  stepStrokeWidth: 1,
  separatorStrokeFinishedWidth: 1,
  stepStrokeFinishedColor: "#ffffff",
  stepStrokeUnFinishedColor: AppColors.primary,
  separatorFinishedColor: AppColors.primaryn,
  separatorUnFinishedColor: AppColors.primary,
  stepIndicatorFinishedColor: AppColors.primary,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  let iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" : AppColors.primary,
    size: 14,
  };

  switch (position) {
    case 0: {
      iconConfig.name = "check";  // Biểu tượng "check" cho bước đầu tiên
      break;
    }
    case 1: {
      iconConfig.name = "location-on";  // Biểu tượng "location" cho bước thứ hai
      break;
    }
    case 2: {
      iconConfig.name = "payment";  // Biểu tượng "payment" cho bước thứ ba
      break;
    }
    case 3: {
      iconConfig.name = "done-all";  // Biểu tượng "done-all" cho bước cuối cùng
      break;
    }
    default:
      break;
  }

  return iconConfig;
};

const OrderSteps = ({ position }) => {
  const [currentPage, setCurrentPage] = useState(position);

  const renderStepIndicator = (params) => (
    <Icon {...getStepIndicatorIconConfig(params)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={secondIndicatorStyles}
          stepCount={4}
          currentPosition={currentPage}
          renderStepIndicator={renderStepIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrderSteps;
