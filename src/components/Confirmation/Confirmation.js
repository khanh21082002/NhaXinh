import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../../styles';


const Confirmation = ({ status, message }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, status ? styles.successBackground : styles.errorBackground]}>
        {status ? (
          <Icon name="check" color={AppColors.primary} size={40} strokeWidth={3} />
        ) : (
          <Icon name="close" color={AppColors.primary}  size={40} strokeWidth={3} />
        )}
      </View>
      <Text style={[styles.messageText, { color: status ? AppColors.primary : AppColors.error }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  successBackground: {
    backgroundColor: AppColors.primaryLight,
  },
  errorBackground: {
    backgroundColor:  AppColors.primaryLight,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Confirmation;
