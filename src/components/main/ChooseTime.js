import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Timetable from 'react-timetable-events';
import NavBar from '../complement/NavBar';
import Timepicker from '../complement/Timepicker';
import getRooms from '../../functions/getRooms';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
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
  const [events, setEvents] = useState([]);

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
      getRooms(data.bookings, date).then(events => {
        setEvents(events);
      });
    }
  }, [data, date]);

  const handleNextButtonClick = () => {
    if (validateTime(events[Object.keys(events)[0]], date, start, end)) {
      client.writeData({
        data: {
          start: moment(start).format('HH:00'),
          end: moment(end).format('HH:00')
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
        <Timetable events={events} />
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
