import React, { useEffect, useState } from 'react';
import { LogBox, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { DrawerNavigator, IntroStackScreen } from './StoneNavigator';
import { Logout } from '../reducers';
import { Host } from 'react-native-portalize';
import { urlRedirect } from '../utils/Tools';

LogBox.ignoreLogs(['Setting a timer']);

export const AppNavigator = () => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
   const isFirstOpen = useSelector((state) => state.store.isFirstOpen);

  useEffect(() => {
    // Xử lý Deep Linking
    const handleUrl = (event) => {
      urlRedirect(event.url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then(urlRedirect);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const isFirstTime = async () => {
      const firstOpen = await AsyncStorage.getItem('isFirstTime');
      setValue(firstOpen);
    };
    isFirstTime();

    const autoLogout = async () => {
      const getUser = await AsyncStorage.getItem('user');
      if (getUser) {
        const user = JSON.parse(getUser);
        if (user.data.expireTime - Date.now() < 0) {
          dispatch(Logout());
        }
      }
    };
    autoLogout();
  }, []);


  // Xóa dữ liệu để lần nào cũng là lần đầu. Sau khi xong sẽ xóa
  useEffect(() => {
    const resetFirstTime = async () => {
      await AsyncStorage.removeItem('isFirstTime'); // Xóa dữ liệu để lần nào cũng là lần đầu
      setValue(null);
    };
    resetFirstTime();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Host>
        {(isFirstOpen || value !== null) && <DrawerNavigator />}
        {!isFirstOpen && value === null && <IntroStackScreen />}
      </Host>
    </NavigationContainer>
  );
};
