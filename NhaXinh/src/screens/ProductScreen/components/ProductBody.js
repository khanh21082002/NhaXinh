import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput, // Import TextInput for the search bar
  FlatList, // Use FlatList instead of SectionList
} from 'react-native';

// Color
import Colors from '../../../utils/Colors';
import HorizontalItem from './HorizontalItem';
import CustomText from '../../../components/UI/CustomText';
import { Header } from './Header';

// PropTypes check
import PropTypes from 'prop-types';

export const ProductBody = ({
  navigation,
  productsFilter,
  searchFilterFunction,
}) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Flatten productsFilter for FlatList usage
  const DATA = productsFilter || [];

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text); 
            searchFilterFunction(text);
          }}
        />
      </View>

      {DATA.length === 0 ? (
        <CustomText style={{ textAlign: 'center', marginTop: 110 }}>
          Không tìm thấy sản phẩm
        </CustomText>
      ) : (
        <FlatList
          data={DATA} // Use the flat data for FlatList
          keyExtractor={(item, index) => (item?._id ? item._id.toString() : `item-${index}`)}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <HorizontalItem item={item} navigation={navigation} />
            </View>
          )}
          numColumns={2}  // This will make the list display in two columns
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      )}
    </View>
  );
};

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    height: 50,
    backgroundColor: Colors.light_grey,
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 5, // Adjusts spacing between items
  },
  itemSeparator: {
    height: 10, // Adds spacing between rows
  },
});

export default ProductBody;
