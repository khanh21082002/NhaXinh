import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const NotificationItem = ({ icon, title, description, time, isUnread }) => {
  return (
    <View style={[styles.item, isUnread && styles.unread]}>
      <View style={styles.iconContainer}>
        {icon}
        {isUnread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={3}>{description}</Text>
        )}
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  unread: {
    backgroundColor: '#F8F8F8',
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9500',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationItem;