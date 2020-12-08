import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../stores/rootStore";

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
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
        {user && (
          <Menu.Item position="right">
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
