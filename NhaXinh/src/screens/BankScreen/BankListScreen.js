import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const banks = ["Vietcombank", "BIDV", "Vietinbank", "Agribank", "Techcombank", "MBBank"];

const BankListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liên kết ngân hàng</Text>
      {banks.map((bank, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => navigation.navigate("BankAccount", { bankName: bank })}
        >
          <Text style={styles.optionText}>{bank}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  option: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  optionText: { fontSize: 18 },
});

export default BankListScreen;
