import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "./App";
import "react-widgets/dist/css/react-widgets.css";
import "react-toastify/dist/ReactToastify.min.css";
import reportWebVitals from "./reportWebVitals";
import dateFnsLocalizer from "react-widgets-date-fns";

export const history = createBrowserHistory();
dateFnsLocalizer();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
