import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../complement';
import { Timepicker, TimeChooserPanel, List } from '../ChooseTime';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import {
  shortlistBookings,
  validateTime,
  getCurrentHour
} from '../../functions';
import { useQuery } from '@apollo/react-hooks';
import { ROOM_BOOKINGS } from '../../gql/bookings';
import { GET_BOOKING_DATE, GET_ROOM_NUMBER } from '../../gql/local/query';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center'
  },
  root: {
    margin: '0'
  },
  nextStepButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 100
  }
}));

export const ChooseTime = () => {
  const classes = useStyles();

  const [start, setStart] = useState(
    moment()
      .startOf('hour')
      .toDate()
  );
  const [end, setEnd] = useState(
    moment()
      .startOf('hour')
      .add(1, 'hour')
      .toDate()
  );
  const [bookings, setBookings] = useState([]);

  const { data: roomData, client } = useQuery(GET_ROOM_NUMBER);
  const { data: bookingData } = useQuery(GET_BOOKING_DATE);
  const room = roomData.roomNumber;
  const date = bookingData.bookingDate;
  const { data, refetch } = useQuery(ROOM_BOOKINGS, {
    variables: {
      room,
      start: getCurrentHour()
    }
  });

  const history = useHistory();

  useEffect(() => {
    refetch({ room }).then(() => {
      if (data) {
        const filteredBookings = shortlistBookings(data.bookings, date);
        setBookings(filteredBookings);
      }
    });
  }, [data, date, room, refetch]);

  const handleNextButtonClick = () => {
    if (validateTime(bookings, date, start, end)) {
      client.writeData({
        data: {
          start: moment(start).toISOString(),
          end: moment(end).toISOString()
        }
      });
      history.push('/summary');
    }
  };

  return (
    <>
      <NavBar backPath="/room" />
      <div className={classes.root}>
        <TimeChooserPanel room={room} date={moment(date).format('LL')} />
        <Timepicker
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
        <List bookings={bookings} />
      </div>
      <Fab
        color="primary"
        aria-label="next"
        className={classes.nextStepButton}
        onClick={handleNextButtonClick}
      >
        <ArrowForwardIcon />
      </Fab>
    </>
  );
};
