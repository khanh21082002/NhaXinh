import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessengerItem = ({ item }) => {
  const isUser = item.sender === "user";

  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.storeMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: { padding: 10, margin: 5, borderRadius: 10 },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#007AFF", color: "white" },
  storeMessage: { alignSelf: "flex-start", backgroundColor: "#ddd" },
  messageText: { fontSize: 16 },
  timeText: { fontSize: 12, color: "#999", marginTop: 5 },
});

export default MessengerItem;
