import React, { useEffect, useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../stores/rootStore";
import PatientList from "./PatientList";

const PatientDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPatients } = rootStore.patientStore;

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  return (
    <Container style={{ marginTop: "4em" }}>
      <Grid>
        <Grid.Column width={10}>
          <PatientList />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default observer(PatientDashboard);
