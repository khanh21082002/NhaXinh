import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Success = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Liên kết thành công!</Text>
    <Button title="Xong" onPress={() => navigation.navigate("PaymentMethod")} />
  </View>
);

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center" }, title: { fontSize: 24 } });

export default Success;
