import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
// Components
import CustomText from "../../../components/UI/CustomText";
import Messages from "../../../messages/user";
import MessengerItem from "../components/MessengerItem";
import MessengerBox from "../components/MessengerBox";

import { AppColors } from "../../../styles";

const MessengerBody = ({ messages, user, navigation, handleSendMessage }) => {
  return (
    <View style={styles.container}>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            {Messages["user.login.require"]}
          </CustomText>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <CustomText style={{ fontSize: 16, color: "#fff" }}>
                Tiếp tục
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          {messages.length === 0 ? (
            <View style={styles.center}>
              <CustomText>Không có tin nhắn nào</CustomText>
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MessengerItem item={item} />}
              contentContainerStyle={{ flexGrow: 1 }} // Đảm bảo danh sách mở rộng
            />
          )}
        </View>
      )}

      {/* MessengerBox luôn nằm ở cuối */}
      {Object.keys(user).length !== 0 && <MessengerBox onSend={handleSendMessage} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  messageContainer: {
    flex: 1, // Đảm bảo phần danh sách tin nhắn mở rộng
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: AppColors.primary,
    borderRadius: 5,
    borderColor: AppColors.primary,
    marginTop: 10,
  },
});

export default MessengerBody;
