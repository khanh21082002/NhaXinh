import React from "react";
import { TouchableOpacity, Share } from "react-native";
// Sử dụng react-native-vector-icons thay vì @expo/vector-icons
import Icon from "react-native-vector-icons/FontAwesome";

const ShareItem = ({ imageURL, title, message, color }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: message,
        url: imageURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <Icon name="share-square-o" size={25} color={color || 'white'} />
    </TouchableOpacity>
  );
};

export default ShareItem;
