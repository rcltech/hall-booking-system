import React, { Component } from 'react';
import Timetable from 'react-timetable-events';
import NavBar from '../complement/NavBar.js';
import getRooms from '../../functions/getRooms';
const moment = require('moment');

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
    super(props);
    this.state = {
      events: undefined,
      room,
      date
    };
  }

  componentDidMount = async () => {
    const { room, date } = this.state;
    this.setState({
      events: await getRooms(room, date)
    });
  };

  render() {
    let { events, room, date } = this.state;
    date = moment(date).format('DD-MM-YYYY');
    return (
      <div style={style.container}>
        <NavBar backPath="/room" />
        <p>
          What is the most suitable timeslot for you? <br /> Room : {room}{' '}
          <br /> Date : {date}
        </p>
        {events ? <Timetable events={events} /> : <div></div>}
      </div>
    );
  }
}
