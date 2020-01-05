import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Button, makeStyles } from '@material-ui/core';
import success from '../../images/modals/success.png';
import fail from '../../images/modals/fail.png';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Modals from '../complement/Modals';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BOOKING, ROOM_BOOKINGS } from '../../gql/bookings';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const moment = require('moment');

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.light
  },
  list: {
    backgroundColor: 'white'
  },
  buttonContainer: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    padding: '20px',
    width: '100%'
  },
  summaryPaper: {
    margin: 20,
    borderRadius: '20px'
  }
}));

const BookingSummary = ({
  location: {
    state: { room, date, start, end }
  }
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState({
    isOpen: false,
    title: undefined,
    button: undefined,
    image: undefined
  });
  const [redirect, doRedirect] = useState(undefined);

  const [createBooking, { data, error }] = useMutation(CREATE_BOOKING, {
    refetchQueries: [{ query: ROOM_BOOKINGS, variables: { room } }]
  });

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
    return redirect ? <Redirect to="/" /> : <></>;
  };

  return (
    <div className={classes.container}>
      {renderRedirect()}
      <Modals
        modal={modal}
        onClick={() => {
          onModalClick();
        }}
      />
      <NavBar backPath="/room" />
      <Card elevation={3} className={classes.summaryPaper}>
        <CardContent>
          <List className={classes.list}>
            <ListItem>
              <ListItemIcon>
                <RoomIcon color={'primary'} />
              </ListItemIcon>
              <ListItemText>{room}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EventAvailableIcon color={'primary'} />
              </ListItemIcon>
              <ListItemText>{moment(date).format('LL')}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon color={'primary'} />
              </ListItemIcon>
              <ListItemText>
                {start} - {end}
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Button
        className={classes.buttonContainer}
        color="primary"
        variant="contained"
        onClick={handleOnConfirmPress}
      >
        Confirm
      </Button>
    </div>
  );
};

export default BookingSummary;
