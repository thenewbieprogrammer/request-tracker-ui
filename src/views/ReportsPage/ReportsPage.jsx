import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Redirect, Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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
import TableList from "../../components/TableList/TableList.js";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../assets/img/bg7.jpg";
import * as userLogin from "../../actions/actions/userLogin.actions";
import { userService } from "../../service/userAuthentication.service";
import ReportsTable from "./ReportsTable.jsx";

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

function ReportsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

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
            <GridItem xs={12} sm={12} md={12}>
              <ReportsTable />
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
  return {};
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReportsPage)
);
