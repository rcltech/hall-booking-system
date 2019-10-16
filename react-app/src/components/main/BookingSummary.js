import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button } from 'reactstrap';
import NavBar from '../complement/NavBar';
const moment = require('moment');

const style = {
  container: {
    textAlign: 'center'
  },
  list: {
    backgroundColor: 'grey'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  }
};

export default class BookingSummary extends Component {
  constructor(props) {
    super(props);
    let {
      state: { room, date, start, end }
    } = this.props.location;
    this.state = {
      room,
      date,
      start,
      end
    };
  }

  handleOnConfirmPress = () => {
    //TODO : send a post request using axios
  };

  render() {
    let { room, date, start, end } = this.state;
    date = moment(date).format('LL');
    return (
      <div style={style.container}>
        <NavBar backPath="/room" />
        <p>
          You are one step away! Please check your booking details before
          confirming.
        </p>
        <List style={style.list}>
          <ListItem>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText>{room}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText>{date}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText>
              {start} - {end}
            </ListItemText>
          </ListItem>
        </List>
        <Button
          block
          style={style.buttonContainer}
          color="success"
          onClick={this.handleOnConfirmPress}
        >
          Confirm
        </Button>
      </div>
    );
  }
}
