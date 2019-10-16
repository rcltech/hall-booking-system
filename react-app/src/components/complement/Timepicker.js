import React, { Component } from 'react';
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

export default class Timepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: props.start,
      end: props.end
    };
  }

  handleStartTimeChange = start => {
    this.setState({
      start,
      end: moment(start).add(1, 'hours')
    });
  };

  handleEndTimeChange = end => {
    const { start } = this.state;
    if (moment(end).format('HH') <= moment(start).format('HH')) {
      this.setState({
        start: moment(end).add(-1, 'hours'),
        end
      });
    } else {
      this.setState({
        end
      });
    }
  };

  handleOnContinuePress = () => {
    const { start, end } = this.state;
    const { onContinue } = this.props;
    onContinue(moment(start), moment(end));
  };

  render() {
    const { start, end } = this.state;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            label="Start time"
            value={start}
            onChange={this.handleStartTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
            format="HH:00"
          />
          <KeyboardTimePicker
            margin="normal"
            label="End time"
            value={end}
            onChange={this.handleEndTimeChange}
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
          onClick={this.handleOnContinuePress}
        >
          Continue
        </Button>
      </div>
    );
  }
}
