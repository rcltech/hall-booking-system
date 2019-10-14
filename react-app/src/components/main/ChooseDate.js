import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Calendar from 'react-calendar';
import NavBar from '../complement/NavBar';
const moment = require('moment');

const style = {
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
};

export default class ChooseDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  onChange = date => {
    const dateChosen = moment(date).format('MM-DD-YYYY');
    const today = moment(new Date()).format('MM-DD-YYYY');
    this.setState({
      date: dateChosen < today ? new Date() : date
    });
  };

  render() {
    const {
      state: { room }
    } = this.props.location;
    return (
      <div style={style.container}>
        <NavBar backPath="/room" />
        <p>When are you planning to use room {room}?</p>
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
