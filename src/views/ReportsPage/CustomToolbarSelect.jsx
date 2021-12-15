import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useNavigate, Redirect, Link } from "react-router-dom";
import * as reports from "../../actions/actions/reports.actions";

const defaultToolbarSelectStyles = {
  iconButton: {},
  deleteIcon: {
    color: "red",
  },
};

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};

class CustomToolbarSelect extends React.Component {
  handleClick = (e) => {
    // this.props.selectedRows.data
    //console.log("click!", this.props.selectedRows.data); // a user can do something with these selectedRow values
    e.preventDefault();
    this.props.selectedRows.data.forEach((item, index, array) => {
      var itemDataIndex = item.dataIndex;

      console.log(itemDataIndex);
      var currentReport = this.props.reportsState.reports[itemDataIndex];
      this.props.deleteReportLoading(currentReport);
    });
    window.location.reload();
    // console.log("click!", this.props.selectedRows.data[0].dataIndex); // a user can do something with these selectedRow values
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"} style={{ padding: "20px" }}>
        <Tooltip title={"Delete"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    deleteReportLoading: (report) => dispatch(reports.deleteAReport(report)),
  };
};

// map state from store to props
const mapStateToProps = (state) => {
  return {
    reportsState: state.reports,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    withStyles(defaultToolbarSelectStyles, {
      name: "CustomToolbarSelect",
    })(CustomToolbarSelect)
  )
);

// export default withStyles(defaultToolbarSelectStyles, {
//     name: "CustomToolbarSelect",
//   })(CustomToolbarSelect);
