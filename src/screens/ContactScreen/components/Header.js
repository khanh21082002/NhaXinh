import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
//Icon
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const { height } = Dimensions.get("window");

export const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name='menu' size={25} color='#fff' />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={require("../../../assets/images/logoTextWhite.png")}
      />
    </View>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: height < 668 ? 30 : 50,
    left: 15,
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    height: 200,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
  },
  image: {
    marginTop: 15,
    height: 70,
    resizeMode: "contain",
  },
});
