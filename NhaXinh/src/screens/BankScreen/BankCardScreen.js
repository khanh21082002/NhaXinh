import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BankCardScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Số thẻ" value={cardNumber} onChangeText={setCardNumber} />
      <TextInput style={styles.input} placeholder="Ngày hết hạn" value={expiryDate} onChangeText={setExpiryDate} />
      <TextInput style={styles.input} placeholder="CVV" value={cvv} onChangeText={setCvv} />
      <Button title="Tiếp tục" onPress={() => navigation.navigate("Success")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default BankCardScreen;
