import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import moment from 'moment';

const style = {
  buttonContainer: {
    justifyContent: 'center',
    margin: '20px 0'
  }
};

const Timepicker = props => {
  const [start, setStart] = useState(props.start);
  const [end, setEnd] = useState(props.end);

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
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Start time"
            value={start}
            minutesStep={15}
            onChange={handleStartTimeChange}
          />
        </div>
        <div>
          <TimePicker
            label="End time"
            value={end}
            minutesStep={15}
            onChange={handleEndTimeChange}
          />
        </div>
      </MuiPickersUtilsProvider>
      <div>
        <Button
          variant="contained"
          style={style.buttonContainer}
          color="primary"
          onClick={handleOnContinuePress}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Timepicker;
