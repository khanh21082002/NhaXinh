import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
//Color
import Colors from "../../../utils/Colors";
import { AppColors } from "../../../styles";

//height
const { height } = Dimensions.get("window");

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      keyword: "",
      productsFilter: "",
    };
  }

  _textChangeHandler = (text) => {
    this.props.inputValue(text);
  };

  render() {
    return (
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Tất cả sản phẩm</Text>
        </View>
        <View style={styles.inputBox}>
          <Ionicons name='ios-search' size={20} color={Colors.text} />
          <TextInput
            placeholder='Nhập tên sản phẩm'
            clearButtonMode='always'
            style={styles.input}
            onChangeText={(text) => this._textChangeHandler(text)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: Platform.OS === "android" ? 90 : height < 668 ? 90 : 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: Platform.OS === "android" ? 30 : height < 668 ? 30 : 32,
    color: AppColors.primary,
  },
  inputBox: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    backgroundColor: Colors.light_grey,
    borderRadius: 15,
  },
  input: {
    marginLeft: 10,
    borderWidth: 0,
    fontSize: 16,
    width: "97%",
  },
});
