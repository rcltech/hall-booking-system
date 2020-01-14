import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Timepicker from '../complement/Timepicker';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import { shortlistBookings } from '../../functions/shortlistBookings';
import { validateTime } from '../../functions/validateTime';
import { useQuery } from '@apollo/react-hooks';
import { ROOM_BOOKINGS } from '../../gql/bookings';
import { TimeChooserPanel } from '../ChooseTime/TimeChooserPanel';
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

function ChooseTime() {
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
  const { data } = useQuery(ROOM_BOOKINGS, {
    variables: {
      room
    }
  });

  const history = useHistory();

  useEffect(() => {
    if (data) {
      const filteredBookings = shortlistBookings(data.bookings, date);
      setBookings(filteredBookings);
    }
  }, [data, date]);

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
}

export default ChooseTime;
