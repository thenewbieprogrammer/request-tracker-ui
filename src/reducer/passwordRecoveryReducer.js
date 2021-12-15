import * as ActionTypes from "../actions/actionTypes.js";

// the reducer contains the initial state for an object
// then we use ActionTypes to load values into the state
const PasswordRecovery = (
  state = {
    isLoading: true,
    errMess: null,
    passwordRecoveryResponse: "",
    isPasswordReset: false,
    areResetCredentialsVerified: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PASSWORD_RECOVERY_LINK:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        passwordRecoveryResponse: action.payload,
      };

    case ActionTypes.PASSWORD_RECOVERY_LINK_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        passwordRecoveryResponse: "",
      };
    case ActionTypes.PASSWORD_RECOVERY_LINK_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
      };

    case ActionTypes.PASSWORD_RESET:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        passwordRecoveryResponse: "",
        isPasswordReset: true,
        areResetCredentialsVerified: false,
      };

    case ActionTypes.PASSWORD_RESET_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
        areResetCredentialsVerified: false,
      };
    case ActionTypes.PASSWORD_RESET_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
        areResetCredentialsVerified: false,
      };

    case ActionTypes.VERIFY_RESET_CREDENTIALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
        areResetCredentialsVerified: true,
      };

    case ActionTypes.VERIFY_RESET_CREDENTIALS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
        areResetCredentialsVerified: false,
      };
    case ActionTypes.VERIFY_RESET_CREDENTIALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        passwordRecoveryResponse: "",
        isPasswordReset: false,
        areResetCredentialsVerified: false,
      };

    default:
      return state;
  }
};

export default PasswordRecovery;

//the spread operator stands for the current value. In this example the spread operator is used on the state therefore;
// the second value after using a spread operator would be considered a modification to the current state; returning a new object

// same logic for any other javascript object when using the spread operator on the first value
