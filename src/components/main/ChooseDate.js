import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '../complement/DatePicker';
import moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';

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
  },
  nextStepButton: {
    position: 'fixed',
    bottom: 20,
    right: 20
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
      <Fade in={true}>
        <Fab
          color="primary"
          aria-label="next"
          className={classes.nextStepButton}
          onClick={() => doRedirect(true)}
        >
          <ArrowForwardIcon />
        </Fab>
      </Fade>
    </div>
  );
}

export default ChooseDate;
