import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

const Room = () => (
  <div>
    <Button outline color="primary" size="lg" block id="toggler" style={{ marginBottom: '1rem' }}>
      AV Room 305A
    </Button>
    <UncontrolledCollapse toggler="#toggler">
      <Card>
        <CardBody>
          Placeholder TimeTable
        </CardBody>
      </Card>
    </UncontrolledCollapse>
  </div>
);

export default Room;