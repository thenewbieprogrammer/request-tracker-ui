import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import * as userLoginActions from "../../actions/actions/userLogin.actions";

// @material-ui/icons
// core components
import DashboardHeader from "../../components/Header/Dashboard/DashboardHeader.js";
import Footer from "../../components/Footer/Dashboard/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Parallax from "../../components/Parallax/Parallax.js";
// sections for this page
import DashboardLinks from "../../components/Header/Dashboard/DashboardLinks.js";

import SectionNavbars from "../Components/Sections/SectionNavbars.js";
import SectionTabs from "../Components/Sections/SectionTabs.js";
import SectionPills from "../Components/Sections/SectionPills.js";
import SectionNotifications from "../Components/Sections/SectionNotifications.js";
import SectionTypography from "../Components/Sections/SectionTypography.js";
import SectionJavascript from "../Components/Sections/SectionJavascript.js";
import SectionCarousel from "../Components/Sections/SectionCarousel.js";
import SectionCompletedExamples from "../Components/Sections/SectionCompletedExamples.js";
import SectionLogin from "../Components/Sections/SectionLogin.js";
import SectionExamples from "../Components/Sections/SectionExamples.js";
import SectionDownload from "../Components/Sections/SectionDownload.js";

import styles from "../../assets/jss/material-kit-react/views/components.js";

const bg7 = require("../../assets/img/bg7.jpg").default;

const useStyles = makeStyles(styles);

function Dashboard(props) {
  useEffect(() => {
    props.getAuth();
  }, []);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <DashboardHeader
        brand="Dashboard"
        rightLinks={<DashboardLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={bg7}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Welcome to Request Tracker</h1>
                <h3 className={classes.subtitle}>
                  Create and track all types of requests!
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <Footer />
    </div>
  );
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAuth: () => dispatch(userLoginActions.getAuth()),
  };
};

// map state from store to props
const mapStateToProps = (state) => {
  return {
    loginState: state.login,
  };
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
