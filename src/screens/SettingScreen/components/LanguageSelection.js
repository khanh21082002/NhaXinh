import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import  Ionicons from "react-native-vector-icons/Ionicons"; // Use Ionicons for the check icon
import { AppColors } from "../../../styles";


export const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Tiếng Việt");

  const languages = [
    { label: "English", value: "English" },
    { label: "Tiếng Việt", value: "Tiếng Việt" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={styles.languageItem}
            onPress={() => setSelectedLanguage(language.value)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language.value && styles.selectedLanguage,
              ]}
            >
              {language.label}
            </Text>
            {selectedLanguage === language.value && (
              <Ionicons name="checkmark-circle" size={24} color={AppColors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    flexGrow: 1,
    width: "100%",
    padding: 20,
  },
  languageContainer: {
    width: "100%",
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  languageText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedLanguage: {
    fontWeight: "bold",
    color: AppColors.primary,
  },
});

