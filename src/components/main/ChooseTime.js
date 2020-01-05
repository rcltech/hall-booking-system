import React, { useEffect, useState } from 'react';
import Timetable from 'react-timetable-events';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Timepicker from '../complement/Timepicker';
import getRooms from '../../functions/getRooms';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import validateTime from '../../functions/validateTime';
import { useQuery } from '@apollo/react-hooks';
import { ROOM_BOOKINGS } from '../../gql/bookings';

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center'
  }
}));

const makeSelection = (timeSlots, start, end, setStart, setEnd, doRedirect) => {
  if (validateTime(timeSlots, start, end)) {
    setStart(start);
    setEnd(end);
    doRedirect(true);
  }
};

const doRedirectTask = (room, date, start, end) => {
  return (
    <Redirect
      to={{
        pathname: '/summary',
        state: {
          room,
          date,
          start: moment(start).format('HH:00'),
          end: moment(end).format('HH:00')
        }
      }}
    />
  );
};

function ChooseTime({
  location: {
    state: { room, date }
  }
}) {
  const classes = useStyles();
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const [redirect, doRedirect] = useState(false);
  const [events, setEvents] = useState();

  const { data } = useQuery(ROOM_BOOKINGS, {
    variables: {
      room
    }
  });

  useEffect(() => {
    if (data) {
      getRooms(data.bookings, date).then(events => {
        setEvents(events);
      });
    }
  }, [room, date, data]);

  if (redirect) {
    return doRedirectTask(room, date, start, end);
  }

  return (
    <div className={classes.container}>
      <NavBar backPath="/room" />
      <p>
        What is the most suitable timeslot for you? <br /> Room : {room} <br />{' '}
        Date : {moment(date).format('LL')}
      </p>
      <Timepicker
        start={start}
        end={end}
        onContinue={(start, end) =>
          makeSelection(
            events[Object.keys(events)[0]],
            start,
            end,
            setStart,
            setEnd,
            doRedirect
          )
        }
      />
      {events ? (
        <Timetable events={events} />
      ) : (
        <div>
          <Typography>No events</Typography>
        </div>
      )}
    </div>
  );
}

export default ChooseTime;
