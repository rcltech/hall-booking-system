import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Room extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false,
      roomName: props.roomName
    };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button outline color="info" onClick={this.toggle} style={{ marginBottom: '1rem' }} block>
          {this.state.roomName}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              Placeholder TimeTable
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Room;