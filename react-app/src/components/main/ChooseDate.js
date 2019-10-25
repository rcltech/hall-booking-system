import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import { makeStyles } from '@material-ui/core';
import DatePicker from '../complement/DatePicker';

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
  const [date, setDate] = useState(moment(new Date()));

  /**
   * Note than when we redirect, we use JSON.stringify() for passing the date
   * This is because the Redirect state object doesnot seem to like the
   * moment date object.
   */
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/time',
          state: {
            date: JSON.stringify(date),
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
        color="success"
        block
        onClick={() => doRedirect(true)}
      >
        Next
      </Button>
    </div>
  );
}

export default ChooseDate;
