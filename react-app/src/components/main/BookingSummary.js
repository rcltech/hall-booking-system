import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import success from '../../images/modals/success.png';
import fail from '../../images/modals/fail.png';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Modals from '../complement/Modals';
import postBooking from '../../functions/postBooking';
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
      end,
      modal: {
        isOpen: undefined,
        title: undefined,
        button: undefined,
        image: undefined
      },
      redirect: undefined
    };
  }

  handleOnConfirmPress = async () => {
    const { room, date, start, end } = this.state;
    const startNum = Number(start.substring(0, 2));
    const endNum = Number(end.substring(0, 2));
    const res = await postBooking(room, date, startNum, endNum);
    this.setState({
      modal: {
        isOpen: true,
        title: res ? 'Your booking is successful!' : 'An error has occured.',
        button: 'OK',
        image: res ? success : fail
      }
    });
  };

  onModalClick = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    return redirect ? <Redirect to="/" /> : <div></div>;
  };

  render() {
    let { room, date, start, end } = this.state;
    date = moment(date).format('LL');
    const {
      modal: { isOpen, title, button, image }
    } = this.state;
    return (
      <div style={style.container}>
        {this.renderRedirect()}
        <Modals
          isOpen={isOpen}
          title={title}
          button={button}
          image={image}
          onClick={this.onModalClick}
        />
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
