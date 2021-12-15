import * as ActionTypes from "../actionTypes.js";
import { BASE_URL } from "../../shared/apiBaseURL.js";

/**
 *
 * ? GET all reports
 */

export const loadAdmins = (admins) => ({
  type: ActionTypes.LOAD_ADMINS,
  payload: admins,
});

export const adminsLoading = () => ({
  type: ActionTypes.ADMINS_LOADING,
});

export const adminsFailed = (errmess) => ({
  type: ActionTypes.ADMINS_FAILED,
  payload: errmess,
});

export const fetchAdmins = () => {
  return async (dispatch) => {
    dispatch(adminsLoading());

    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "admin", {
      method: "GET",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    //Cookie:    "connect.sid=s%3A6huHjwBQ-StQv2guDLw6aCPnuksAh-fT.AYEmkfoeZkfbhqzJsGSP7ksDkfg6PZvFl4zU3crMtoo",

    if (response.ok) {
      response
        .json()
        .then((data) => {
          console.log(data);
          const modifiedData = [];

          data.forEach((item, index, array) => {
            var obj = {
              id: item.id,
              isAdmin: item.isAdmin === true ? "Yes" : "No",
              email: item.email,
            };
            modifiedData.push(obj);
          });

          dispatch(loadAdmins(modifiedData));
        })
        .catch((err) => {
          dispatch(adminsFailed(err));
        });
    } else {
      response
        .json()
        .then((error) => {
          dispatch(adminsFailed(error));
        })
        .catch((err) => dispatch(adminsFailed(err)));
    }
    return response;
  };
};

/**
 *
 * ? POST Request Admin
 */
export const addAdmin = () => ({
  type: ActionTypes.ADD_ADMIN,
});

export const addAdminLoading = () => ({
  type: ActionTypes.ADD_ADMIN_LOADING,
});

export const addAdminFailed = (message) => ({
  type: ActionTypes.ADD_ADMIN_FAILED,
  payload: message,
});

export const submitNewAdmin = (userEmail) => {
  return async (dispatch) => {
    dispatch(addAdminLoading());
    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "admin/" + userEmail, {
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
        .then((data) => {
          dispatch(addAdmin());
        })
        .catch((err) => {
          dispatch(addAdminFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(addAdminFailed(error));
        })
        .catch((err) => {
          dispatch(addAdminFailed(err));
        });
    }
    return response;
  };
};

/**
 * ? DELETE Request Admin
 */

export const deleteAdmin = () => ({
  type: ActionTypes.REMOVE_ADMIN,
});

export const deleteAdminLoading = () => ({
  type: ActionTypes.REMOVE_ADMIN_LOADING,
});

export const deleteAdminFailed = (message) => ({
  type: ActionTypes.REMOVE_ADMIN_FAILED,
  payload: message,
});

export const deleteExistingAdmin = (userEmail) => {
  return async (dispatch) => {
    dispatch(deleteAdminLoading());
    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "admin/remove/" + userEmail, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(deleteAdmin());
        })
        .catch((err) => {
          dispatch(deleteAdminFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(deleteAdminFailed(error));
        })
        .catch((err) => {
          dispatch(deleteAdminFailed(err));
        });
    }
    return response;
  };
};
