import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from "prop-types";
import OTPField from "./OTPField";
import Colors from "../../../utils/Colors";
import CustomText from "../../../components/UI/CustomText";
import { AppColors } from "../../../styles";

const { width, height } = Dimensions.get("window");

const validate = (values) => {
  const errors = {};
  if (!values.otp) {
    errors.otp = "Mã OTP không được bỏ trống";
  } else if (values.otp.length !== 6) {
    errors.otp = "Mã OTP phải đủ 6 chữ số";
  }
  return errors;
};

const Otp = (props) => {
  const route = useRoute();
  const email = route.params?.email || "Không có email";
  const { handleSubmit } = props;
  const [timer, setTimer] = useState(30);
  const [isOTPValid, setIsOTPValid] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleResendOTP = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(30);
    setIsOTPValid(null);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const submit = (values) => {
    if (values.otp === "123456") {
      setIsOTPValid(true);
    } else {
      setIsOTPValid(false);
    }
    setIsModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "height"}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
        >
          <Image
            source={require("../../../assets/images/icons/arrow_back.png")}
            style={{ width: 35, height: 35 }}
            borderRadius={8}
            backgroundColor={AppColors.primaryLight}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title}>
            Nhập mã OTP vừa được gửi về
          </CustomText>
          <Text style={styles.subTitle}>{email}</Text>
        </View>

        <Field
          name="otp"
          component={OTPField}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity onPress={handleResendOTP} disabled={timer > 0}>
          <Text style={styles.resendText}>
            {timer > 0 ? `Gửi lại sau ${timer}s` : "Gửi lại mã OTP"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit(submit)}
          disabled={!props.valid}
          style={{
            marginVertical: 10,
            alignItems: 'center',
            backgroundColor: props.valid ? AppColors.primary : AppColors.primaryLight,
            borderRadius: 10,
            paddingVertical: 5
          }}
        >
          <View style={styles.signIn}>

            <CustomText style={{
              ...styles.textSign,
              color: props.valid ? AppColors.white : AppColors.yellowLight, // Đổi màu chữ
            }}>Xác nhận</CustomText>

          </View>
        </TouchableOpacity>

        {/* Modal for confirmation */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Text thông báo */}
              <Text
                style={[
                  styles.modalText,
                  isOTPValid ? styles.successText : styles.errorText,
                ]}
              >
                {isOTPValid
                  ? "Xác nhận thành công!"
                  : "Mã OTP không đúng, vui lòng thử lại!"}
              </Text>

              {/* Icon dưới text */}
              {isOTPValid ? (
                <Icon
                  name="check-circle"
                  color={AppColors.primary}
                  size={40}
                  strokeWidth={3}
                  style={styles.icon} // Style riêng cho icon
                />
              ) : (
                <Icon
                  name="x-circle"
                  color={AppColors.primary}
                  size={40}
                  strokeWidth={3}
                  style={styles.icon}
                />
              )}

              {/* Nút đóng */}
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  if (isOTPValid) {
                    props.navigation.navigate("LoginScreen");
                  }
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

Otp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: height * 0.1,
    width: width,
    marginBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: Colors.text,
    marginBottom: 10,
  },
  subTitle: {
    color: AppColors.primary,
    fontSize: 14,
  },
  resendText: {
    color: AppColors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: AppColors.primaryLight,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    color: AppColors.yellowLight,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  icon: {
    marginVertical: 10,
  },
  successText: {
    color: Colors.black,
  },
  errorText: {
    color: "red",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
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
  textSign: {
    fontSize: 20,
    color: AppColors.yellowLight,
    fontFamily: 'Roboto-Medium',
  },
});

export const OTPForm = reduxForm({
  form: "otp",
  validate,
})(Otp);
