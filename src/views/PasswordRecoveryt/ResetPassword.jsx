import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect, useNavigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import SecurityOutlined from "@material-ui/icons/SecurityOutlined";
import People from "@material-ui/icons/People";
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Footer from "../../components/Footer/Footer.js";
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
import * as passwordRecovery from "../../actions/actions/passwordRecovery.actions";

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

function ResetPassword(props) {
  // verify reset token password on load of component
  // redirect to login if token not verified!

  //get token and user id from req.params
  const userId = props.match.params.userID;
  const token = props.match.params.recoveryToken;
  useEffect(() => {
    const credentialsObject = {
      UserID: userId,
      ResetToken: token,
    };

    props.passwordRecoveryVerifyCredentialsLoading(credentialsObject);
  }, []);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function resetPassword(e) {
    e.preventDefault();

    if (password === confirmPassword) {
      const passwordResetObject = {
        UserID: userId,
        ResetToken: token,
        Password: confirmPassword,
      };
      props.passwordResetLoading(passwordResetObject);
    }
  }
  const data = useSelector((state) => state.passwordRecovery);

  useEffect(() => {
    console.log(`${JSON.stringify(data)}`);
    if (data.isPasswordReset === true) {
      setErr("");
      setSuccess("Password changed successfully!");
      window.setTimeout(redirectUserToLogin, 1000);
    } else {
      setErr("");
      setSuccess("");
    }
  }, [data]);

  function redirectUserToLogin() {
    props.history.push("/login");
  }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Request Tracker"
        rightLinks={<HeaderLinks />}
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
                  onSubmit={(e) => resetPassword(e)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Reset Password</h4>
                    {err ? (
                      <small style={{ color: "white" }}>{err}</small>
                    ) : (
                      <></>
                    )}
                    {success ? (
                      <small style={{ color: "white" }}>{success}</small>
                    ) : (
                      <></>
                    )}
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      value={password}
                      labelText="Password..."
                      isInputLabel={true}
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handlePasswordChange(e);
                        },
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      value={confirmPassword}
                      isInputLabel={true}
                      labelText="Confirm Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleConfirmPasswordChange(e);
                        },
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Reset
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
    passwordRecoveryState: state.passwordRecovery,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    passwordResetLoading: (data) =>
      dispatch(passwordRecovery.submitAccountPasswordReset(data)),
    passwordRecoveryVerifyCredentialsLoading: (data) =>
      dispatch(passwordRecovery.verifyAccountResetCredentials(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
);
