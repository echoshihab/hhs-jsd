import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import NotFound from "./app/main/layout/NotFound";
import NavBar from "./app/main/layout/NavBar";
import LoginForm from "./app/main/user/LoginForm";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import PatientDashboard from "./app/main/patients/PatientDashboard";
import PatientForm from "./app/main/patients/PatientForm";

const App = () => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />

      <Container fluid>
        <Route exact path="/" component={LoginForm} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <NavBar />
              <Switch>
                <Route path="/dashboard" component={PatientDashboard} />

                <Route path={"/add-patient"} component={PatientForm} />

                <Route component={NotFound} />
              </Switch>
            </Fragment>
          )}
        />
      </Container>
    </Fragment>
  );
};

export default observer(App);
