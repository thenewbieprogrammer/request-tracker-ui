import * as ActionTypes from "../actions/actionTypes.js";

// the reducer contains the initial state for an object
// then we use ActionTypes to load values into the state
const Administrator = (
  state = {
    isLoading: true,
    errMess: null,
    admins: [],
    userId: null,
    isAdminGranted: false,
    isAdminRightsRevoked: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_ADMINS:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        admins: action.payload,
        userId: null,
        isAdminGranted: false,
      };
    case ActionTypes.ADMINS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        admins: [],
        userId: null,
        isAdminGranted: false,
      };
    case ActionTypes.ADMINS_FAILED:
      return {
        ...state,
        isLoading: true,
        errMess: action.payload,
        admins: [],
        userId: null,
        isAdminGranted: false,
      };
    case ActionTypes.ADD_ADMIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        admins: [],
        userId: null,
        isAdminGranted: true,
      };

    case ActionTypes.ADD_ADMIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        admins: [],
        userId: null,
        isAdminGranted: false,
      };
    case ActionTypes.ADD_ADMIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        admins: [],
        userId: null,
        isAdminGranted: false,
      };

    case ActionTypes.REMOVE_ADMIN:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        admins: [],
        userId: null,
        isAdminGranted: false,
        isAdminRightsRevoked: true,
      };

    case ActionTypes.REMOVE_ADMIN_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        admins: [],
        userId: null,
        isAdminGranted: false,
        isAdminRightsRevoked: false,
      };
    case ActionTypes.REMOVE_ADMIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        admins: [],
        userId: null,
        isAdminGranted: false,
        isAdminRightsRevoked: false,
      };

    default:
      return state;
  }
};

export default Administrator;

//the spread operator stands for the current value. In this example the spread operator is used on the state therefore;
// the second value after using a spread operator would be considered a modification to the current state; returning a new object

// same logic for any other javascript object when using the spread operator on the first value
