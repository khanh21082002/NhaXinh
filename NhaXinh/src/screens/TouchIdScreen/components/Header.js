import React from "react";
import { View, StyleSheet, TouchableOpacity , Image } from "react-native";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import Ionicons from 'react-native-vector-icons/Ionicons';
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

export const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
