import React, { useContext } from "react";
import { Segment, Form, Button, Grid, Label, Header } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  isRequired,
  composeValidators,
  createValidator,
} from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import TextInput from "../../common/form/TextInput";
import DateInput from "../../common/form/DateInput";
import { IPatientFormValues } from "../../models/patient";
import SelectInput from "../../common/form/SelectInput";

interface DetailsParams {
  id: string;
}

const isPositiveInteger = createValidator(
  (message) => (value) => {
    if (value && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
      return message;
    }
  },
  (field) => `${field} must be a number`
);

const validate = combineValidators({
  firstName: isRequired({ message: "First Name is Required" }),
  lastName: isRequired({ message: "Last Name is required" }),
  dateOfBirth: isRequired({ message: "Date of Birth is Required" }),
  gender: isRequired({ message: "Gender is required" }),
  healthCardNumber: composeValidators(
    isRequired("healthCardNumber"),
    isPositiveInteger("healthCardNumber")
  )(),
  versionCode: isRequired({ message: "Version Code is required" }),
});

const PatientForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { createPatient } = rootStore.patientStore;

  const handleFinalFormSubmit = (values: IPatientFormValues) => {
    const { ...patient } = values;
    createPatient(patient);
  };
  const genders = [
    { key: "Male", value: "Male", text: "Male" },
    { key: "Female", value: "Female", text: "Female" },
    { key: "Unknown", value: "Unknown", text: "Unknown" },
    { key: "Unspecified", value: "Unspecified", text: "Unspecified" },
  ];

  return (
    <Segment
      style={{ margin: "10vh", width: "60vw", border: "1px solid black" }}
    >
      <Header>Add New Patient</Header>
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit}>
                  <Label>First Name</Label>
                  <Field
                    placeholder="First Name"
                    name="firstName"
                    component={TextInput}
                  />
                  <Label>Last Name</Label>
                  <Field
                    placeholder="Last Name"
                    name="lastName"
                    component={TextInput}
                  />
                  <Label>Date of Birth</Label>
                  <Field
                    component={DateInput}
                    placeholder="Date of Birth"
                    date={true}
                    name="dateOfBirth"
                  />
                  <Label>Gender</Label>
                  <Field
                    component={SelectInput}
                    placeholder="Gender"
                    list="genders"
                    options={genders}
                    name="gender"
                  />

                  <Label>Health Card Number</Label>
                  <Field
                    component={TextInput}
                    placeholder="Health Card Number"
                    name="healthCardNumber"
                  />
                  <Label>Version Code</Label>
                  <Field
                    component={TextInput}
                    placeholder="Version Code"
                    name="versionCode"
                  />

                  <Button
                    disabled={invalid || pristine}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                  <Button
                    onClick={() => history.push("/dashboard")}
                    floated="right"
                    type="button"
                    content="Cancel"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(PatientForm);
