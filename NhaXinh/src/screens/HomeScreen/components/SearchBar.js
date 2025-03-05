import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../../../styles';

const SearchBar = ({ onSearchChange, placeholder }) => {
  const [searchText, setSearchText] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false); // Trạng thái filter

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm (thu nhỏ khi bật filter) */}
      <View style={[styles.searchBox, isFilterActive && styles.searchBoxSmall]}>
        {!isFilterActive && (
          <View style={styles.searchIcon}>
            <Icon name="magnify" size={32} color={AppColors.gray} />
          </View>
        )}
        {/* Chỉ hiển thị input khi chưa bật filter */}
        {!isFilterActive && (
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder || 'Ghế, Bàn làm việc...'}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor={AppColors.gray}
          />
        )}
      </View>

      {/* Khi bật filter, hiển thị danh sách icon */}
      {isFilterActive && (
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButtonItem}>
            <Icon name="sofa" size={20} color={AppColors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtonItem}>
            <Icon name="lamp" size={20} color={AppColors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtonItem}>
            <Icon name="table-furniture" size={20} color={AppColors.black} />
          </TouchableOpacity>

        </View>
      )}

      {/* Nút bật/tắt filter */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterActive(!isFilterActive)}
      >
        <Icon name={isFilterActive ? 'close' : 'tune'} size={24} color={AppColors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    transition: 'width 0.3s ease-in-out', // Hiệu ứng mượt khi thu nhỏ
  },
  searchBoxSmall: {
    width: 50, // Khi bật filter, searchBox thu nhỏ
    paddingHorizontal: 10,
  },
  iconButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: AppColors.lightGray,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: AppColors.black,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Tạo khoảng cách giữa các filter button
    marginLeft: 10,
  },
  filterButtonItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: AppColors.primaryLight, // Màu nền filter
  },
  filterButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.black,
    marginLeft: 10,
  },
  searchIcon: {},
});

export default SearchBar;
