import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
//Icon
import  AntDesign  from "react-native-vector-icons/AntDesign";
//Colors
import Colors from "../../../utils/Colors";
//NumberFormat
import Number from "../../../components/UI/NumberFormat";
//Text
import CustomText from "../../../components/UI/CustomText";
import { BlurView } from "@react-native-community/blur";
//PropTypes check
import PropTypes from "prop-types";
import App from "../../../../App";
import { AppColors } from "../../../styles";

export class ProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  render() {
    const { navigation, item } = this.props;
    const toDetail = () => {
      navigation.navigate("Detail", { item });
    };
    return (
      <View style={{ width: "48%" }}>
  {/* Thay BlurView bằng View thông thường */}
  <View style={styles.container}>
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={toDetail}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onLoadStart={() => {
            this.setState({ loading: true });
          }}
          onLoadEnd={() => this.setState({ loading: false })}
        />
      </TouchableOpacity>
      {this.state.loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="small" color={Colors.grey} />
        </View>
      )}
    </View>
    <View style={styles.center}>
      <CustomText style={styles.name}>{item.title}</CustomText>
    </View>
    <View style={styles.info}>
      <View style={styles.rate}>
        <AntDesign name="star" color="#fed922" size={15} />
        <Text style={styles.score}>5.0</Text>
      </View>
      <Number price={item.price} />
    </View>
    <View style={{ marginHorizontal: 5 }}>
      <TouchableOpacity style={styles.btn} onPress={toDetail}>
        <CustomText style={styles.detailBtn}>Xem chi tiết</CustomText>
      </TouchableOpacity>
    </View>
  </View>
</View>

    );
  }
}

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 190,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Tăng độ nổi trên Android
  },
  image: {
    width: "100%",
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 3,
    color: AppColors.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.text,
  },
  btn: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  detailBtn: {
    color: AppColors.primary,
    marginRight: 5,
  },
});
