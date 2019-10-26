import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/core';
import success from '../../images/modals/success.png';
import fail from '../../images/modals/fail.png';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Modals from '../complement/Modals';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
const moment = require('moment');

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center'
  },
  list: {
    backgroundColor: 'white'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  }
}));

const BookingSummary = ({
  location: {
    state: { room, date, start, end }
  }
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState({
    isOpen: undefined,
    title: undefined,
    button: undefined,
    image: undefined
  });
  const [redirect, doRedirect] = useState(undefined);
  date = JSON.parse(date);

  const CREATE_BOOKING = gql`
    mutation booking($room_name: String!, $start: String!, $end: String!) {
      createBooking(room_name: $room_name, start: $start, end: $end) {
        createdAt
      }
    }
  `;
  const [createBooking, { data }] = useMutation(CREATE_BOOKING);

  const handleOnConfirmPress = async () => {
    const startNum = Number(start.substring(0, 2));
    const endNum = Number(end.substring(0, 2));
    let startObj = moment(date);
    let endObj = moment(date);
    startObj.set({
      hours: startNum,
      minutes: 0,
      seconds: 0
    });
    endObj.set({
      hours: endNum,
      minutes: 0,
      seconds: 0
    });
    const booking = {
      room,
      start: moment(startObj).toDate(),
      end: moment(endObj).toDate()
    };
    booking.room_name = booking.room;
    await createBooking({ variables: { booking } });
    const res = !data;
    setModal({
      isOpen: true,
      title: res ? 'Your booking is successful!' : 'An error has occured.',
      button: 'OK',
      image: res ? success : fail
    });
  };

  const onModalClick = () => {
    doRedirect(true);
  };

  const renderRedirect = () => {
    return redirect ? <Redirect to="/" /> : <div></div>;
  };

  const { isOpen, title, button, image } = modal;

  return (
    <div className={classes.container}>
      {renderRedirect()}
      <Modals
        isOpen={isOpen}
        title={title}
        button={button}
        image={image}
        onClick={() => {
          onModalClick();
        }}
      />
      <NavBar backPath="/room" />
      <List className={classes.list}>
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
          <ListItemText>{moment(date).format('LL')}</ListItemText>
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
        className={classes.buttonContainer}
        color="success"
        onClick={() => {
          handleOnConfirmPress();
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default BookingSummary;
