import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '../complement/DatePicker';
import moment from 'moment';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import { useApolloClient } from '@apollo/react-hooks';

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

function ChooseDate() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const client = useApolloClient();
  const history = useHistory();

  const handleNextButtonClick = () => {
    client.writeData({
      data: {
        bookingDate: moment(date).toISOString()
      }
    });
    history.push('/time');
  };

  return (
    <div className={classes.container}>
      <NavBar backPath="/room" />
      <DatePicker selectDate={setDate} />
      <Fade in={true}>
        <Fab
          color="primary"
          aria-label="next"
          className={classes.nextStepButton}
          onClick={handleNextButtonClick}
        >
          <ArrowForwardIcon />
        </Fab>
      </Fade>
    </div>
  );
}

export default ChooseDate;
