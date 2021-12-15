import * as ActionTypes from "../actions/actionTypes.js";

// the reducer contains the initial state for an object
// then we use ActionTypes to load values into the state
const UserRegister = (
  state = {
    isLoading: true,
    errMess: null,
    isRegistered: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        isRegistered: true,
      };

    case ActionTypes.USER_REGISTER_LOADING:
      return { ...state, isLoading: true, errMess: null, isRegistered: null };
    case ActionTypes.USER_REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        isRegistered: false,
      };

    default:
      return state;
  }
};

export default UserRegister;
//the spread operator stands for the current value. In this example the spread operator is used on the state therefore;
// the second value after using a spread operator would be considered a modification to the current state; returning a new object

// same logic for any other javascript object when using the spread operator on the first value
