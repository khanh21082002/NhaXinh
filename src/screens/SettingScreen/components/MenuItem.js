import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../../styles';

const MenuItem = ({ icon, title, onPress, isSwitch, value, onValueChange }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <Ionicons name={icon} size={24} color={AppColors.primary} />
    <Text style={styles.menuItemText}>{title}</Text>

    {isSwitch ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={AppColors.white}
        trackColor={{ false: '#767577', true: '#35D62C' }}
      />
    ) : (
      <Ionicons name="chevron-forward" size={24} color={AppColors.black} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default MenuItem;
