import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ProductItem } from "./ProductItem";
import CustomText from "../../../components/UI/CustomText";
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

    // Lấy danh sách sản phẩm theo danh mục `name`
    function getItems() {
      return categorizedData[name] || [];
    }

    return (
      <View style={styles.category}>
        {/* Header: Tiêu đề + View All */}
        <View style={styles.header}>
          <CustomText style={styles.title}>{name}</CustomText>
          <TouchableOpacity onPress={() => navigation.navigate("Product")}>
            <CustomText style={styles.viewAll}>Xem thêm {">>"}</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={getItems()}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : index.toString()
          }
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View>
              <ProductItem item={item} navigation={navigation} />
            </View>
          )}
        />
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
    paddingVertical: 15,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: AppColors.primary,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default CategorySection;
