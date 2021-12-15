import moment from "moment";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useNavigate } from "react-router-dom";

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
import * as admin from "../../actions/actions/administrator.actions";

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

function CreateANewAdmin(props) {
  const history = useNavigate();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = useState("");

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function postNewAdmin(e) {
    props.addAdminLoading(email);

    //invoke props function add new report
    e.preventDefault();
    history("/admin");
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
                  onSubmit={(e) => postNewAdmin(e)}
                >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Create a new admin</h4>
                    <small style={{ color: "white" }}>
                      user must be registered
                    </small>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      isInputLabel={true}
                      id="thisemail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleEmail(e);
                        },
                        value: email,
                        type: "email",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Create Admin
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
    adminState: state.administrator,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    addAdminLoading: (email) => dispatch(admin.submitNewAdmin(email)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateANewAdmin)
);
