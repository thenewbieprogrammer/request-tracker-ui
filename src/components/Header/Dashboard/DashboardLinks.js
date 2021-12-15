/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {
  Apps,
  CloudDownload,
  Https,
  PersonPin,
  LibraryBooks,
} from "@material-ui/icons";
import * as userLogin from "../../../actions/actions/userLogin.actions";

// core components
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../../components/CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

function HeaderLinks(props) {
  // useEffect(() => {
  //   props.getAuth();
  // }, [props.state.loggedIn]);

  const classes = useStyles();

  function logoutUser(e) {
    e.preventDefault();
    props.userLogoutLoading();
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/requests" color="transparent" className={classes.navLink}>
          <LibraryBooks className={classes.icons} /> Requests
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to="/admin" color="transparent" className={classes.navLink}>
          <PersonPin className={classes.icons} /> Admin
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          onClick={logoutUser}
          color="transparent"
          className={classes.navLink}
        >
          <Https className={classes.icons} /> Log Out
        </Button>
      </ListItem>
    </List>
  );
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.login,
  };
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    userLogoutLoading: () => dispatch(userLogin.userLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderLinks)
);
