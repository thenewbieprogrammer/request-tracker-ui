import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import administratorReducer from "./administratorReducer.js";
import userLoginReducer from "./userLoginReducer";
import userRegisterReducer from "./userRegisterReducer";
import passwordRecoveryReducer from "./passwordRecoveryReducer.js";
import reportsReducer from "./reportsReducer.js";

export default combineReducers({
  administrator: administratorReducer,
  login: userLoginReducer,
  register: userRegisterReducer,
  passwordRecovery: passwordRecoveryReducer,
  reports: reportsReducer,
  routing: routerReducer,
});
