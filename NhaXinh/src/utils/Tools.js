import React, { useCallback } from 'react';
import { TouchableOpacity, Linking, Alert } from 'react-native';
import Colors from './Colors';
// Upload Image
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import { STRIPE_PUBLISHABLE_KEY, API_URL } from './Config';
import { AppColors } from '../styles';

// OpenURL component
export const OpenURL = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

// Handle Deep Link
export const urlRedirect = (url) => {
  if (!url) return;
  // parse and redirect to new url
  let { path, queryParams } = Linking.parse(url);
  if (path) {
    RootNavigation.navigate(path, queryParams);
  }
  return;
};

// Handle Fetching timeout
export const timeoutPromise = (url) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout, Server is not responding'));
    }, 50 * 1000);
    url.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};

// Pick Image function
export const _pickImage = async (action) => {
  try {
    // Check and request permission to access camera or gallery
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access camera roll',
          message: 'We need access to your camera roll to select photos.',
        }
      );

      // Check if the permission is granted
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        return Alert.alert(
          'Permission denied',
          'Permission to access camera roll is required!'
        );
      }
    }

    const options = {
      mediaType: 'photo', // Specify media type as 'photo'
      maxWidth: 800, // Set max width for the image
      maxHeight: 800, // Set max height for the image
      quality: 1, // Set image quality (1 is best)
    };

    // Handle library or camera action based on the input
    let result;
    if (action === 'library') {
      result = await new Promise((resolve, reject) => {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.errorCode) {
            reject(response.errorMessage);
          } else {
            resolve(response); // Return image response
          }
        });
      });
    } else if (action === 'camera') {
      result = await new Promise((resolve, reject) => {
        launchCamera(options, (response) => {
          if (response.didCancel) {
            reject('User cancelled image picker');
          } else if (response.errorCode) {
            reject(response.errorMessage);
          } else {
            resolve(response); // Return image response
          }
        });
      });
    }

    // If the result is successful, return the image data
    if (result) {
      return result;
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred while picking the image');
  }
};

// Color Check function
export const colorCheck = (colorCode) => {
  switch (colorCode) {
    case 'yellow':
      return Colors.yellow;
    case 'green':
      return Colors.green;
    case 'purple':
      return Colors.purple;
    case 'blue':
      return Colors.water;
    case 'pink':
      return Colors.straw;
    default:
      return AppColors.primary;
  }
};

// Get token from Stripe Server
export const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    method: 'POST',
    body: Object.keys(card)
      .map((key) => key + '=' + card[key])
      .join('&'),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
