import React from "react";
import { Segment, List, Item } from "semantic-ui-react";
import { IPatient } from "../../models/patient";

const PatientListItem: React.FC<{ patient: IPatient }> = ({ patient }) => {
  return (
    <Segment.Group style={{ border: "1px solid black" }}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                <List horizontal relaxed="very">
                  <List.Item> System Id: {patient.id}</List.Item>
                  <List.Item>
                    Patient Name: {patient.firstName} {patient.lastName}
                  </List.Item>
                  <List.Item>
                    <List.Item>Patient Gender: {patient.gender}</List.Item>
                  </List.Item>
                </List>
              </Item.Header>

              <Item.Description>
                <List celled horizontal>
                  <List.Item> </List.Item>
                </List>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary></Segment>

      <Segment clearing>
        <span>
          Health Card Number: {patient.healthCardNumber} {patient.versionCode}
        </span>
      </Segment>
    </Segment.Group>
  );
};

export default PatientListItem;
