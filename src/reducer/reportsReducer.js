import * as ActionTypes from "../actions/actionTypes.js";

// the reducer contains the initial state for an object
// then we use ActionTypes to load values into the state
const Reports = (
  state = {
    isLoading: true,
    errMess: null,
    reports: [],
    reportId: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
    areReportsLoaded: false,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_REPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reports: [],
        reportId: null,
        isAdded: true,
      };
    case ActionTypes.ADD_REPORT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        reports: [],
        reportId: null,
        isAdded: false,
      };
    case ActionTypes.ADD_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reports: [],
        reportId: null,
        isAdded: false,
      };

    case ActionTypes.LOAD_REPORTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reports: action.payload,
        reportId: null,
        isAdded: false,
        areReportsLoaded: true,
      };
    case ActionTypes.REPORTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        reports: [],
        reportId: null,
        areReportsLoaded: false,
      };
    case ActionTypes.REPORTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reports: [],
        reportId: null,
        areReportsLoaded: false,
      };
    case ActionTypes.UPDATE_REPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reports: [],
        reportId: null,
        isUpdated: true,
      };
    case ActionTypes.UPDATE_REPORT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        reports: [],
        reportId: null,
        isUpdated: false,
      };
    case ActionTypes.UPDATE_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reports: [],
        reportId: null,
        isUpdated: false,
      };
    case ActionTypes.DELETE_REPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reports: [],
        reportId: action.payload,
        isDeleted: true,
      };
    case ActionTypes.DELETE_REPORT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        reports: [],
        reportId: null,
        isDeleted: false,
      };
    case ActionTypes.DELETE_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reports: [],
        reportId: null,
        isDeleted: false,
      };
    default:
      return state;
  }
};

export default Reports;

//the spread operator stands for the current value. In this example the spread operator is used on the state therefore;
// the second value after using a spread operator would be considered a modification to the current state; returning a new object

// same logic for any other javascript object when using the spread operator on the first value
