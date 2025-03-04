import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const LocalNotification = () => {
  const trigger = Platform.OS === 'ios'
    ? {
        hour: 8,
        minute: 15,
        type: 'daily',
      }
    : {
        hour: 8,
        minute: 15,
        repeatType: 'time',
        repeatTime: 1000 * 60 * 60 * 24, // mỗi ngày
      };

  useEffect(() => {
    // Cấu hình PushNotification
    PushNotification.configure({
      onRegister: function (token) {
        // Bạn có thể lưu token ở đây nếu cần
        console.log(token);
      },
      onNotification: function (notification) {
        console.log(notification);
      },
      onAction: function (notification) {
        console.log(notification.action);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      requestPermissions: Platform.OS === 'ios', // Chỉ yêu cầu trên iOS
    });

    // Lên lịch thông báo
    const triggerNotificationHandler = () => {
      PushNotification.localNotificationSchedule({
        message: "Hãy lựa chọn sự may mắn, mua sự thành công cùng với CatTuong",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Đặt thời gian
        title: 'Ngày mới tốt lành bạn nhé ^^',
        userInfo: { mySpecialData: 'Some text' },
        repeatType: 'day', // Lặp lại mỗi ngày
      });
    };

    triggerNotificationHandler();

    return () => {
      // Hủy thông báo đã lên lịch nếu cần
      PushNotification.cancelAllLocalNotifications();
    };
  }, []);

  return <></>;
};

export default LocalNotification;
