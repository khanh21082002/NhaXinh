import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Action
import { fetchFavorite } from "../../reducers";
// Components
import { Header } from "./components";
import Colors from "../../utils/Colors";
import MessengerBody from "./components/MessengerBody";
import MessengerBox from "./components/MessengerBox";

const MessengerScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]); // State lưu danh sách tin nhắn
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Load tin nhắn từ Redux (giả lập dữ liệu ban đầu)
  const loadMessages = useCallback(async () => {
    try {
      await dispatch(fetchFavorite());
      setMessages([
        { id: 1, text: "Xin chào!", sender: "store", time: "10:00 AM" },
      ]);
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    loadMessages();
  }, []);

  // Hàm gửi tin nhắn
  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <MessengerBody
        messages={messages}
        user={user}
        navigation={navigation}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});

export default MessengerScreen;
