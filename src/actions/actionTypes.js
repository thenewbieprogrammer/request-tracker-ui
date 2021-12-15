/**
 *                  !
 *
 *?...       REPORT ACTION TYPES    ?...
 *
 *                  !
 */
export const ADD_REPORT = "ADD_REPORT";
export const ADD_REPORT_LOADING = "ADD_REPORT_LOADING";
export const ADD_REPORT_FAILED = "ADD_REPORT_FAILED";

export const LOAD_REPORTS = "LOAD_REPORTS";
export const REPORTS_LOADING = "REPORTS_LOADING";
export const REPORTS_FAILED = "REPORTS_FAILED";

export const UPDATE_REPORT = "UPDATE_REPORT";
export const UPDATE_REPORT_LOADING = "UPDATE_REPORT_LOADING";
export const UPDATE_REPORT_FAILED = "UPDATE_REPORT_FAILED";

export const DELETE_REPORT = "DELETE_REPORT";
export const DELETE_REPORT_LOADING = "DELETE_REPORT_LOADING";
export const DELETE_REPORT_FAILED = "DELETE_REPORT_FAILED";

/**
 *                  !
 *
 *?...       USER-LOGIN ACTION TYPES    ?...
 *
 *                  !
 */

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_LOADING = "USER_LOGIN_LOADING";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT_LOADING = "USER_LOGOUT_LOADING";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILED = "USER_LOGIN_FAILED";

export const GET_AUTH = "GET_AUTH";

/**
 *                  !
 *
 *?...       USER-REGISTER ACTION TYPES    ?...
 *
 *                  !
 */

export const USER_REGISTER = "USER_REGISTER";
export const USER_REGISTER_LOADING = "USER_REGISTER_LOADING";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

/**
 *                  !
 *
 *?...       ADMINISTRATOR ACTION TYPES    ?...
 *
 *                  !
 */

export const LOAD_ADMINS = "LOAD_ADMINS";
export const ADMINS_LOADING = "ADMINS_LOADING";
export const ADMINS_FAILED = "ADMINS_FAILED";

export const ADD_ADMIN = "ADD_ADMIN";
export const ADD_ADMIN_LOADING = "ADD_ADMIN_LOADING";
export const ADD_ADMIN_FAILED = "ADD_ADMIN_FAILED";

export const REMOVE_ADMIN = "REMOVE_ADMIN";
export const REMOVE_ADMIN_LOADING = "REMOVE_ADMIN_LOADING";
export const REMOVE_ADMIN_FAILED = "REMOVE_ADMIN_FAILED";

/**
 *                  !
 *
 *?...       PASSWORD-RECOVERY ACTION TYPES    ?...
 * ?         GET reset password link

 *                  !
 */

export const PASSWORD_RECOVERY_LINK = "PASSWORD_RECOVERY_LINK";
export const PASSWORD_RECOVERY_LINK_LOADING = "PASSWORD_RECOVERY_LINK_LOADING";
export const PASSWORD_RECOVERY_LINK_FAILED = "PASSWORD_RECOVERY_LINK_FAILED";

/**
 *                  !
 *
 *?...       PASSWORD-RESET ACTION TYPES    ?...
 *?...       POST new password
 *                  !
 */

//
export const PASSWORD_RESET = "PASSWORD_RESET";
export const PASSWORD_RESET_LOADING = "PASSWORD_RESET_LOADING";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";

/**
 *                  !
 *
 *?...       VERIFY-PASSWORD-RESET ACTION TYPES    ?...
 *?...       GET Credentials Verification
 *                  !
 */

//
export const VERIFY_RESET_CREDENTIALS = "VERIFY_RESET_CREDENTIALS";
export const VERIFY_RESET_CREDENTIALS_LOADING =
  "VERIFY_RESET_CREDENTIALS_LOADING";
export const VERIFY_RESET_CREDENTIALS_FAILED =
  "VERIFY_RESET_CREDENTIALS_FAILED";
