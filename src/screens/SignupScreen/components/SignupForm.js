import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
  Image,
  Text
} from "react-native";
//Colors
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from '../../../styles';
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { SignUp as SignUpAct } from "../../../reducers";
//PropTypes check
import PropTypes from "prop-types";
import renderField from "./RenderField";

const { width, height } = Dimensions.get("window");

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email không được bỏ trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hơp lệ";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không được bỏ trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "Mật khẩu không được bỏ trống";
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Mật khẩu xác nhận không trùng khớp";
  }
  if (!values.username) {
    errors.username = "Tên không được bỏ trống";
  } else if (values.username.length > 20) {
    errors.username = "Tên không vượt quá 20 ký tự";
  } else if (values.username.length < 6) {
    errors.username = "Tên phải nhiều hơn 6 ký tự";
  }

  return errors;
};

const Signup = (props) => {
  const { handleSubmit, reset } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const submit = async (values) => {
    try {
      // await dispatch(SignUpAct(values.username, values.email, values.password));
      reset();
      if (!unmounted.current) {
        Alert.alert("Signup Successfully", "You can login now", [
          {
            text: "Okay",
            onPress: () => {
              // props.navigation.goBack();
              props.navigation.navigate("OTPScreen", { email: values.email });
            },
          },
        ]);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    // keyboardVerticalOffset={40} // adjust the value here if you need more padding
    // style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
      >
        <Image
          source={require('../../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
      </TouchableOpacity>

      <View style={styles.header}></View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 10,
              zIndex: 0,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <CustomText style={{ ...styles.title, color: Colors.text }}>Xin chào!</CustomText>
              <Text style={styles.subTitle}>Vui lòng đăng ký để tiếp tục</Text>
            </View>
            <View>
              <Field
                name="username"
                keyboardType="default"
                label="Tên đăng nhập"
                component={renderField}
                icon="id-card"
                autoCapitalize={true}
              />
              <Field
                name="email"
                keyboardType="email-address"
                label="Email"
                icon="email"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Mật khẩu"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="pass"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
              <Field
                name="confirmpassword"
                keyboardType="default"
                label="Xác nhận mật khẩu"
                component={renderField}
                secureTextEntry={showConfirmPass ? false : true}
                passIcon="confirm"
                icon="lock"
                showConfirmPass={showConfirmPass}
                setshowConfirmPass={setshowConfirmPass}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit(submit)}
              disabled={!props.valid || loading}
              style={{
                marginVertical: 10,
                alignItems: 'center',
                backgroundColor: props.valid ? AppColors.primary : AppColors.primaryLight,
                borderRadius: 10,
                paddingVertical: 5
              }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color={AppColors.white} />
                ) : (
                  <CustomText style={{
                    ...styles.textSign,
                    color: props.valid ? AppColors.white : AppColors.yellowLight, // Đổi màu chữ
                  }}>Đăng ký</CustomText>
                )}
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.center}>
          <CustomText style={styles.loginOpt}>
            Hoặc đăng ký bằng
          </CustomText>
          <View style={styles.circleImage}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  header: {
    marginTop: height * 0.1,
    width: width,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 5,
    // flexDirection: "row",
    // backgroundColor: AppColors.primaryLight,
  },
  title: {
    color: Colors.light_green,
    fontSize: 40,
    letterSpacing: 2,
    fontFamily: "Roboto-Bold",
    textAlign: "Left",
  },
  subTitle: {
    textAlign: 'left',
    color: AppColors.black,
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
  },
  textSign: {
    fontSize: 20,
    color: AppColors.yellowLight,
    fontFamily: 'Roboto-Medium',
  },
  textSignSmall: {
    color: AppColors.primary,
    textAlign: "center",
  },

  center: {
    alignItems: 'center',
  },
  loginOpt: {
    color: AppColors.primary,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
    marginTop: 20
  },
  circleImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 50,
    marginTop: 30
  },
  img: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
});
export const SignupForm = reduxForm({
  form: "signup", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Signup);
