import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
import { BlurView } from "@react-native-community/blur";
//icon
import  AntDesign  from "react-native-vector-icons/AntDesign";
//Text
import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

const HorizontalItem = ({ item, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={{ backgroundColor: Colors.white }}>
      <View tint="dark" intensity={10} style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { item: item })}
          style={{ marginLeft: 5, width: "40%", marginRight: 10 }}
        >
          <Image
            style={{
              height: 90,
              width: "100%",
              resizeMode: "stretch",
              borderRadius: 15,
            }}
            source={{ uri: item.image }}
            onLoadStart={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => setIsLoading(false)}
          />
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={Colors.grey}
              style={{ position: "absolute", left: 0, right: 0, top: 40 }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.info}>
          <CustomText style={styles.title}>{item.title}</CustomText>
          <CustomText style={styles.subText}>Xuất xứ {item.origin}</CustomText>
          <View style={styles.rateContainer}>
            <View style={styles.rate}>
              <AntDesign name="star" color="#fed922" size={15} />
              <CustomText style={styles.score}>{item.rating.rate}</CustomText>
            </View>
            <NumberFormat price={item.price} />
          </View>
        </View>
      </View>
    </View>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    flexDirection: "row",
     backgroundColor: AppColors.primaryLight,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  info: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingVertical: 10,
    width: "60%",
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,
    color: Colors.grey,
    marginVertical: 10,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
});

export default HorizontalItem;
