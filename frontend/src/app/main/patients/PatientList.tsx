import React, { useContext } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PatientListItem from "./PatientListItem";
import { IPatient } from "../../models/patient";

const PatientList = () => {
  const rootStore = useContext(RootStoreContext);
  const { patients } = rootStore.patientStore;

  return (
    <Container>
      {patients.map((patient: IPatient) => (
        <PatientListItem key={patient.id} patient={patient} />
      ))}
    </Container>
  );
};

export default observer(PatientList);
