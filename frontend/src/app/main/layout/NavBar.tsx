import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu fixed="top" inverted pointing>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          PatientData App
        </Menu.Item>
        <Menu.Item name="Patients List" as={NavLink} to="/dashboard" />
        <Menu.Item>
          <Button content="Add New" as={NavLink} to="/add-patient" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
