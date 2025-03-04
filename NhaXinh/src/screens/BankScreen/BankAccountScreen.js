import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const BankAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bankName } = route.params;

  const [accountNumber, setAccountNumber] = useState("");
  const [holderName, setHolderName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bankName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Số tài khoản"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Chủ tài khoản"
        value={holderName}
        onChangeText={setHolderName}
      />
      <Button title="Tiếp tục" onPress={() => navigation.navigate("BankCard")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});

export default BankAccountScreen;
