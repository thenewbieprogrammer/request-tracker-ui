import * as ActionTypes from "../actionTypes.js";
import { BASE_URL } from "../../shared/apiBaseURL.js";
import { userService } from "../../service/userAuthentication.service";

export const userRegister = () => ({
  type: ActionTypes.USER_REGISTER,
});

export const userRegisterLoading = () => ({
  type: ActionTypes.USER_REGISTER_LOADING,
});

export const userRegisterFailed = (message) => ({
  type: ActionTypes.USER_REGISTER_FAILED,
  payload: message,
});

export const register = (registerUser) => {
  return async (dispatch) => {
    const { email, password } = registerUser;
    const user = {
      email: email,
      password: password,
    };

    const response = await fetch(BASE_URL + "register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(userRegister(data));
        })
        .catch((err) => dispatch(userRegisterFailed(err)));
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(userRegisterFailed(error));
        })
        .catch((err) => dispatch(userRegisterFailed(err)));
    }
    console.log(response);
    return response;
  };
};
