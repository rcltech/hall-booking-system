import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import moment from 'moment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

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
  }
}));

const Timepicker = ({ start, end, setStart, setEnd }) => {
  const classes = useStyles();

  const handleStartTimeChange = start => {
    setStart(
      moment(start)
        .startOf('hour')
        .toDate()
    );
    setEnd(
      moment(start)
        .startOf('hour')
        .add(1, 'hours')
        .toDate()
    );
  };

  const handleEndTimeChange = end => {
    setEnd(end.toDate());
    if (
      moment(start)
        .startOf('hour')
        .isAfter(moment(end).startOf('hour'))
    ) {
      setStart(
        moment(end)
          .startOf('hour')
          .subtract(1, 'hours')
          .toDate()
      );
    }
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
            minutesStep={60}
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
            minutesStep={60}
            onChange={handleEndTimeChange}
            InputProps={{ className: classes.timePickerLabel }}
          />
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Timepicker;
