import moment from "moment";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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

function CreateANewReport(props) {
  const history = useNavigate();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [reportedBy, setReportedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dateReporting, setDateReporting] = useState("");
  const [dateExpectedForCompletion, setDateExpectedForCompletion] =
    useState(null);
  const [reportSummary, setReportSummary] = useState("");
  const [requestedApplication, setRequestedApplication] = useState("");
  const [urgency, setUrgency] = useState("Select from the following....");
  const [security, setSecurity] = useState(false);
  const [securityComment, setSecurityComment] = useState("");

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

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

  function postNewReport(e) {
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

    if (newReportObject.DateExpectedForCompletion === "Invalid date") {
      newReportObject.DateExpectedForCompletion = null;
    }

    console.log(
      "printing new report before submission " +
        JSON.stringify(newReportObject, null, 2)
    );

    props.addReportLoading(newReportObject);

    //invoke props function add new report
    e.preventDefault();
    history.push("/requests");
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
                  onSubmit={(e) => postNewReport(e)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Create a request</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      value={reportedBy}
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
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonAdd className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      value={assignedTo}
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
                        value={dateReporting}
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
                          type: "date",

                          autoComplete: "off",
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "25px", marginTop: "25px" }}>
                      {" "}
                      <label>Date Expected for Completion</label>
                      <CustomInput
                        value={dateExpectedForCompletion}
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
                          type: "date",

                          autoComplete: "off",
                        }}
                      />
                    </div>

                    <CustomInput
                      value={reportSummary}
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
                        type: "text",
                      }}
                    />
                    <CustomInput
                      value={requestedApplication}
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
                    {security === true ? (
                      <CustomInput
                        value={securityComment}
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
                          type: "text",
                        }}
                      />
                    ) : (
                      <p></p>
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Create
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
    addReportLoading: (newReportData) =>
      dispatch(reports.postReport(newReportData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateANewReport)
);
