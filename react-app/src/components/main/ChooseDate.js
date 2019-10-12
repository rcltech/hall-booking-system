import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from '../complement/Header';
import Calendar from 'react-calendar';

const style = {
  calendarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  }
};

export default class ChooseDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  onChange = date => this.setState({ date });

  render() {
    return (
      <div>
        <Header />
        <div style={style.calendarContainer}>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
        <div>
          <Button style={style.buttonContainer} color="success" block>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}
