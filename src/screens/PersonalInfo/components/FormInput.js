import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, Platform, ScrollView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../../../styles';
import { useDispatch } from 'react-redux';
import { fetchLocals } from '../../../reducers/local';

const { height, width } = Dimensions.get('window');

export const FormInput = ({ label, value, editable, iconName, isDate, isGender, isCity, onChangeValue }) => {
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const genderOptions = ["Nam", "Nữ"];

  useEffect(() => {
    const fetching = async () => {
      try {
        const citiesData = await dispatch(fetchLocals(1));
        setCities(citiesData); // Dữ liệu bây giờ có thể set đúng
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành:", err);
      }
    };
    fetching();
  }, [isCity]);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(false);
      setDate(selectedDate);
      const day = selectedDate.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      onChangeValue(formattedDate);
    }
  };


  const filteredCities = cities.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          editable={!isDate && !isGender && !isCity && editable} // Chỉ khóa nếu là Date/Gender/City
          onChangeText={onChangeValue}
        />
        {iconName && (
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Icon name={iconName} size={20} color="#FFA500" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Date Picker */}
      {isDate && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}

      {/* Modal chọn giới tính */}
      {isGender && (
        <Modal visible={showPicker} transparent animationType="slide">
          <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)} />
          <View style={styles.modalContainer}>
            {genderOptions.map((item, index) => (
              <TouchableOpacity key={index} style={styles.option} onPress={() => {
                onChangeValue(item);
                setShowPicker(false);
              }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}

      {/* Modal chọn tỉnh/thành phố */}
      {isCity && (
        <Modal visible={showPicker} transparent animationType="slide">
          <TouchableOpacity style={styles.overlay} onPress={() => setShowPicker(false)} />
          <View style={styles.modalContainer}>

            {/* Thanh tìm kiếm */}
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm tỉnh/thành..."
              value={searchTerm}
              onChangeText={text => setSearchTerm(text)}
            />

            {/* Danh sách cuộn với ScrollView */}
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
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
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
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  scrollView: {
    maxHeight: height * 0.5, // Giới hạn chiều cao để tránh tràn màn hình
  },

  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  optionText: {
    fontSize: 16,
  },
});
