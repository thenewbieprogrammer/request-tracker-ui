import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/styles";
import { Provider, connect } from "react-redux";
import { withRouter, Redirect, useNavigate } from "react-router-dom";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import CustomReportsTableToolbar from "./CustomReportsTableToolbar.jsx";
import * as reports from "../../actions/actions/reports.actions";
import CustomToolbarSelect from "./CustomToolbarSelect.jsx";
// @material-ui/icons
import {
  Apps,
  CloudDownload,
  Https,
  PersonPin,
  LibraryBooks,
} from "@material-ui/icons";

let theme = createTheme({
  palette: {
    primary: {
      light: "red",
      main: "red",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "red",
      main: "red",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        selected: {
          "&.Mui-selected": {
            backgroundColor: "turquoise",
            color: "white",
            fontWeight: 600,
          },
        },
      },
    },
  },
});

const columns = [
  {
    name: "ReportedBy",
    label: "Reported By",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "AssignedTo",
    label: "Assigned To",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateReported",
    label: "Reported",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateCompleted",
    label: "Completed",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "DateExpectedForCompletion",
    label: "Expected Completion",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "RequestedApplication",
    label: "Application",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Urgency",
    label: "Urgency",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "Security",
    label: "Security",
    options: {
      filter: true,
      sort: true,
    },
  },
];

const data = [
  {
    ReportedBy: "bilaal",
    AssignedTo: "bob",
    DateReported: "2012-10-16T17:57:28.556094Z",
    DateCompleted: "2013-10-16T17:57:28.556094Z",
    DateExpectedForCompletion: "2013-08-16T17:57:28.556094Z",
    RequestedApplication: "RequestTracker",
    Urgency: "High",
    Security: false,
  },
  {
    ReportedBy: "bob",
    AssignedTo: "bilaal",
    DateReported: "2012-10-16T17:57:28.556094Z",
    DateCompleted: "2013-10-16T17:57:28.556094Z",
    DateExpectedForCompletion: "2013-08-16T17:57:28.556094Z",
    RequestedApplication: "RequestTracker",
    Urgency: "Medium",
    Security: true,
  },
  {
    ReportedBy: "John",
    AssignedTo: "Dylan",
    DateReported: "2012-10-16T17:57:28.556094Z",
    DateCompleted: "2014-10-16T17:57:28.556094Z",
    DateExpectedForCompletion: "2014-08-16T17:57:28.556094Z",
    RequestedApplication: "RequestTracker",
    Urgency: "Low",
    Security: false,
  },
];

function ReportsTable(props) {
  const history = useNavigate();
  useEffect(() => {
    getReports();
  }, []);

  const { getReports, reportsState } = props;
  const { reports } = reportsState;

  // useEffect(() => {
  //   reports?.forEach((element) => {
  //     if (element.DateExpectedForCompletion === null) {
  //       element.DateExpectedForCompletion = "";
  //     }
  //   });
  // }, []);

  const HandleRowClick = (rowData, rowMeta) => {
    console.log(`Row Data: ${rowData}`);
    var rowMeta = JSON.stringify(rowMeta.dataIndex);
    //var dataIndex = rowMeta.dataIndex;
    console.log(`Row Meta: ${rowMeta}`);

    var request = JSON.stringify(reportsState.reports[rowMeta]);
    //get the requestRowData from state
    console.log(`Request clicked ${request}`);
    //  console.log(`Data Index for Selected Row: ${dataIndex}`);

    history("/view-report", {
      state: {
        report: request,
      },
    });
  };

  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomReportsTableToolbar />;
    },
    responsive: "stacked",
    onRowClick: HandleRowClick,
    customToolbarSelect: (selectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} />
    ),
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <LibraryBooks />{" "}
          <span style={{ fontSize: "33px", marginLeft: "10px" }}>
            All Requests
          </span>
        </div>
      </div>
      <br />
      <MUIDataTable data={reports} columns={columns} options={options} />
    </ThemeProvider>
  );
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getReports: () => dispatch(reports.fetchReports()),
  };
};

// map state from store to props
const mapStateToProps = (state) => {
  return {
    reportsState: state.reports,
  };
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(ReportsTable);
