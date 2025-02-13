import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import { Field, reduxForm } from "redux-form";
import CustomText from "../../components/UI/CustomText";
import renderField from "./components/ForgetRenderField";
//Colors
import Colors from "../../utils/Colors";
import { AppColors } from "../../styles";
//Icon
import Icon from 'react-native-vector-icons/Feather';
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { ForgetPassword } from "../../reducers";

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email không được bỏ trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hơp lệ";
  }
  return errors;
};

const SignupForm = (props) => {
  const { handleSubmit, reset } = props;
  const loading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const submit = async (values) => {
    try {
      await dispatch(ForgetPassword(values.email));
      if (!unmounted.current) {
        props.navigation.navigate("FinishResetScreen", {
          value: values,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: "absolute", top: 30, left: 20 }}
      >
        <Image
          source={require('../../assets/images/icons/arrow_back.png')}
          style={{ width: 35, height: 35 }}
          borderRadius={8}
          backgroundColor={AppColors.primaryLight}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <CustomText style={styles.title}> Vui lòng nhập email </CustomText>
        <Field
          name='email'
          keyboardType='email-address'
          icon='mail'
          label='Email'
          component={renderField}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: "center" }}
        >
          <View style={styles.signIn}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={styles.textSign}>Gửi</CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: "20%",
    height: 300,
    paddingHorizontal: 20,
  },
  title: {
    color: AppColors.primary,
    fontSize: 30,
  },
  signIn: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: AppColors.primary,
  },
  textSign: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "500",
  },
});
export const ForgetPwScreen = reduxForm({
  form: "contact", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SignupForm);
