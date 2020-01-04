import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import { makeStyles, Button } from '@material-ui/core';
import { DatePicker } from '../complement/DatePicker';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center'
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  }
}));

function ChooseDate({
  location: {
    state: { room }
  }
}) {
  const classes = useStyles();
  const [redirect, doRedirect] = useState(false);
  const [date, setDate] = useState(new Date());

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/time',
          state: {
            date: moment(date).toDate(),
            room
          }
        }}
      />
    );
  }

  return (
    <div className={classes.container}>
      <NavBar backPath="/room" />
      <DatePicker selectDate={setDate} />
      <Button
        className={classes.buttonContainer}
        color="primary"
        variant="contained"
        onClick={() => doRedirect(true)}
      >
        Next
      </Button>
    </div>
  );
}

export default ChooseDate;
