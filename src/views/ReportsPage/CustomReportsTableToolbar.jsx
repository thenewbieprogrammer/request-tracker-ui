import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useNavigate, Redirect, Link } from "react-router-dom";

const defaultToolbarStyles = {
  iconButton: {},
};

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

class CustomReportsTableToolbar extends React.Component {
  onClick = () => {
    this.props.history.push("/create-request");
  };

  handleClick = () => {};

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add A Request"}>
          <IconButton className={classes.iconButton} onClick={this.onClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect()(
    withStyles(defaultToolbarStyles, {
      name: "CustomReportsTableToolbar",
    })(CustomReportsTableToolbar)
  )
);
