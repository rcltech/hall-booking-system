import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import moment from 'moment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    justifyContent: 'center',
    margin: '20px 0'
  },
  timePickerContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    justifyItems: 'center',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto'
    }
  },
  timePickerRow: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '80% auto',
    alignItems: 'center',
    padding: '10px',
    justifyItems: 'start',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  timePickerLabel: {
    color: theme.palette.primary.contrastText
  },
  nextStepButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    zIndex: 100
  }
}));

const Timepicker = props => {
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);

  const classes = useStyles();

  const handleStartTimeChange = start => {
    setStart(start);
    setEnd(moment(start).add(1, 'hours'));
  };

  const handleEndTimeChange = end => {
    setEnd(end);
    if (
      moment(start)
        .startOf('hour')
        .isAfter(moment(end).startOf('hour'))
    ) {
      setStart(moment(end).subtract(1, 'hours'));
    }
  };

  const handleOnContinuePress = () => {
    const { onContinue } = props;
    onContinue(start, end);
  };

  return (
    <div className={classes.timePickerContainer}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.timePickerRow}>
          <Typography variant="h6" color="inherit">
            From
          </Typography>
          <TimePicker
            showTodayButton
            todayLabel="now"
            value={start}
            minutesStep={15}
            onChange={handleStartTimeChange}
            InputProps={{ className: classes.timePickerLabel }}
          />
        </div>
        <div className={classes.timePickerRow}>
          <Typography variant="h6" color="inherit">
            To
          </Typography>
          <TimePicker
            value={end}
            minutesStep={15}
            onChange={handleEndTimeChange}
            InputProps={{ className: classes.timePickerLabel }}
          />
        </div>
      </MuiPickersUtilsProvider>
      <Fab
        color="primary"
        aria-label="next"
        className={classes.nextStepButton}
        onClick={handleOnContinuePress}
      >
        <ArrowForwardIcon />
      </Fab>
    </div>
  );
};

export default Timepicker;
