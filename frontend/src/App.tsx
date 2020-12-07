import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import List from "semantic-ui-react/dist/commonjs/elements/List/List";

class App extends Component {
  state = {
    patients: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/patients").then((response) => {
      console.log(response.data);
      this.setState({
        patients: response.data.patients,
      });
    });
  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Header.Content>Patients</Header.Content>
        </Header>
        <List>
          {this.state.patients.map((patient: any) => (
            <List.Item key={patient.id}>{patient.firstName}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}
export default App;
