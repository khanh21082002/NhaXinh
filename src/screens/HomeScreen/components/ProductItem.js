import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../../utils/Colors";
import Number from "../../../components/UI/NumberFormat";
import CustomText from "../../../components/UI/CustomText";
import PropTypes from "prop-types";

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
      <TouchableOpacity onPress={toDetail} style={styles.container}>
        {/* Hình ảnh sản phẩm */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            onLoadStart={() => this.setState({ loading: true })}
            onLoadEnd={() => this.setState({ loading: false })}
          />
          {this.state.loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={Colors.grey} />
            </View>
          )}
        </View>

        {/* Nhãn "New" */}
        <View style={styles.newLabel}>
          <Text style={styles.newText}>New</Text>
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <CustomText style={styles.name} numberOfLines={1}>
            {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
          </CustomText>
          <View style={styles.priceContainer}>
            <Number price={item.price} style={styles.price} />
            <TouchableOpacity style={styles.cartButton}>
              <AntDesign name="shoppingcart" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 200, // 🔥 Đặt chiều rộng cố định
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingBottom: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    marginRight: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  newLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFC107",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  newText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "left",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  cartButton: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 20,
  },
});

export default ProductItem;
