import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MessageIcon = () => (
  <Icon name="message" style={[styles.icon, { backgroundColor: '#007AFF' }]} />
);

export const ShippingIcon = () => (
  <Icon name="truck-delivery" style={[styles.icon, { backgroundColor: '#32C759' }]} />
);

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});