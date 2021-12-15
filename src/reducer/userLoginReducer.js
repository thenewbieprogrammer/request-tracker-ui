import * as ActionTypes from "../actions/actionTypes.js";
import { userService } from "../service/userAuthentication.service";
// the reducer contains the initial state for an object
// then we use ActionTypes to load values into the state
const UserLogin = (
  state = {
    isLoading: true,
    errMess: null,
    loggedIn: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_AUTH:
      return { ...state, loggedIn: userService.loggedIn(), isLoading: false };

    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        loggedIn: true,
      };

    case ActionTypes.USER_LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        loggedIn: false,
      };
    case ActionTypes.USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        loggedIn: false,
      };

    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        loggedIn: userService.logout(),
      };

    case ActionTypes.USER_LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        loggedIn: false,
      };
    case ActionTypes.USER_LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default UserLogin;

//the spread operator stands for the current value. In this example the spread operator is used on the state therefore;
// the second value after using a spread operator would be considered a modification to the current state; returning a new object

// same logic for any other javascript object when using the spread operator on the first value
