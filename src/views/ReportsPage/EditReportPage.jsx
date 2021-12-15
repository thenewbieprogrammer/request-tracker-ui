import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
// core components
import DashboardHeader from "../../components/Header/Dashboard/DashboardHeader.js";
import DashboardLinks from "../../components/Header/Dashboard/DashboardLinks.js";
import Footer from "../../components/Footer/Dashboard/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../assets/img/bg7.jpg";
import * as reports from "../../actions/actions/reports.actions";

const useStyles = makeStyles(styles);

//cannot use a hook inside an if statement, functions or loops
//always place hooks at the top level of your JSX Functional component

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

function EditReportPage(props) {
  const location = useLocation();
  const history = useNavigate();

  const foundReport = location?.state?.report;
  const report = JSON.parse(foundReport);

  //convert date to proper format for datetime input
  var _DateReported = moment(report.DateReported, "DD/MM/YYYY");
  var formattedDateReported = _DateReported.format("YYYY-MM-DD");

  //expected date for completion
  var _DateExpected = moment(report.DateExpectedForCompletion, "DD/MM/YYYY");
  var formattedDateExpected = _DateExpected.format("YYYY-MM-DD");

  //date completed
  var _DateCompleted = moment(report.DateCompleted, "DD/MM/YYYY");
  var formattedDateCompleted = _DateCompleted.format("YYYY-MM-DD");

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [editReport, setEditReport] = useState(false);

  //set edit values from props
  const [reportedBy, setReportedBy] = useState(report.ReportedBy);

  const [assignedTo, setAssignedTo] = useState(report.AssignedTo);
  const [dateReporting, setDateReporting] = useState(formattedDateReported);
  const [dateExpectedForCompletion, setDateExpectedForCompletion] = useState(
    formattedDateExpected
  );
  const [dateCompleted, setDateCompleted] = useState(formattedDateCompleted);

  const [reportSummary, setReportSummary] = useState(report.ReportSummary);
  const [requestedApplication, setRequestedApplication] = useState(
    report.RequestedApplication
  );
  useEffect(() => {
    if (report.Security === "No") {
      setSecurity(false);
    }
    if (report.Security === "Yes") {
      setSecurity(true);
    }
  }, []);
  const [urgency, setUrgency] = useState(report.Urgency);
  const [security, setSecurity] = useState(false);
  const [securityComment, setSecurityComment] = useState(
    report.SecurityComment
  );

  useEffect(() => {
    console.log(
      `printing report recieved from view page ${JSON.stringify(
        report,
        null,
        2
      )}`
    );
  }, []);
  function handleReportedBy(event) {
    setReportedBy(event.target.value);
  }

  function handleAssignedTo(event) {
    setAssignedTo(event.target.value);
  }

  function handleDateReporting(event) {
    setDateReporting(event.target.value);
  }

  function handleDateExpectedForCompletion(event) {
    setDateExpectedForCompletion(event.target.value);
  }

  function handleDateCompleted(event) {
    setDateCompleted(event.target.value);
  }

  function handleReportSummary(event) {
    setReportSummary(event.target.value);
  }

  function handleRequestedApplication(event) {
    setRequestedApplication(event.target.value);
  }

  function handleUrgency(event) {
    setUrgency(event.target.value);
  }
  useEffect(() => {
    console.log(`printing security value before updated ${security}`);
  }, [security]);

  function handleSecurity(event) {
    setSecurity(!security);
  }
  useEffect(() => {
    console.log(`printing security value after updated ${security}`);
  }, [security]);
  function handleSecurityComment(event) {
    setSecurityComment(event.target.value);
  }

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  function displayEditForm(event) {
    event.preventDefault();

    setEditReport(!editReport);
  }

  function postRequestUpdates(e) {
    const updatedReportObject = {
      id: report.id,
      ReportedBy: reportedBy,
      AssignedTo: assignedTo,
      DateReporting: dateReporting,
      DateExpectedForCompletion: dateExpectedForCompletion,
      DateCompleted: dateCompleted,
      ReportSummary: reportSummary,
      RequestedApplication: requestedApplication,
      Urgency: urgency,
      Security: security,
      SecurityComment: securityComment,
    };

    if (updatedReportObject.DateCompleted === "Invalid date") {
      updatedReportObject.DateCompleted = null;
    }
    if (updatedReportObject.DateExpectedForCompletion === "Invalid date") {
      updatedReportObject.DateExpectedForCompletion = null;
    }

    console.log(
      "printing updated report before submission " +
        JSON.stringify(updatedReportObject)
    );

    props.editAReportLoading(updatedReportObject);
    history("/requests");
    //invoke props function add new report
    e.preventDefault();
  }

  return (
    <div>
      <DashboardHeader
        absolute
        color="transparent"
        brand="Request Tracker"
        rightLinks={<DashboardLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form
                  className={classes.form}
                  onSubmit={(e) => postRequestUpdates(e)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Update request</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      isInputLabel={true}
                      labelText="Reported by..."
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleReportedBy(e);
                        },
                        value: reportedBy,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonAdd className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      isInputLabel={true}
                      labelText="Assigned to..."
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleAssignedTo(e);
                        },
                        value: assignedTo,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonAdd className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <div style={{ marginBottom: "25px", marginTop: "25px" }}>
                      {" "}
                      <label>Date Reporting</label>
                      <CustomInput
                        id="pass"
                        labelText="Date Reported..."
                        isInputLabel={false}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (e) => {
                            handleDateReporting(e);
                          },
                          value: dateReporting,

                          type: "date",

                          autoComplete: "off",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "25px", marginTop: "25px" }}>
                      {" "}
                      <label>Date Expected for Completion</label>
                      <CustomInput
                        id="pass"
                        labelText="Date Reported..."
                        isInputLabel={false}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (e) => {
                            handleDateExpectedForCompletion(e);
                          },
                          value: dateExpectedForCompletion,
                          type: "date",

                          autoComplete: "off",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "25px", marginTop: "25px" }}>
                      {" "}
                      <label>Date Completed</label>
                      <CustomInput
                        id="pass"
                        isInputLabel={false}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (e) => {
                            handleDateCompleted(e);
                          },
                          value: dateCompleted,
                          type: "date",

                          autoComplete: "off",
                        }}
                      />
                    </div>
                    <CustomInput
                      labelText="Report summary..."
                      isInputLabel={true}
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleReportSummary(e);
                        },
                        value: reportSummary,
                        type: "text",
                      }}
                    />
                    <CustomInput
                      labelText="Requested Application..."
                      isInputLabel={true}
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleRequestedApplication(e);
                        },
                        value: requestedApplication,

                        type: "text",
                      }}
                    />
                    <label>Urgency: </label>

                    <select
                      class="form-select"
                      style={{ marginBottom: "25px", marginTop: "25px" }}
                      id="urgencySelector"
                      value={urgency}
                      onChange={(e) => {
                        handleUrgency(e);
                      }}
                    >
                      <option>Select from the following....</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>

                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        checked={security}
                        onChange={(e) => {
                          handleSecurity(e);
                        }}
                        id="flexCheckChecked"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Security
                      </label>
                    </div>
                    {security !== "No" || security !== false ? (
                      <CustomInput
                        labelText="Security comment..."
                        isInputLabel={true}
                        id="thisemail"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (e) => {
                            handleSecurityComment(e);
                          },
                          value: securityComment,

                          type: "text",
                        }}
                      />
                    ) : (
                      <p></p>
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Update
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.reports,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    editAReportLoading: (updatedReportData) =>
      dispatch(reports.editAReport(updatedReportData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditReportPage)
);
