import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { fetchLocals } from "../../../reducers/local";
import { AppColors } from "../../../styles";

const { height } = Dimensions.get("window");

export const FormInput = ({
  label,
  value,
  editable,
  iconName,
  isDate,
  isGender,
  isCity,
  onChangeValue,
}) => {
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const genderOptions = ["Nam", "Nữ"];

  useEffect(() => {
    if (isCity) {
      const fetching = async () => {
        try {
          const citiesData = await dispatch(fetchLocals(1));
          setCities(citiesData);
        } catch (err) {
          console.error("Lỗi khi lấy danh sách tỉnh/thành:", err);
        }
      };
      fetching();
    }
  }, [isCity]);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(false);
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("vi-VN"); // Định dạng DD/MM/YYYY
      onChangeValue(formattedDate);
    }
  };

  const filteredCities = cities.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label={label}
        value={value}
        mode="outlined"
        editable={!isDate && !isGender && !isCity && editable}
        right={
          iconName ? (
            <TextInput.Icon
              icon={() => <Icon name={iconName} size={20} color="#FFA500" />}
              onPress={() => setShowPicker(true)}
            />
          ) : null
        }
        onChangeText={onChangeValue}
        theme={{
          roundness: 15
          , colors: { primary: AppColors.yellowLight }
        }}
        style={styles.input}
      />

      {/* Date Picker */}
      {isDate && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={handleDateChange}
        />
      )}

      {/* Modal chọn giới tính */}
      {isGender && (
        <Modal visible={showPicker} transparent animationType="slide">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowPicker(false)}
          />
          <View style={styles.modalContainer}>
            {genderOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  onChangeValue(item);
                  setShowPicker(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}

      {/* Modal chọn tỉnh/thành phố */}
      {isCity && (
        <Modal visible={showPicker} transparent animationType="slide">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowPicker(false)}
          />
          <View style={styles.modalContainer}>
            <TextInput
              label="Tìm kiếm tỉnh/thành..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              mode="outlined"
              theme={{ colors: { primary: "#FFA500" } }}
              style={styles.searchInput}
            />

            <ScrollView style={styles.scrollView}>
              {filteredCities.map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={styles.option}
                  onPress={() => {
                    onChangeValue(item.name);
                    setShowPicker(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  searchInput: {
    fontSize: 16,
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: height * 0.5,
  },
});

