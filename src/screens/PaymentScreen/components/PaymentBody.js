import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
//Text
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const { width } = Dimensions.get("window");

export const PaymentBody = ({ navigation, payByCard, setPayByCard, token }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Chọn Hình Thức Thanh Toán</CustomText>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <Checkbox
            status={!payByCard ? "checked" : "unchecked"}
            color={AppColors.primary}
            onPress={() => {
              setPayByCard(false);
            }}
          />
          <MaterialCommunityIcons
            name='cash'
            size={40}
            color={AppColors.primary}
            style={{ marginLeft: 10 }}
          />
          <CustomText style={styles.optionText}>Thanh toán tiền mặt</CustomText>
        </View>
        <View style={styles.option}>
          <Checkbox
            status={payByCard ? "checked" : "unchecked"}
            color={AppColors.primary}
            onPress={() => navigation.navigate("AddCreditCardScreen")}
            // containerStyle={{ padding: 5 }}
          />
          <MaterialCommunityIcons
            name='credit-card-outline'
            size={35}
            color={AppColors.primary}
            style={{ marginLeft: 10 }}
          />
          <View style={styles.cardContainer}>
            <CustomText style={{ ...styles.optionText, marginHorizontal: 0 }}>
              Thanh toán bằng thẻ tín dụng
            </CustomText>
            <Image
              style={styles.cardImage}
              source={require("../../../assets/images/creditcards.png")}
            />
            {payByCard && token ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name='dots-two-horizontal' size={24} color='black' />
                <CustomText>{token.card.last4}</CustomText>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

PaymentBody.propTypes = {
  setPayByCard: PropTypes.func.isRequired,
  payByCard: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
  },
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  optionContainer: {
    width,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "400",
    marginHorizontal: 15,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  cardImage: {
    resizeMode: "contain",
    height: 25,
    width: 100,
  },
});
