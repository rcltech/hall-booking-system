import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { Button } from 'reactstrap';
const moment = require('moment');

const style = {
  buttonContainer: {
    display: 'flex',
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
    onContinue(moment(start), moment(end));
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          margin="normal"
          label="Start time"
          value={start}
          onChange={handleStartTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
          format="HH:00"
        />
        <KeyboardTimePicker
          margin="normal"
          label="End time"
          value={end}
          onChange={handleEndTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time'
          }}
          format="HH:00"
        />
      </MuiPickersUtilsProvider>
      <Button
        block
        style={style.buttonContainer}
        color="success"
        onClick={handleOnContinuePress}
      >
        Continue
      </Button>
    </div>
  );
};

export default Timepicker;
