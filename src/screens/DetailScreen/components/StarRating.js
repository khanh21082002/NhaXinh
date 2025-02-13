import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, Rect, ClipPath, Path } from "react-native-svg";

export const StarRating = ({ rating, color }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(5)].map((_, index) => {
        const starFill =
          rating - index > 1 // Sao đầy
            ? 1
            : rating - index > 0 // Sao một phần
            ? rating - index
            : 0; // Sao trống

        return (
          <Svg
            key={index}
            width={15}
            height={15}
            viewBox="0 0 24 24"
            style={styles.starContainer}
          >
            <Defs>
              {/* Mask để tô màu sao theo tỷ lệ */}
              <ClipPath id={`clip-star-${index}`}>
                <Path
                  d="M12 2.5l2.89 7.07 7.61.61-5.5 4.87 1.64 7.45L12 17.77 5.36 22.5l1.64-7.45-5.5-4.87 7.61-.61L12 2.5z"
                  fill="#ccc"
                />
              </ClipPath>
            </Defs>

            {/* Toàn bộ ngôi sao trống */}
            <Path
              d="M12 2.5l2.89 7.07 7.61.61-5.5 4.87 1.64 7.45L12 17.77 5.36 22.5l1.64-7.45-5.5-4.87 7.61-.61L12 2.5z"
              fill="#ccc"
            />
            {/* Phần sao tô màu theo tỷ lệ */}
            <Rect
              x="0"
              y="0"
              width={`${starFill * 24}`} // Tỷ lệ % theo rating
              height="24"
              fill={color}
              clipPath={`url(#clip-star-${index})`}
            />
          </Svg>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    marginRight: 4,
  },
});
