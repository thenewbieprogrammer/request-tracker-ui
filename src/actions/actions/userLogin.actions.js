import * as ActionTypes from "../actionTypes.js";
import { BASE_URL } from "../../shared/apiBaseURL.js";
import { userService } from "../../service/userAuthentication.service";

export const getAuth = () => ({
  type: ActionTypes.GET_AUTH,
});

export const userLogin = () => ({
  type: ActionTypes.USER_LOGIN,
});

export const userLoginLoading = () => ({
  type: ActionTypes.USER_LOGIN_LOADING,
});

export const userLoginFailed = (message) => ({
  type: ActionTypes.USER_LOGIN_FAILED,
  payload: message,
});

export const userLogout = () => ({
  type: ActionTypes.USER_LOGOUT,
});

export const userLogoutLoading = () => ({
  type: ActionTypes.USER_LOGOUT_LOADING,
});

export const userLogoutFailed = (err) => ({
  type: ActionTypes.USER_LOGOUT_FAILED,
  payload: err,
});

export const login = (loginData) => {
  return async (dispatch) => {
    console.log("user login loading");
    const { email, password } = loginData;
    const user = {
      email: email,
      password: password,
    };

    const response = await fetch(BASE_URL + "login", {
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
          dispatch(userLogin());
          userService.setToken(data.token);
        })
        .catch((err) => {
          dispatch(userLoginFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(userLoginFailed(error));
        })
        .catch((err) => {
          dispatch(userLoginFailed(err));
        });
    }
    return response;
  };
};
