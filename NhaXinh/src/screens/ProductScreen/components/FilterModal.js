import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from "../../../styles";

const FilterModal = ({ visible, toggleModal, onApply, onClear }) => {
  const [priceFilter, setPriceFilter] = useState("Mới nhất");
  const [materialFilter, setMaterialFilter] = useState("Tất cả");
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [materialDropdownVisible, setMaterialDropdownVisible] = useState(false);

  const priceOptions = [
    "Mới nhất",
    "Theo giá: Thấp đến cao",
    "Theo giá: Cao đến thấp",
  ];

  const materialOptions = ["Tất cả", "Da", "Gỗ", "Da và vải"];

  const handlePriceChange = (value) => {
    setPriceFilter(value);
    setPriceDropdownVisible(false);
  };

  const handleMaterialChange = (value) => {
    setMaterialFilter(value);
    setMaterialDropdownVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <CustomText style={styles.modalTitle}>Lọc sản phẩm</CustomText>

              {/* Price Dropdown */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel}>Giá</CustomText>
                <TouchableOpacity
                  onPress={() => setPriceDropdownVisible(!priceDropdownVisible)}
                  style={styles.dropdownButton}
                >
                  <CustomText style={styles.dropdownText}>{priceFilter}</CustomText>
                </TouchableOpacity>
                {priceDropdownVisible && (
                  <FlatList
                    data={priceOptions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handlePriceChange(item)}
                        style={styles.dropdownItem}
                      >
                        <CustomText style={styles.dropdownText}>{item}</CustomText>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.dropdownList}
                  />
                )}
              </View>

              {/* Material Dropdown */}
              <View style={styles.filterOption}>
                <CustomText style={styles.filterLabel}>Chất liệu</CustomText>
                <TouchableOpacity
                  onPress={() => setMaterialDropdownVisible(!materialDropdownVisible)}
                  style={styles.dropdownButton}
                >
                  <CustomText style={styles.dropdownText}>{materialFilter}</CustomText>
                </TouchableOpacity>
                {materialDropdownVisible && (
                  <FlatList
                    data={materialOptions}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleMaterialChange(item)}
                        style={styles.dropdownItem}
                      >
                        <CustomText style={styles.dropdownText}>{item}</CustomText>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.dropdownList}
                  />
                )}
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.applyButton} onPress={onApply}>
                  <CustomText style={styles.buttonText}>Áp dụng</CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={onClear}>
                  <CustomText style={styles.buttonText}>Xóa bộ lọc</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterOption: {
    width: "100%",
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownButton: {
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownList: {
    width: "100%",
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#dcdcdc",
    marginTop: 5,
    backgroundColor: "#fff",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  applyButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
  },
});

export default FilterModal;
