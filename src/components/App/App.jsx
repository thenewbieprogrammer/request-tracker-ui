import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import reduxStore from "../../store/reduxStore.js";
import { Provider, connect } from "react-redux";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

// pages
import Components from "../../views/Components/Components.js";
import ReportsPage from "../../views/ReportsPage/ReportsPage.jsx";
import AdminPage from "../../views/AdminPage/AdminPage.jsx";
import LoginPage from "../../views/LoginPage/LoginPage.js";
import RegisterPage from "../../views/RegisterPage/RegisterPage.js";

import { userService } from "../../service/userAuthentication.service";
import * as userLoginActions from "../../actions/actions/userLogin.actions";
import Dashboard from "../../views/App/Dashboard.jsx";
import CreateANewReport from "../../views/ReportsPage/CreateANewReport.jsx";

import { InfoArea } from "../InfoArea/InfoArea.js";
import ViewReportPage from "../../views/ReportsPage/ViewReportPage.jsx";
import EditReportPage from "../../views/ReportsPage/EditReportPage.jsx";
import CreateANewAdmin from "../../views/AdminPage/CreateANewAdmin.jsx";
import ResetPassword from "../../views/PasswordRecoveryt/ResetPassword.jsx";
import ForgotPassword from "../../views/PasswordRecoveryt/ForgotPassword.jsx";

const hist = createBrowserHistory();
const store = reduxStore();

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userService.isAdmin() === true ? (
        <Component {...props} />
      ) : (
        <Navigate replace to="/dashboard" />
      )
    }
  />
);

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userService.loggedIn() === true ? (
        <Navigate replace to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userService.loggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Navigate replace to="/login" />
        )
      }
    />
  );
};

export const PrivateRoute2 = ({ children }) => {
  if (userService.loggedIn() === true) {
    return children;
  }

  return <Navigate to="/" />;
};

export const CustomRoute2 = ({ children }) => {
  if (userService.loggedIn() === true) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};
export const AdminRoute2 = ({ children }) => {
  if (userService.isAdmin() === true) {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

function App(props) {
  useEffect(() => {
    props.getAuth();
  }, []);
  return (
    <Router history={hist}>
      <Routes>
        <Route
          path="/dashboard"
          exact
          element={
            <PrivateRoute2>
              <Dashboard />
            </PrivateRoute2>
          }
        />
        <Route
          path="/requests"
          exact
          element={
            <PrivateRoute2>
              <ReportsPage />
            </PrivateRoute2>
          }
        />
        <Route
          path="/create-request"
          exact
          element={
            <PrivateRoute2>
              <CreateANewReport />
            </PrivateRoute2>
          }
        />
        <Route
          path="/view-report"
          element={
            <PrivateRoute2>
              <ViewReportPage />
            </PrivateRoute2>
          }
        />
        <Route
          path="/edit-report"
          exact
          element={
            <PrivateRoute2>
              <EditReportPage />
            </PrivateRoute2>
          }
        />
        <Route
          path="/create-admin"
          exact
          element={
            <PrivateRoute2>
              <CreateANewAdmin />
            </PrivateRoute2>
          }
        />
        <Route
          path="/admin"
          exact
          element={
            <AdminRoute2>
              <AdminPage />
            </AdminRoute2>
          }
        />
        <Route
          path="/"
          exact
          element={
            <CustomRoute2>
              <Components />
            </CustomRoute2>
          }
        />

        <Route
          path="/login"
          exact
          element={
            <CustomRoute2>
              <LoginPage />
            </CustomRoute2>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <CustomRoute2>
              <RegisterPage />
            </CustomRoute2>
          }
        />
        <Route
          exact
          path="/password-recovery"
          element={
            <CustomRoute2>
              <ForgotPassword />
            </CustomRoute2>
          }
        />
        <Route
          exact
          path="/password-reset/:userID/:recoveryToken"
          element={
            <CustomRoute2>
              <ResetPassword />
            </CustomRoute2>
          }
        />
      </Routes>
    </Router>
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
