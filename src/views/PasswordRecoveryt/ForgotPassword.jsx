import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, Redirect } from "react-router-dom";

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

function ForgotPassword(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function recoverPasswordWrapper(e) {
    e.preventDefault();

    const passwordRecoveryObject = {
      Email: email,
    };
    props.submitAccountPasswordRecoveryLoading(passwordRecoveryObject);
  }

  function recoverPassword(e) {
    recoverPasswordWrapper(e);
  }
  const data = useSelector((state) => state.passwordRecovery);

  useEffect(() => {
    console.log(`${JSON.stringify(data)}`);
    if (data.passwordRecoveryResponse.length === 63) {
      setErr("");
      setSuccess("Check your email for a password recovery link!");
    } else if (data.passwordRecoveryResponse.length === 0) {
      setErr("");
      setSuccess("");
    } else {
      setErr("Error!");
      setSuccess("");
    }
  }, [data]);
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
            <GridItem xs={9} sm={6} md={6} lg={3} xl={6}>
              <Card className={classes[cardAnimaton]}>
                <form
                  className={classes.form}
                  onSubmit={(e) => recoverPassword(e)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Recover your password</h4>
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
                      isInputLabel={true}
                      value={email}
                      labelText="Email..."
                      id="thisemail"
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" transparent color="primary" size="lg">
                      Recover
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
    submitAccountPasswordRecoveryLoading: (data) =>
      dispatch(passwordRecovery.submitAccountPasswordRecovery(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
