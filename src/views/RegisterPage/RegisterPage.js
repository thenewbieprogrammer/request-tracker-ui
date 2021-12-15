import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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

/**
 * ? Importing Actions
 */

import * as userRegister from "../../actions/actions/userRegister.actions";

const useStyles = makeStyles(styles);

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function register(e) {
    e.preventDefault();

    const userRegisterObject = {
      email: email,
      password: password,
    };
    props.userRegisterLoading(userRegisterObject);
  }

  useEffect(() => {
    console.log(`printing if user is registered ${props.state.isRegistered}`);
    if (
      props.state.isRegistered !== null &&
      props.state.isRegistered === true
    ) {
      setErr("");

      setSuccess("Successfully registered!...");
    }
    if (props.state.isRegistered === false) {
      setSuccess("");

      setErr("Error!, try again ...");
    }
  }, [props.state.isRegistered]);

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
                <form className={classes.form} onSubmit={(e) => register(e)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                    <small style={{ color: "white" }}>{err ? err : ""}</small>
                    <small style={{ color: "white" }}>
                      {success ? success : ""}
                    </small>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      value={email}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleEmailChange(e);
                        },
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      value={password}
                      labelText="Password"
                      id="pass"
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
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      GET STARTED
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
    state: state.register,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    userRegisterLoading: (userRegisterObject) =>
      dispatch(userRegister.register(userRegisterObject)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
);
