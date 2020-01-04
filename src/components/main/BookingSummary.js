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

  const CREATE_BOOKING = gql`
    mutation booking($room_number: String!, $start: String!, $end: String!) {
      createBooking(room_number: $room_number, start: $start, end: $end) {
        createdAt
      }
    }
  `;
  const [createBooking, { data, error }] = useMutation(CREATE_BOOKING);

  const handleOnConfirmPress = async () => {
    date = moment(date).startOf('day');
    start = moment(date).add(Number(start.substring(0, 2)), 'hour');
    end = moment(date).add(Number(end.substring(0, 2)), 'hour');
    const booking = {
      room_number: room,
      start: moment(start).toISOString(),
      end: moment(end).toISOString()
    };
    await createBooking({ variables: booking });
    console.log(data);
    setModal({
      isOpen: true,
      title: !error ? 'Your booking is successful!' : 'An error has occured.',
      button: 'OK',
      image: !error ? success : fail
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
