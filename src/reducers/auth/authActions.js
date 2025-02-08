import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { API_URL } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const EDIT_INFO = 'EDIT_INFO ';
export const UPLOAD_PROFILEPIC = 'UPLOAD_PROFILEPIC';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_ERROR = 'RESET_ERROR';

import AskingExpoToken from '../../components/Notification/AskingNotiPermission';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

export const SignUp = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/users/register`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Login
// export const Login = (email, password) => {
//   return async (dispatch) => {
//     dispatch({
//       type: AUTH_LOADING,
//     });
//     const pushToken = await AskingExpoToken();
//     try {
//       const response = await timeoutPromise(
//         fetch(`${API_URL}/auth/login`, {
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//           method: 'POST',
//           body: JSON.stringify({
//             email,
//             password,
//             pushTokens: [pushToken],
//           }),
//         }),
//       );
//       if (!response.ok) {
//         const errorResData = await response.json();
//         dispatch({
//           type: AUTH_FAILURE,
//         });
//         throw new Error(errorResData.err);
//       }
//       const resData = await response.json();
//       let decodedToken;
//       try {
//         decodedToken = jwtDecode(resData.token);
//         console.log('Thông tin từ token:', decodedToken); // Log thông tin từ token
//       } catch (decodeError) {
//         console.error('Lỗi giải mã token:', decodeError.message);
//         throw new Error('Lỗi token không hợp lệ');
//       }

//       console.log('decodedToken', decodedToken);
//       saveDataToStorage('users', decodedToken);
//       dispatch(setLogoutTimer(60 * 60 * 1000));
//       dispatch({
//         type: LOGIN,
//         user: decodedToken,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const Login = (username, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });

    const pushToken = await AskingExpoToken();

    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/auth/login`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
            pushTokens: [pushToken],
          }),
        })
      );

      
      // Kiểm tra nếu phản hồi không hợp lệ
      if (!response.ok) {
        const errorText = await response.text(); // Đọc phản hồi dạng text
        console.error('Lỗi từ API:', errorText); // Log chi tiết
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error('Đăng nhập thất bại!');
      }

      // Kiểm tra nếu phản hồi là JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorText = await response.text();
        console.error('Phản hồi không phải JSON:', errorText);
        throw new Error('Phản hồi từ máy chủ không hợp lệ!');
      }

      // Giải mã JSON
      const resData = await response.json();
      console.log('Dữ liệu trả về từ API:', resData);  // Kiểm tra nội dung của resData
      
      let decodedToken;
      try {
        decodedToken = jwtDecode(resData.token);  // Giải mã token
        console.log('Thông tin từ token:', decodedToken);
      } catch (decodeError) {
        console.error('Lỗi giải mã token:', decodeError.message);
        throw new Error('Token không hợp lệ!');
      }

      const userId = decodedToken.sub;
      // console.log('ID người dùng:', userId);
      const userResponse = await fetch(`https://fakestoreapi.com/users/${userId}`);
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Không thể lấy thông tin người dùng! Lỗi: ${errorText}`);
      }

      const userData = await userResponse.json();
      console.log('Dữ liệu người dùng:', userData);

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem(
        'userToken',
        JSON.stringify({
          token: resData.token,
          userInfo: userData,
        })
      );

      dispatch(setLogoutTimer(60 * 60 * 1000)); // Đặt thời gian logout

      // Dispatch LOGIN action
      dispatch({
        type: LOGIN,
        user: userData,
      });
    } catch (err) {
      console.error('Lỗi đăng nhập:', err.message);
      throw err; // Quăng lỗi để xử lý tiếp
    }
  };
};


export const EditInfo = (phone, address) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/users/${user.userid}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'PATCH',
          body: JSON.stringify({
            phone,
            address,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        Error(errorResData.err);
      }

      dispatch({
        type: EDIT_INFO,
        phone,
        address,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const UploadProfilePic = (imageUri, filename, type) => {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const user = getState().auth.user;
    let formData = new FormData();
    // Infer the type of the image
    formData.append('profilePic', {
      uri: imageUri,
      name: filename,
      type,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/users/photo/${user.userid}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'auth-token': user.token,
          },
          method: 'PATCH',
          body: formData,
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }

      dispatch({
        type: UPLOAD_PROFILEPIC,
        profilePic: imageUri,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const ForgetPassword = (email) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/users/reset_pw`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: FORGET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const ResetPassword = (password, url) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/users/receive_new_password/${url.userid}/${url.token}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            password,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer(); //clear setTimeout when logout
    AsyncStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert('Logout section expired');
    }, expirationTime);
  };
};
