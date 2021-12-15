import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/styles";
import { Provider, connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import CustomAdminsTableToolbar from "./CustomAdminsTableToolbar.jsx";
import * as admin from "../../actions/actions/administrator.actions";
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
    name: "email",
    label: "User",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "isAdmin",
    label: "Is Administrator",
    options: {
      filter: true,
      sort: true,
    },
  },
];

function AdminTable(props) {
  useEffect(() => {
    getAdmins();
  }, []);

  const { getAdmins, adminState } = props;

  const { admins } = adminState;

  const HandleRowClick = (rowData, rowMeta) => {
    console.log(`Row Data: ${rowData}`);
    var rowMeta = JSON.stringify(rowMeta.dataIndex);
    //var dataIndex = rowMeta.dataIndex;
    console.log(`Row Meta: ${rowMeta}`);

    //get the requestRowData from state
    //  console.log(`Data Index for Selected Row: ${dataIndex}`);
  };

  const options = {
    filterType: "checkbox",
    customToolbar: () => {
      return <CustomAdminsTableToolbar />;
    },
    responsive: "vertical",
    onRowClick: HandleRowClick,
    customToolbarSelect: (selectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} />
    ),
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <PersonPin />{" "}
          <span style={{ fontSize: "33px", marginLeft: "10px" }}>
            All Admins
          </span>
        </div>
      </div>
      <br />
      <MUIDataTable data={admins} columns={columns} options={options} />
    </ThemeProvider>
  );
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAdmins: () => dispatch(admin.fetchAdmins()),
  };
};

// map state from store to props
const mapStateToProps = (state) => {
  return {
    adminState: state.administrator,
  };
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
