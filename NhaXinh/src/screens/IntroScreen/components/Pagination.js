import React from "react";
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { AppColors } from "../../../styles";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

const DOT_SIZE = 20;

export const Pagination = ({ scrollX, slides }) => {
  // Tạo hiệu ứng cho các dots khi cuộn
  const translateX = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
    extrapolate: "clamp",
  });
  return (
    <View style={[styles.pagination]}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width,
        }}
      >
        {/* Pagination Dots */}
        <View style={{ flexDirection: "row", marginBottom: 20, paddingHorizontal: 10 }}>
          {slides.map((item, index) => {
            // Áp dụng hiệu ứng thay đổi kích thước và chiều dài cho dot hiện tại
            const scale = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [1, 1.2, 1], // Sử dụng scale nhẹ nhàng hơn để tránh giật
              extrapolate: "clamp",
            });

            const dotWidth = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [DOT_SIZE * 0.6, DOT_SIZE * 1.2, DOT_SIZE * 0.6], // Điều chỉnh nhẹ chiều rộng
              extrapolate: "clamp",
            });

            const marginHorizontal = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [6, 10, 6], // Điều chỉnh khoảng cách giữa các dot
              extrapolate: "clamp",
            });

            return (
              <View key={index} style={styles.paginationDotContainer}>
                <Animated.View
                  style={[ 
                    styles.paginationDot,
                    {
                      backgroundColor: AppColors.primaryLight,
                      transform: [{ scale }],
                      width: dotWidth, 
                      marginHorizontal: marginHorizontal, 
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

Pagination.propTypes = {
  scrollX: PropTypes.object.isRequired,
  slides: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    top: 10,
    zIndex: 1000,
    alignItems: "center",
    width: "100%",  // Đảm bảo pagination chiếm toàn bộ chiều rộng
  },
  paginationDot: {
    height: DOT_SIZE * 0.5,
    borderRadius: DOT_SIZE * 0.3,
    backgroundColor: AppColors.primary,
    borderWidth: 0,
  },
  paginationDotContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    marginTop: 15,  // Tăng khoảng cách giữa button và các dot
    borderRadius: 15,
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
