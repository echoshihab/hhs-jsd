import React, { Fragment, useContext, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { RootStoreContext } from "./app/stores/rootStore";
import LoadingComponent from "./app/main/layout/LoadingComponent";
import { ToastContainer } from "react-toastify";
import ModalContainer from "./app/common/modal/ModalContainer";
import HomePage from "./app/main/home/HomePage";
import NavBar from "./app/main/layout/NavBar";
import PrivateRoute from "./app/main/layout/PrivateRoute";
import PatientDashboard from "./app/main/patients/PatientDashboard";
import PatientForm from "./app/main/patients/PatientForm";
import NotFound from "./app/main/layout/NotFound";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading App..." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />

      <Container fluid>
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <NavBar />
              <Switch>
                <PrivateRoute path="/dashboard" component={PatientDashboard} />
                <PrivateRoute path="/add-patient" component={PatientForm} />

                <Route component={NotFound} />
              </Switch>
            </Fragment>
          )}
        />
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
