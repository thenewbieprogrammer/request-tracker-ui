import React from "react";
import ReactDOM from "react-dom";
import reduxStore from "./store/reduxStore.js";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

//import App from "./components/App/App.jsx";
import reportWebVitals from "./reportWebVitals.js";

import "./assets/scss/material-kit-react.scss";

import App from "./components/App/App.jsx";

const hist = createBrowserHistory();
const store = reduxStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
