import * as ActionTypes from "../actionTypes.js";
import { BASE_URL } from "../../shared/apiBaseURL.js";

/**
 *
 * ? POST - forgot password
 */

export const passwordRecoveryLink = (res) => ({
  type: ActionTypes.PASSWORD_RECOVERY_LINK,
  payload: res,
});

export const passwordRecoveryLinkLoading = () => ({
  type: ActionTypes.PASSWORD_RECOVERY_LINK_LOADING,
});

export const passwordRecoveryLinkFailed = (errmess) => ({
  type: ActionTypes.PASSWORD_RECOVERY_LINK_FAILED,
  payload: errmess,
});

export const submitAccountPasswordRecovery = (data) => {
  return async (dispatch) => {
    dispatch(passwordRecoveryLinkLoading());
    let token = localStorage.getItem("id_token");
    const { Email } = data;
    const response = await fetch(BASE_URL + "forgot-password/" + Email, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (response.ok) {
      response
        .json()
        .then((res) => {
          dispatch(passwordRecoveryLink(res));
        })
        .catch((err) => {
          dispatch(passwordRecoveryLinkFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(passwordRecoveryLinkFailed(error));
        })
        .catch((err) => {
          dispatch(passwordRecoveryLinkFailed(err));
        });
    }
    return response;
  };
};

/**
 *
 * ? POST - reset password
 */

export const passwordReset = () => ({
  type: ActionTypes.PASSWORD_RESET,
});

export const passwordResetLoading = () => ({
  type: ActionTypes.PASSWORD_RESET_LOADING,
});

export const passwordResetFailed = (errmess) => ({
  type: ActionTypes.PASSWORD_RESET_FAILED,
  payload: errmess,
});

export const submitAccountPasswordReset = (resetData) => {
  return async (dispatch) => {
    dispatch(passwordResetLoading());
    const { UserID, ResetToken, Password } = resetData;

    const newPasswords = {
      Password: Password,
      ConfirmPassword: Password,
    };
    let token = localStorage.getItem("id_token");

    const response = await fetch(
      BASE_URL + "password-reset/" + UserID + "/" + ResetToken,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(newPasswords),
      }
    );

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(passwordReset());
        })
        .catch((err) => {
          dispatch(passwordResetFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(passwordResetFailed(error));
        })
        .catch((err) => {
          dispatch(passwordResetFailed(err));
        });
    }
    return response;
  };
};

/**
 *
 * ? GET - reset password
 * ? Verify if token and user id is valid
 */

export const verifyResetCredentials = () => ({
  type: ActionTypes.VERIFY_RESET_CREDENTIALS,
});

export const verifyResetCredentialsLoading = () => ({
  type: ActionTypes.VERIFY_RESET_CREDENTIALS_LOADING,
});

export const verifyResetCredentialsFailed = (errmess) => ({
  type: ActionTypes.VERIFY_RESET_CREDENTIALS_FAILED,
  payload: errmess,
});

export const verifyAccountResetCredentials = (resetData) => {
  return async (dispatch) => {
    dispatch(verifyResetCredentialsLoading());
    const { UserID, ResetToken } = resetData;
    const response = await fetch(
      BASE_URL + "password-reset/" + UserID + "/" + ResetToken,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(verifyResetCredentials());
        })
        .catch((err) => {
          dispatch(verifyResetCredentialsFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(verifyResetCredentialsFailed(error));
        })
        .catch((err) => {
          dispatch(verifyResetCredentialsFailed(err));
        });
    }
    return response;
  };
};
