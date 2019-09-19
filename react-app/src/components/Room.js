import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import Timetable from './Timetable'

class Room extends Component {
  state = { 
    collapse: false,
    roomName: this.props.roomName
  };

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { roomName,collapse } = this.state;
    const { roomData } = this.props;
    return (
      <div>
        <Button outline color="info" onClick={this.toggle} style={{ marginBottom: '1rem' }} block>
          {roomName}
        </Button>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              <Timetable roomName={roomName} roomData={roomData}/>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Room;