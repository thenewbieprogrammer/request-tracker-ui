import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { ReportForm } from "../utils/forms.js";

//root reducer
import rootReducer from "../reducer";

//redux logger enables me to trace the application as and when new actions are dispatched
// all that is logged into the javascript console are each actions and within each action
// we gain access to previous state, action, and the next state after the action is complete

const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  return store;
};

export default ConfigureStore;
