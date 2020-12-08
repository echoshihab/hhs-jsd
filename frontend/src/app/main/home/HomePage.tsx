import React, { useContext } from "react";
import {
  Grid,
  Container,
  Header,
  Icon,
  Card,
  Button,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../user/LoginForm";
import { RootStoreContext } from "../../stores/rootStore";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { logout, user } = rootStore.userStore;

  return (
    <Container
      fluid
      style={{
        background: "black",
        height: "100vh",
      }}
    >
      <Grid columns={1}>
        <Grid.Column
          style={{
            height: "80vh",
            background: `black`,
            backgroundSize: "cover",
            backgroundBlendMode: "darken",
            backdropFilter: "brightness(50%)",
          }}
        >
          <Grid.Row
            style={{ backgroundColor: "black", height: "10vh" }}
          ></Grid.Row>
          <Grid.Row style={{ backgroundColor: "white" }}>
            <Divider />
            <Card centered style={{ marginTop: "30vh" }}>
              <Card.Content style={{ backgroundColor: "black" }}>
                <Card.Header textAlign="center" style={{ color: "white" }}>
                  Members
                </Card.Header>

                <Card.Description textAlign="center" style={{ color: "white" }}>
                  <strong>Login to View Results</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra textAlign="center">
                {user ? (
                  <Button.Group>
                    <Button
                      color="red"
                      content="Log out"
                      onClick={() => logout()}
                    />
                    <Button as={Link} to={"/dashboard"} content="Dashboard" />
                  </Button.Group>
                ) : (
                  <Button.Group>
                    <Button
                      color="blue"
                      onClick={() => openModal(<LoginForm />)}
                    >
                      Login
                    </Button>
                    <Button.Or />
                    <Button
                      positive
                      onClick={() => openModal(<RegisterForm />)}
                    >
                      Sign up
                    </Button>
                  </Button.Group>
                )}
              </Card.Content>
            </Card>
            <Divider style={{ backgroundColor: "black" }} />
          </Grid.Row>
          <Header inverted textAlign="center" size="huge" block>
            PatientData App
          </Header>
        </Grid.Column>
      </Grid>
      <Divider style={{ border: "3px solid white" }} />
      <Header textAlign="center" size="huge" style={{ color: "white" }}>
        View and Manage Patient Data
        <Icon name="user doctor" style={{ color: "white" }} />
      </Header>
    </Container>
  );
};

export default HomePage;
