import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Text, StatusBar, View } from 'react-native'; // Thay thế expo-status-bar
import { AppNavigator } from './src/navigation'; 
import { reducer as formReducer } from 'redux-form';

// Reducers
import {
  authReducer,
  cartReducer,
  favoriteReducer,
  orderReducer,
  productReducer,
} from './src/reducers';

// Redux store
const rootReducer = combineReducers({
  store: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  fav: favoriteReducer,
  form: formReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const LoadAssets = async () => {
  const imageAssets = [
    require('./src/assets/images/banner1.jpg'),
    require('./src/assets/images/banner3.jpg'),
    require('./src/assets/images/banner4.jpg'),
    require('./src/assets/images/banner5.jpg'),
    require('./src/assets/images/banner6.jpg'),
    // Thêm các ảnh khác vào danh sách
  ];

  // Tải font tùy chỉnh từ React Native (có thể dùng react-native-fonts hoặc các thư viện khác)
  const fontAssets = Font.loadAsync({
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./src/assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./src/assets/fonts/Roboto-Italic.ttf'),
    'Roboto-LightItalic': require('./src/assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./src/assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
  });

  return Promise.all([imageAssets, fontAssets]);
};

export default function App() {
  const [assetLoaded, setAssetLoaded] = useState(false);

  useEffect(() => {
    LoadAssets()
      .then(() => setAssetLoaded(true))
      .catch((err) => console.warn(err));
  }, []);

  // if (!assetLoaded) {
  //   // Có thể thay thế màn hình Loading tùy chỉnh tại đây
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }a

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" /> 
      <AppNavigator />
    </Provider>
  );
}
