import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors } from '../../../styles';

const MenuItem = ({ icon, title , onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Ionicons name={icon} size={24} color={AppColors.primary} />
        <Text style={styles.menuItemText}>{title}</Text>
        <Ionicons name="chevron-forward" size={24} color={AppColors.black} />
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