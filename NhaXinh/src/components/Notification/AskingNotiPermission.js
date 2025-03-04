import PushNotification from 'react-native-push-notification';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AskingNotificationPermissionToken = async () => {
  let token = '';

  // Yêu cầu quyền thông báo trên iOS
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.NOTIFICATIONS)

    if (result === RESULTS.GRANTED) {
      // Nếu quyền đã được cấp, bạn có thể lấy token
      PushNotification.configure({
        onRegister: function(tokenData) {
          token = tokenData.token; // Lưu token
        },
        onNotification: function(notification) {
          console.log('Notification received:', notification);
        },
        requestPermissions: true,
      });
    } else {
      console.log('Permission denied for notifications');
    }
  } else {
    // Trên Android, các quyền không cần yêu cầu cụ thể, nhưng bạn có thể cấu hình thông báo
    PushNotification.configure({
      onRegister: function(tokenData) {
        token = tokenData.token; // Lưu token
      },
      onNotification: function(notification) {
        console.log('Notification received:', notification);
      },
      requestPermissions: true,
    });
  }

  return token;
};

export default AskingNotificationPermissionToken;