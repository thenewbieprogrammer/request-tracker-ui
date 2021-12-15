import * as ActionTypes from "../actionTypes.js";
import { BASE_URL } from "../../shared/apiBaseURL.js";
import { userService } from "../../service/userAuthentication.service";
import moment from "moment";

/**
 * 
 * ?  a thunk function which returns the (dispatch) function
 * ?  in this thunk middleware function we are dispatching multiple actions
 * ?  inside the fetchReports() function we gain access to getState and dispatch functions
 * ?  hence, thunk allows us to call multiple actions via the dispatch function parameter

 */

/**
 *
 * ? POST Report
 */

export const addReport = () => ({
  type: ActionTypes.ADD_REPORT,
});

export const addReportLoading = () => ({
  type: ActionTypes.ADD_REPORT_LOADING,
});

export const addReportFailed = (errmess) => ({
  type: ActionTypes.ADD_REPORT_FAILED,
  payload: errmess,
});
//submit new report
export const postReport = (data) => {
  return async (dispatch) => {
    console.log(
      "printing new report data before post req" + JSON.stringify(data)
    );

    const newReport = {
      ReportedBy: data.ReportedBy,
      AssignedTo: data.AssignedTo,
      DateReported: data.DateReporting,
      DateCompleted: null,
      DateExpectedForCompletion: data.DateExpectedForCompletion,
      ReportSummary: data.ReportSummary,
      RequestedApplication: data.RequestedApplication,
      Urgency: data.Urgency,
      Security: data.Security,
      SecurityComment: data.SecurityComment,
    };
    if (newReport) {
      console.log("adding report" + JSON.stringify(newReport));
      dispatch(addReportLoading());
    }
    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(newReport),
    });

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(addReport());
        })
        .catch((err) => {
          dispatch(addReportFailed(err));
        });
    } else {
      response
        .json()
        .then((error) => {
          dispatch(addReportFailed(error));
        })
        .catch((err) => dispatch(addReportFailed(err)));
    }
    console.log("user report added fn complete");
    return response;
  };
};

/**
 *
 * ? GET all reports
 */

export const loadReports = (reports) => ({
  type: ActionTypes.LOAD_REPORTS,
  payload: reports,
});

export const reportsLoading = () => ({
  type: ActionTypes.REPORTS_LOADING,
});

export const reportsFailed = (errmess) => ({
  type: ActionTypes.REPORTS_FAILED,
  payload: errmess,
});

export const fetchReports = () => {
  return async (dispatch) => {
    dispatch(reportsLoading(true));

    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (response.ok) {
      response
        .json()
        .then((data) => {
          data.forEach((item) => {
            item.DateReported = moment(item.DateReported).format("DD/MM/YYYY");
            if (item.DateCompleted === null) {
              item.DateCompleted = " ";
            } else if (item.DateCompleted !== null) {
              item.DateCompleted = moment(item.DateCompleted).format(
                "DD/MM/YYYY"
              );
            }

            if (item.DateExpectedForCompletion === null) {
              item.DateCompleted = " ";
            } else if (item.DateExpectedForCompletion !== null) {
              item.DateExpectedForCompletion = moment(
                item.DateExpectedForCompletion
              ).format("DD/MM/YYYY");
            }

            // item.DateExpectedForCompletion = moment(
            //   item.DateExpectedForCompletion
            // ).format("DD/MM/YYYY");
            if (item.Security === false) {
              item.Security = "No";
            } else if (item.Security === true) {
              item.Security = "Yes";
            }
          });

          // console.log("updated data: " + JSON.stringify(data));
          dispatch(loadReports(data));
        })
        .catch((err) => {
          dispatch(reportsFailed(err));
        });
    } else {
      response
        .json()
        .then((error) => {
          dispatch(reportsFailed(error));
        })
        .catch((err) => dispatch(reportsFailed(err)));
    }
    return response;
  };
};

/**
 *
 * ? UPDATE Report
 */

export const editReport = (report) => ({
  type: ActionTypes.UPDATE_REPORT,
});

export const editReportLoading = () => ({
  type: ActionTypes.UPDATE_REPORT_LOADING,
});

export const editReportFailed = (errmess) => ({
  type: ActionTypes.UPDATE_REPORT_FAILED,
  payload: errmess,
});

export const editAReport = (data) => {
  return async (dispatch) => {
    if (data.Security == "Yes") {
      console.log("data security is ticked");
    }
    console.log(
      `printing the data to be updated ${JSON.stringify(data, null, 2)}`
    );
    const updatedReport = {
      ReportedBy: data.ReportedBy,
      AssignedTo: data.AssignedTo,
      DateReported: data.DateReporting,
      DateCompleted: data.DateCompleted ? data.DateCompleted : null,
      DateExpectedForCompletion: data.DateExpectedForCompletion
        ? data.DateExpectedForCompletion
        : null,
      ReportSummary: data.ReportSummary,
      RequestedApplication: data.RequestedApplication,
      Urgency: data.Urgency,
      Security: data.Security === true ? true : false,
      SecurityComment: data.SecurityComment,
    };
    if (updatedReport) {
      console.log("updating report " + JSON.stringify(updatedReport));
      dispatch(editReportLoading());
    }

    console.log("code ran");

    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "reports/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(updatedReport),
    });

    if (response.ok) {
      response
        .json()
        .then((data) => {
          dispatch(editReport());
        })
        .catch((err) => {
          dispatch(editReportFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(editReportFailed(error));
        })
        .catch((err) => {
          dispatch(editReportFailed(err));
        });
    }
    console.log("updated report fn complete");
    return response;
  };
};

/**
 *
 * ? DELETE Report
 */

export const deleteReport = (report) => ({
  type: ActionTypes.DELETE_REPORT,
  payload: report,
});

export const deleteReportLoading = () => ({
  type: ActionTypes.DELETE_REPORT_LOADING,
});

export const deleteReportFailed = (errmess) => ({
  type: ActionTypes.DELETE_REPORT_FAILED,
  payload: errmess,
});

export const deleteAReport = (data) => {
  return async (dispatch) => {
    console.log(
      "printing updated report data before put req" + JSON.stringify(data)
    );

    const reportToDelete = {
      ReportedBy: data.ReportedBy,
      AssignedTo: data.AssignedTo,
      DateReported: data.DateReporting,
      DateCompleted: data.DateCompleted ? data.DateCompleted : null,
      DateExpectedForCompletion: data.DateExpectedForCompletion,
      ReportSummary: data.ReportSummary,
      RequestedApplication: data.RequestedApplication,
      Urgency: data.Urgency,
      Security: data.Security,
      SecurityComment: data.SecurityComment,
    };
    if (reportToDelete) {
      console.log("deleting report" + JSON.stringify(reportToDelete));
      dispatch(deleteReportLoading());
    }
    let token = localStorage.getItem("id_token");

    const response = await fetch(BASE_URL + "reports/" + data.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (response.ok) {
      response
        .json()
        .then((_data) => {
          dispatch(deleteReport(data.id));
        })
        .catch((err) => {
          dispatch(deleteReportFailed(err));
        });
    } else if (!response.ok) {
      response
        .json()
        .then((error) => {
          dispatch(deleteReportFailed(error));
        })
        .catch((err) => {
          dispatch(deleteReportFailed(err));
        });
    }
    console.log("delete report fn complete");
    return response;
  };
};
