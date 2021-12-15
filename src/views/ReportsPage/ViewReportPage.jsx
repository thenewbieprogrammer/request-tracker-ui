import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Link } from "react-router-dom";
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

function ViewReportPage(props) {
  const history = useNavigate();

  const location = useLocation();
  const foundReport = location?.state?.report;
  const report = JSON.parse(foundReport);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  var _reportedBy = JSON.stringify(report.ReportedBy);

  //set edit values from props
  const [reportedBy, setReportedBy] = useState(_reportedBy);
  const [assignedTo, setAssignedTo] = useState("");
  const [dateReporting, setDateReporting] = useState("");
  const [dateExpectedForCompletion, setDateExpectedForCompletion] =
    useState("");
  const [reportSummary, setReportSummary] = useState("");
  const [requestedApplication, setRequestedApplication] = useState("");
  const [urgency, setUrgency] = useState("Select from the following....");
  const [security, setSecurity] = useState(false);
  const [securityComment, setSecurityComment] = useState("");

  console.log("recieved report to view: " + report);
  //funcitonality for editing the fields of the report
  function setDefaultReportedBy() {
    setReportedBy(_reportedBy);
  }

  function handleReportedBy(event) {
    setReportedBy(event.target.value);
  }

  function handleAssignedTo(event) {
    setAssignedTo(event.target.value);
  }

  function handleDateReporting(event) {
    let newDate = moment(event.target.value);

    var prsd = newDate.utc(true).format();
    setDateReporting(prsd);
  }

  function handleDateExpectedForCompletion(event) {
    //let newDate = moment(event.target.value).format("DD-MM-YYYY");
    let newDate = moment(event.target.value);

    var prsd = newDate.utc(true).format();

    setDateExpectedForCompletion(prsd);
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

  function handleSecurity(event) {
    setSecurity(!security);
  }

  function handleSecurityComment(event) {
    setSecurityComment(event.target.value);
  }

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;
  var updateReport = JSON.stringify(foundReport);
  function displayEditForm(event) {
    event.preventDefault();
    history("/edit-report", {
      replace: true,
      state: {
        report: foundReport,
      },
    });
  }

  function postRequestUpdates(e) {
    const newReportObject = {
      ReportedBy: reportedBy,
      AssignedTo: assignedTo,
      DateReporting: dateReporting,
      DateExpectedForCompletion: dateExpectedForCompletion,
      ReportSummary: reportSummary,
      RequestedApplication: requestedApplication,
      Urgency: urgency,
      Security: security,
      SecurityComment: securityComment,
    };

    console.log(
      "printing new report before submission " + JSON.stringify(newReportObject)
    );

    props.addReportLoading(newReportObject);

    //invoke props function add new report
    e.preventDefault();
  }

  if (report === undefined) {
    return <Navigate replace to="/dashboard" />;
  } else if (report !== undefined) {
    return (
      <div>
        <DashboardHeader
          absolute
          color="transparent"
          brand="Dashboard"
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
                    onSubmit={(e) => displayEditForm(e)}
                  >
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>View Request</h4>
                    </CardHeader>
                    <CardBody>
                      <p>Reported By: {report.ReportedBy}</p>
                      <p>Assigned To: {report.AssignedTo} </p>
                      <p>Date Reported: {report.DateReported}</p>{" "}
                      <p>
                        Date Expected For Completion:{" "}
                        {report.DateExpectedForCompletion}
                      </p>
                      <p>Date Completed: {report.DateCompleted}</p>
                      <p>Report Summary: {report.ReportSummary}</p>
                      <p>
                        Requested Application: {report.RequestedApplication}
                      </p>
                      <p>Urgency: {report.Urgency}</p>
                      <p>Security: {report.Security}</p>
                      <p>Security Comment: {report.SecurityComment}</p>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg">
                        Edit
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
  connect(mapStateToProps, mapDispatchToProps)(ViewReportPage)
);
