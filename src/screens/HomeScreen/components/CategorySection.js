import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import { BlurView } from "@react-native-community/blur";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

export class CategorySection extends React.PureComponent {
  render() {
    const { data, name, navigation } = this.props;
    const categorizedData = data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});


    // Lấy danh sách sản phẩm theo name (danh mục)
    function getItems() {
      return categorizedData[name] || [];
    }
    return (
      <View style={[styles.category]}>
        
        <View style={styles.titleHeader}>
          <CustomText style={styles.title}>{name}</CustomText>
        </View>
        <View style={styles.productList}>
          <FlatList
            data={getItems()}
            keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
            numColumns={2}
            columnWrapperStyle={styles.list}
            renderItem={({ item }) => {
              return (
                <ProductItem
                  item={item}
                  navigation={navigation}
                />
                
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Product")}
          style={{ marginHorizontal: 10 }}
        >
          {/* Sử dụng View với nền mặc định */}
          <View style={styles.seeMore}>
            <CustomText style={styles.seeMoreText}>Xem Thêm</CustomText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CategorySection.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  category: {
    height: 518,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: AppColors.primaryLight,
  },
  background: {
    position: "absolute",
    resizeMode: "stretch",
    borderRadius: 5,
    height: 518,
    width: "100%",
    bottom: 0,
  },
  titleHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: AppColors.primary,
    fontWeight: "500",
  },
  list: {
    justifyContent: "space-between",
  },
  productList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  seeMore: {
    backgroundColor: AppColors.primary,
    width: "100%",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 14,
    color: AppColors.white,
  },
});
