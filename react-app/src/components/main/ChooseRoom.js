import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Header from '../complement/Header';

const rooms = ['305', '204', '203'];

const style = {
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0'
  }
};

export default class ChooseRoom extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      redirect: false,
      room: undefined
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleOnRoomChosen = room => {
    this.setState({
      redirect: true,
      room
    });
  };

  renderRedirect = () => {
    const { redirect, room } = this.state;
    return redirect && room ? <Redirect to="/date" /> : <div></div>;
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        {this.renderRedirect()}
        <Header />
        <div style={style.dropdownContainer}>
          <Dropdown isOpen={isOpen} toggle={this.toggle} size="lg">
            <DropdownToggle caret>Select room</DropdownToggle>
            <DropdownMenu>
              {rooms.map(room => (
                <DropdownItem onClick={() => this.handleOnRoomChosen(room)}>
                  {room}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}
