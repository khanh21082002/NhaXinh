import React, { useState, useRef, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
  Dimensions,
  Text,
} from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
import { AppColors } from '../../../styles';
import CustomText from '../../../components/UI/CustomText';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { Login as LoginAction } from '../../../reducers';
//PropTypes check
import PropTypes from 'prop-types';
import renderField from './RenderField';
//Authentiation Touch ID Face ID

import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';
import { secretKey } from '../../../utils/Config';

const { height } = Dimensions.get('window');

//Validation
const validate = (values) => {
  // const errors = {};
  // if (!values.email) {
  //   errors.email = 'Email không được bỏ trống';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Email không hơp lệ';
  // }
  // if (!values.password) {
  //   errors.password = 'Mật khẩu không được bỏ trống';
  // } else if (values.password.length < 6) {
  //   errors.password = 'Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự';
  // }
  // return errors;
};

const Login = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const scanFingerprintOrFaceId = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (!credentials) {
        return alert('You have to enable LOGIN by touch/face ID');
      }

      TouchID.authenticate('Authenticating...')
        .then(() => {
          dispatch(LoginAction(credentials.username, credentials.password));
        })
        .catch(() => {
          alert('Fingerprint or FaceID Authentication failed');
        });
    } catch (error) {
      alert('Error with authentication: ' + error);
    }
  };

  const showAndroidAlert = () => {
    Alert.alert(
      'Fingerprint Scan',
      'Place your finger over the touch sensor and press scan.',
      [
        {
          text: 'Scan',
          onPress: () => {
            scanFingerprintOrFaceId();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
      ],
    );
  };

  const submit = async (values) => {
    try {
      setLoading(true);
      await dispatch(LoginAction(values.email, values.password));
      props.navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: 'absolute', top: 40, left: 20 }}
      >
        {/* <Ionicons name="ios-arrow-back" size={35} color={Colors.light_green} /> */}
        <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.titleContainer}>
            <CustomText style={styles.title}>NHÀ XINH</CustomText>
            <CustomText style={{ ...styles.title, color: Colors.text }}>xin chào!</CustomText>
          </View>

          <Text style={styles.subTitle}>Vui lòng đăng nhập để tiếp tục</Text>
        </View>
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 10,
              zIndex: -1,
            }}
          >
            <View>
              <Field
                name="email"
                keyboardType="email-address"
                label="Tên đăng nhập"
                icon="mail"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Mật khẩu"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="eye"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ForgetPwScreen');
                }}
              >
                <CustomText
                  style={{
                    ...styles.textSignSmall,
                    fontFamily: 'Roboto-Medium',
                  }}
                >
                  Quên mật khẩu?
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{
                marginVertical: 10,
                alignItems: 'center',
                backgroundColor: AppColors.primary,
                borderRadius: 10,
                paddingVertical: 5
              }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>Đăng nhập</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.center}>
          <CustomText style={styles.loginOpt}>
            Hoặc đăng nhập bằng
          </CustomText>
          <View style={styles.circleImage}>
            <TouchableOpacity
              onPress={
                Platform.OS === 'android' ? showAndroidAlert : scanFingerprintOrFaceId
              }
            >
              <Image
                source={require('../../../assets/images/faceid.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image
                source={require('../../../assets/images/instagram.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image
                source={require('../../../assets/images/facebook.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <TouchableOpacity
            >
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.img}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <CustomText style={[styles.textSignSmall, { marginLeft: 5 }]}>
            Bạn chưa có mật khẩu?
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SignupScreen");
            }}
          >
            <CustomText style={styles.textSignSmall}>
              Đăng ký ngay
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },
  title: {
    color: AppColors.primary,
    fontSize: 30,
    letterSpacing: 2,
    fontFamily: 'Roboto-Bold',
    textAlign: 'left',
  },
  subTitle: {
    textAlign: 'left',
    color: AppColors.black,
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  text: {
    color: '#fff',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
  },
  textSign: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
  },
  textSignSmall: {
    color: AppColors.primary,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
  circleImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
    marginTop: 30
  },
  img: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
  loginOpt: {
    color: AppColors.primary,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row", // Đảm bảo nằm trên cùng một hàng
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginTop: 60,
    gap: 5
  }
});
export const LoginForm = reduxForm({
  form: 'login', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Login);
