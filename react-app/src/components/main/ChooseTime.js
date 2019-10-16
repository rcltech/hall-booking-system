import React, { Component } from 'react';
import Timetable from 'react-timetable-events';
import NavBar from '../complement/NavBar';
import Timepicker from '../complement/Timepicker';
const moment = require('moment');
const getRooms = require('../../functions/getRooms');
const validateTime = require('../../functions/validateTime');

const style = {
  container: {
    textAlign: 'center'
  }
};

export default class ChooseTime extends Component {
  constructor(props) {
    const {
      state: { room, date }
    } = props.location;
    let start = moment(date);
    let end = moment(date);
    start.set({ hour: 12 });
    end.set({ hour: 13 });
    super(props);
    this.state = {
      events: undefined,
      room,
      date,
      start,
      end
    };
  }

  componentDidMount = async () => {
    const { room, date } = this.state;
    this.setState({
      events: await getRooms(room, date)
    });
  };

  onContinue = async (start, end) => {
    const { events } = this.state;
    const timeslots = events[Object.keys(events)[0]];
    if (validateTime(timeslots, start, end) === true) {
      alert('TODO : Send post request and redirect to confirmation page');
      //send a post request to store new booking
      //redirect to booking confirmation page
    }
  };

  render() {
    const { events, room, date, start, end } = this.state;
    let dateString = moment(date).format('LL');
    return (
      <div style={style.container}>
        <NavBar backPath="/room" />
        <p>
          What is the most suitable timeslot for you? <br /> Room : {room}{' '}
          <br /> Date : {dateString}
        </p>
        <Timepicker start={start} end={end} onContinue={this.onContinue} />
        {events ? <Timetable events={events} /> : <div></div>}
      </div>
    );
  }
}
