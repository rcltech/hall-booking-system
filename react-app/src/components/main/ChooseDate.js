import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
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
      redirect: false,
      room: undefined,
      date: new Date()
    };
  }

  componentDidMount = () => {
    const {
      state: { room }
    } = this.props.location;
    this.setState({
      room
    });
  };

  onChange = date => {
    const dateChosen = moment(date).format('DD-MM-YYYY');
    const today = moment(new Date()).format('DD-MM-YYYY');
    this.setState({
      date: dateChosen < today ? new Date() : date
    });
  };

  handleOnContinuePress = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    const { redirect, date, room } = this.state;
    return redirect ? (
      <Redirect
        to={{
          pathname: '/time',
          state: {
            date,
            room
          }
        }}
      />
    ) : (
      <div></div>
    );
  };

  render() {
    const { room } = this.state;
    return (
      <div style={style.container}>
        {this.renderRedirect()}
        <NavBar backPath="/room" />
        <p>When are you planning to use room {room}?</p>
        <div style={style.calendarContainer}>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </div>
        <div>
          <Button
            style={style.buttonContainer}
            color="success"
            block
            onClick={this.handleOnContinuePress}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }
}
