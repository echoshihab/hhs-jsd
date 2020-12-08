import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";

import { FORM_ERROR } from "final-form";
import {
  combineValidators,
  composeValidators,
  createValidator,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../stores/rootStore";
import { IUserFormValues } from "../../models/user";
import TextInput from "../../common/form/TextInput";
import ErrorMessage from "../../common/form/ErrorMessage";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  () => "Invalid email address"
);

const validate = combineValidators({
  userName: isRequired("Username"),
  displayName: isRequired("Display Name"),
  email: composeValidators(isRequired("email"), isValidEmail("email"))(),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Sign up" color="teal" text-align="center" />
          <Field name="userName" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Display name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />

          <Field
            name="password"
            component={TextInput}
            type="password"
            placeholder="Password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
